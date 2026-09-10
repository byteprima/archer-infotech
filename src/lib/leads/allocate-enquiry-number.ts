import { like } from "drizzle-orm";
import { db, leads } from "@/db";
import { formatEnquiryNumber, highestEnquirySequence } from "./enquiry-number";
import { allocateReference } from "@/lib/reference-counter";

/**
 * Insert a lead with its enquiry reference allocated in the same transaction.
 *
 * The allocation has to be inside the insert's transaction: reading the
 * highest number and then inserting as two steps lets two enquiries arriving
 * together read the same highest and both claim it. Website traffic is exactly
 * where that happens.
 *
 * Shared by the public form, the chatbot and the admin's own Add Lead, so
 * there is one place a lead is created and one place a number is issued.
 */
export function insertLeadWithEnquiryNumber(
  values: Omit<typeof leads.$inferInsert, "enquiryNumber">,
): { id: number; enquiryNumber: string } {
  const year = (values.createdAt ?? new Date()).getFullYear();

  return db.transaction((tx) => {
    const issued = tx
      .select({ enquiryNumber: leads.enquiryNumber })
      .from(leads)
      .where(like(leads.enquiryNumber, `ENQ-${year}-%`))
      .all()
      .map((row) => row.enquiryNumber);

    // The counter is the source of truth; the rows only seed it. See
    // lib/reference-counter.ts for why MAX(existing) + 1 is not enough.
    const sequence = allocateReference(
      tx,
      "ENQ",
      year,
      highestEnquirySequence(year, issued),
    );
    const enquiryNumber = formatEnquiryNumber(year, sequence);

    const [created] = tx
      .insert(leads)
      .values({ ...values, enquiryNumber })
      .returning({ id: leads.id })
      .all();

    return { id: created.id, enquiryNumber };
  });
}
