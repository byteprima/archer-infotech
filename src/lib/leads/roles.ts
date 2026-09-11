/**
 * Staff roles and what each may do.
 *
 * The application had a binary `user.role` of "user" | "admin". The
 * specification asks for ADMIN / MANAGER / COUNSELOR, so this adds the two
 * new roles alongside the existing values rather than renaming them —
 * "admin" keeps working exactly as it did, and nobody is locked out by the
 * change.
 *
 * Capabilities are named after the decision being made, not after the role,
 * so a call site reads `canAssignLeads(role)` rather than
 * `role === "admin" || role === "manager"`. When the roles change, the call
 * sites do not.
 */

export const STAFF_ROLES = ["admin", "manager", "counselor"] as const;
export type StaffRole = (typeof STAFF_ROLES)[number];

/** Every value `user.role` may legitimately hold. "user" means no panel access. */
export const USER_ROLES = ["user", ...STAFF_ROLES] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const ROLE_LABELS: Record<UserRole, string> = {
  user: "No admin access",
  admin: "Admin",
  manager: "Manager",
  counselor: "Counsellor",
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  user: "Signed-in website user. Cannot open the admin panel.",
  admin: "Full access, including users, content and settings.",
  manager: "All leads, assignment and reports. No user management.",
  counselor: "Their own assigned leads and follow-ups only.",
};

export function isStaffRole(role: string | null | undefined): role is StaffRole {
  return !!role && (STAFF_ROLES as readonly string[]).includes(role);
}

/** May open the admin panel at all. */
export const canAccessAdmin = isStaffRole;

/**
 * Areas a counsellor may reach.
 *
 * A allow-list on the layout rather than a guard added to each of the ~18
 * admin routes: a new route added later is then restricted by default, which
 * is the direction a permission mistake should fail in.
 */
/** Carved out of the allowed prefixes above, which match by prefix. */
export const COUNSELOR_DENIED_PATHS = ["/admin/crm/settings"] as const;

export const COUNSELOR_ALLOWED_PREFIXES = [
  // The CRM hub. It filters its own tiles with canAccessAdminPath, so a
  // counsellor sees only the destinations they can actually open.
  "/admin/crm",
  // Their own reminders and assignments.
  "/admin/notifications",
  "/admin/leads",
  "/admin/follow-ups",
  // Converting an enquiry is a counsellor's job, and the record they just
  // created has to stay visible to them afterwards.
  "/admin/admissions",
  "/admin/unauthorized",
  "/admin/login",
] as const;

/**
 * Areas only an ADMIN may reach, whatever else a role can do.
 *
 * User management is here because granting roles is how someone would
 * escalate their own — a manager who can edit roles is an admin.
 */
export const ADMIN_ONLY_PREFIXES = ["/admin/users"] as const;

export function canAccessAdminPath(
  role: string | null | undefined,
  pathname: string,
): boolean {
  if (!isStaffRole(role)) return false;
  if (ADMIN_ONLY_PREFIXES.some((p) => pathname.startsWith(p))) {
    return role === "admin";
  }
  if (role !== "counselor") return true;
  if (pathname === "/admin") return true; // the dashboard itself is harmless
  // Prefix matching would let "/admin/crm" cover its settings page, which
  // decides who real enquiries are routed to. A counsellor must not be able to
  // point the queue at themselves.
  if (COUNSELOR_DENIED_PATHS.some((p) => pathname.startsWith(p))) return false;
  return COUNSELOR_ALLOWED_PREFIXES.some((p) => pathname.startsWith(p));
}

/** See every lead, not only the ones assigned to you. */
export function canViewAllLeads(role: string | null | undefined): boolean {
  return role === "admin" || role === "manager";
}

/** Assign or reassign a lead to a counsellor. */
export function canAssignLeads(role: string | null | undefined): boolean {
  return role === "admin" || role === "manager";
}

/** Edit a lead's details, status, priority; log follow-ups. */
export function canManageLeads(role: string | null | undefined): boolean {
  return isStaffRole(role);
}

/** Delete leads, manage users, change settings. */
export function canManageUsers(role: string | null | undefined): boolean {
  return role === "admin";
}

/** Blog, media, SEO, placements — everything that is not the lead pipeline. */
export function canManageContent(role: string | null | undefined): boolean {
  return role === "admin" || role === "manager";
}
