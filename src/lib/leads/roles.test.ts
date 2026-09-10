import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  canAccessAdmin,
  canAccessAdminPath,
  canAssignLeads,
  canViewAllLeads,
  canManageUsers,
  isStaffRole,
} from "./roles";

describe("staff roles", () => {
  it("lets staff into the panel and keeps website users out", () => {
    assert.ok(canAccessAdmin("admin"));
    assert.ok(canAccessAdmin("manager"));
    assert.ok(canAccessAdmin("counselor"));
    assert.ok(!canAccessAdmin("user"));
    assert.ok(!canAccessAdmin(null));
    assert.ok(!canAccessAdmin("Admin")); // case matters; no accidental grants
  });

  it("restricts a counsellor to leads and follow-ups", () => {
    assert.ok(canAccessAdminPath("counselor", "/admin/leads"));
    assert.ok(canAccessAdminPath("counselor", "/admin/leads/12"));
    assert.ok(canAccessAdminPath("counselor", "/admin/follow-ups"));
    assert.ok(!canAccessAdminPath("counselor", "/admin/blog/new"));
    assert.ok(!canAccessAdminPath("counselor", "/admin/seo"));
    assert.ok(!canAccessAdminPath("counselor", "/admin/placements"));
  });

  it("keeps user management to admins, whatever else a role can do", () => {
    // Granting a role is how someone escalates their own, so a manager with
    // this power would effectively be an admin.
    assert.ok(canAccessAdminPath("admin", "/admin/users"));
    assert.ok(!canAccessAdminPath("manager", "/admin/users"));
    assert.ok(!canAccessAdminPath("counselor", "/admin/users"));
    assert.ok(canManageUsers("admin"));
    assert.ok(!canManageUsers("manager"));
  });

  it("lets only admin and manager see and assign every lead", () => {
    for (const role of ["admin", "manager"]) {
      assert.ok(canViewAllLeads(role), role);
      assert.ok(canAssignLeads(role), role);
    }
    assert.ok(!canViewAllLeads("counselor"));
    assert.ok(!canAssignLeads("counselor"));
    assert.ok(!canAssignLeads(null));
  });

  it("does not treat an unknown role as staff", () => {
    assert.ok(!isStaffRole("supervisor"));
    assert.ok(!isStaffRole(""));
    assert.ok(!isStaffRole(undefined));
  });
});
