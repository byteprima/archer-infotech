/**
 * Enumerations shared by the placement-drive and seminar records.
 *
 * These live outside the action files because a "use server" module may only
 * export async functions — exporting a const array from one fails at runtime
 * with "A 'use server' file can only export async functions, found object",
 * which typechecks cleanly and only shows up when the route is requested.
 */

export const DRIVE_MODES = ["campus", "virtual", "walk_in", "partner_office"] as const;
export const DRIVE_STATUSES = ["upcoming", "in_progress", "completed", "cancelled"] as const;

export const HOST_TYPES = ["corporate", "college", "public", "online"] as const;
export const SEMINAR_FORMATS = [
  "seminar",
  "workshop",
  "corporate_batch",
  "guest_lecture",
  "bootcamp",
] as const;

export const DRIVE_MODE_LABEL: Record<string, string> = {
  campus: "On campus",
  virtual: "Virtual",
  walk_in: "Walk-in",
  partner_office: "At the company",
};

export const DRIVE_STATUS_LABEL: Record<string, string> = {
  upcoming: "Upcoming",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const HOST_TYPE_LABEL: Record<string, string> = {
  corporate: "Corporate",
  college: "College",
  public: "Public",
  online: "Online",
};

export const SEMINAR_FORMAT_LABEL: Record<string, string> = {
  seminar: "Seminar",
  workshop: "Workshop",
  corporate_batch: "Corporate batch",
  guest_lecture: "Guest lecture",
  bootcamp: "Bootcamp",
};
