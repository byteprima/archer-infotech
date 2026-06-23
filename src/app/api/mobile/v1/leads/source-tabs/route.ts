import { NextRequest } from "next/server";

import { handle, json, requireMobile } from "@/lib/mobile-api/guard";

export const runtime = "nodejs";

// Mirrors the website's lead source tabs (prefix-matched for newsletter/reports).
const SOURCE_TABS = [
  { key: "", label: "All Leads" },
  { key: "contact_form", label: "Contact Form" },
  { key: "sitewide_cta", label: "WhatsApp / CTA" },
  { key: "chat_widget", label: "Chat Widget" },
  { key: "newsletter", label: "Newsletter" },
  { key: "reports", label: "Reports" },
  { key: "manual", label: "Manual" },
];

export async function GET(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);
    return json(SOURCE_TABS);
  });
}
