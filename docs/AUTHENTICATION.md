# Authentication Setup Guide

This document covers the authentication system implemented using [Better-Auth](https://www.better-auth.com/) with Google OAuth support.

## Overview

The authentication system supports:
- **Google OAuth** - Sign in with Google account
- **Email/Password** - Traditional email and password login
- **Role-based access** - `user` and `admin` roles
- **Session management** - 7-day sessions with automatic refresh

## Architecture

```
src/
├── lib/
│   ├── auth-server.ts    # Server-side auth configuration
│   ├── auth-client.ts    # Client-side auth utilities
│   └── auth.ts           # Auth helpers (getSession, isAuthenticated, etc.)
├── db/
│   └── schema.ts         # Database schema including auth tables
└── app/
    ├── api/auth/[...all]/route.ts  # Auth API endpoints
    └── admin/login/page.tsx        # Login page with Google OAuth
```

## Database Schema

Four tables are required for authentication:

| Table | Purpose |
|-------|---------|
| `user` | User accounts with email, name, image, role |
| `session` | Active user sessions |
| `account` | OAuth provider accounts (Google, etc.) |
| `verification` | Email verification tokens |

---

## Setup Instructions

### 1. Generate Auth Secret

Generate a secure secret for signing tokens and cookies:

```bash
openssl rand -base64 32
```

### 2. Environment Variables

Add the following to your `.env` file:

```env
# Required: Auth secret (minimum 32 characters)
BETTER_AUTH_SECRET=your-generated-secret-here

# Required for Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Site URL (used for OAuth callbacks)
NEXT_PUBLIC_SITE_URL=https://archerinfotech.in
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

2. Create a new project or select existing one

3. Navigate to **APIs & Services** > **Credentials**

4. Click **Create Credentials** > **OAuth client ID**

5. Select **Web application**

6. Configure the OAuth client:
   - **Name**: Archer Infotech Admin
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (development)
     - `https://archerinfotech.in` (production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://archerinfotech.in/api/auth/callback/google` (production)

7. Copy the **Client ID** and **Client Secret** to your `.env` file

### 4. Database Setup

The application uses SQLite for the database. Initialize the database:

```bash
# Create/update database schema
DATABASE_URL=./sqlite.db npm run db:push

# Or generate and apply migrations
npm run db:generate
npm run db:migrate
```

> **Note**: Use an absolute path for DATABASE_URL in production (e.g., `/app/sqlite.db`).

### 5. Create Initial Admin User

After setting up, you'll need to create the first admin user. You can do this by:

**Option A: Sign in with Google and update role via database**

1. Sign in with Google at `/admin/login`
2. Update the user's role in the database:

```bash
# Open SQLite database
sqlite3 ./sqlite.db

# Update user role to admin
UPDATE user SET role = 'admin' WHERE email = 'your-email@gmail.com';
```

**Option B: Use Drizzle Studio**

```bash
npm run db:studio
```

Then navigate to the `user` table and set `role = 'admin'` for your user.

---

## Usage

### Server-Side (Server Components & Actions)

```typescript
import { isAuthenticated, isAdmin, getCurrentUser, getSession } from "@/lib/auth";

// Check if user is authenticated
const authenticated = await isAuthenticated();

// Check if user is admin
const admin = await isAdmin();

// Get current user
const user = await getCurrentUser();

// Get full session with user data
const session = await getSession();
```

### Client-Side (React Components)

```typescript
import { signIn, signOut, useSession } from "@/lib/auth-client";

// Sign in with Google
await signIn.social({
  provider: "google",
  callbackURL: "/admin",
});

// Sign in with email/password
await signIn.email({
  email: "user@example.com",
  password: "password123",
  callbackURL: "/admin",
});

// Sign out
await signOut();

// Use session hook in components
function MyComponent() {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;

  return <div>Welcome, {session.user.name}</div>;
}
```

### Protecting Pages

```typescript
// In a Server Component
import { redirect } from "next/navigation";
import { isAuthenticated, isAdmin } from "@/lib/auth";

export default async function AdminPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  // For admin-only pages
  const admin = await isAdmin();
  if (!admin) {
    redirect("/unauthorized");
  }

  return <div>Admin content</div>;
}
```

---

## API Endpoints

Better-Auth automatically creates these endpoints at `/api/auth/`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/sign-in/email` | POST | Email/password sign in |
| `/api/auth/sign-in/social` | POST | Social OAuth sign in |
| `/api/auth/sign-up/email` | POST | Email/password sign up |
| `/api/auth/sign-out` | POST | Sign out |
| `/api/auth/session` | GET | Get current session |
| `/api/auth/callback/google` | GET | Google OAuth callback |

---

## Configuration Options

The auth configuration is in `src/lib/auth-server.ts`:

```typescript
betterAuth({
  // Session expires after 7 days
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24, // Refresh daily
  },

  // Email/password settings
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Enable when email is configured
  },

  // User has additional 'role' field
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
});
```

---

## Troubleshooting

### "Authentication is not configured" error

- Ensure `DATABASE_URL` is set (e.g., `./sqlite.db` or absolute path)
- Check that the SQLite database file exists and is accessible
- Verify the directory is writable (SQLite creates WAL files)

### Google OAuth not working

1. Verify redirect URIs match exactly (including trailing slashes)
2. Check that OAuth consent screen is configured
3. Ensure client ID and secret are correct
4. For localhost, use `http://localhost:3000` not `127.0.0.1`

### Session not persisting

- Check `BETTER_AUTH_SECRET` is set
- Verify cookies are not being blocked
- Check browser dev tools for cookie errors

### "role" not available on user

The role field is added as an additional field. Access it with:
```typescript
// @ts-ignore if needed
const role = session.user.role;
```

---

## Security Considerations

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Use strong secrets** - Generate with `openssl rand -base64 32`
3. **HTTPS in production** - Required for secure cookies
4. **Limit admin access** - Only grant admin role to trusted users
5. **Regular secret rotation** - Rotate `BETTER_AUTH_SECRET` periodically

---

## Next Actions

### Immediate (Before Deployment)

- [ ] Generate `BETTER_AUTH_SECRET` and add to production environment
- [ ] Create Google OAuth credentials for production domain
- [ ] Run database migration on production server
- [ ] Create initial admin user

### Short-term Improvements

- [ ] Add email verification (requires email service like AWS SES)
- [ ] Add password reset functionality
- [ ] Add user management in admin panel
- [ ] Add audit logging for admin actions

### Future Enhancements

- [ ] Add more OAuth providers (GitHub, LinkedIn)
- [ ] Implement two-factor authentication (2FA)
- [ ] Add session management UI (view/revoke sessions)
- [ ] Add rate limiting for auth endpoints

---

## References

- [Better-Auth Documentation](https://www.better-auth.com/docs)
- [Better-Auth Drizzle Adapter](https://www.better-auth.com/docs/adapters/drizzle)
- [Google OAuth Setup](https://console.cloud.google.com/apis/credentials)
- [Next.js Authentication Patterns](https://nextjs.org/docs/app/building-your-application/authentication)
