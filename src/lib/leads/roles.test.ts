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

describe("CRM route access", () => {
  it("lets a counsellor reach the hub, their leads and their notifications", () => {
    for (const path of [
      "/admin/crm",
      "/admin/leads",
      "/admin/leads/12",
      "/admin/leads/duplicates",
      "/admin/notifications",
      "/admin/follow-ups",
      "/admin/admissions",
    ]) {
      assert.equal(canAccessAdminPath("counselor", path), true, path);
    }
  });

  it("keeps a counsellor out of scheduling, which books trainers and rooms", () => {
    // They register a lead FOR a demo from the lead page; creating the session
    // itself is the same kind of decision as opening a batch.
    assert.equal(canAccessAdminPath("counselor", "/admin/demos"), false);
    assert.equal(canAccessAdminPath("counselor", "/admin/batches"), false);
    assert.equal(canAccessAdminPath("manager", "/admin/demos"), true);
  });

  it("keeps a counsellor out of automation settings", () => {
    // Prefix matching on "/admin/crm" would otherwise let this through, and it
    // decides who real enquiries are routed to.
    assert.equal(canAccessAdminPath("counselor", "/admin/crm/settings"), false);
    assert.equal(canAccessAdminPath("manager", "/admin/crm/settings"), true);
    assert.equal(canAccessAdminPath("admin", "/admin/crm/settings"), true);
  });

  it("keeps a counsellor out of reports and user management", () => {
    assert.equal(canAccessAdminPath("counselor", "/admin/reports"), false);
    assert.equal(canAccessAdminPath("counselor", "/admin/users"), false);
  });
});
