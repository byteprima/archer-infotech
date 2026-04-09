import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";

// Lazy auth instance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _auth: any = null;
let _authInitialized = false;

function initializeAuth(): ReturnType<typeof betterAuth> | null {
  if (_authInitialized) {
    return _auth;
  }
  _authInitialized = true;

  // Check if database is configured
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL not set - authentication disabled");
    return null;
  }

  try {
    // Dynamic require to avoid build-time errors
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { db } = require("@/db");

    _auth = betterAuth({
      secret: process.env.BETTER_AUTH_SECRET,
      baseURL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

      database: drizzleAdapter(db, {
        provider: "sqlite",
        schema: {
          user: schema.user,
          session: schema.session,
          account: schema.account,
          verification: schema.verification,
        },
      }),

      emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
      },

      socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID || "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
      },

      session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
        cookieCache: {
          enabled: true,
          maxAge: 60 * 5,
        },
      },

      user: {
        additionalFields: {
          role: {
            type: "string",
            required: false,
            defaultValue: "user",
            input: false,
          },
        },
      },

      advanced: {
        cookiePrefix: "archer_auth",
      },

      trustedOrigins: [
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "http://localhost:3000",
        "http://localhost:3001",
      ],
    });

    return _auth;
  } catch (error) {
    console.error("Failed to initialize auth:", error);
    return null;
  }
}

// Export getter for auth instance
export function getAuth() {
  return initializeAuth();
}

// Export auth for API route handler (lazy initialized)
export const auth = {
  get handler() {
    const instance = initializeAuth();
    if (!instance) {
      return null;
    }
    return instance.handler;
  },
  get api() {
    const instance = initializeAuth();
    if (!instance) {
      return null;
    }
    return instance.api;
  },
};
