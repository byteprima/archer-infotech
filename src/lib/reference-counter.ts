import { and, eq } from "drizzle-orm";
import { db, referenceCounters } from "@/db";

/**
 * The transaction handle Drizzle hands the db.transaction() callback. Derived
 * from the driver rather than hand-written, so it cannot drift from it.
 */
type DrizzleTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

/**
 * Allocate the next number in a reference series, inside a caller's transaction.
 *
 * The obvious implementation — MAX(existing) + 1 — reissues a number as soon
 * as the highest row is deleted, handing two different people the same
 * reference. This counts up in its own table instead, so a deleted row's
 * number is retired rather than recycled.
 *
 * `observedMax` is the highest sequence currently visible in the target table.
 * It seeds the counter the first time a scope and year are used (so the rows
 * migration 0002 backfilled are respected) and covers anything inserted out of
 * band afterwards — a restore, an import, a hand-written INSERT.
 *
 * Must be called inside a transaction: read-then-write is not atomic on its
 * own, and two enquiries arriving together is exactly when that matters.
 */
export function allocateReference(
  tx: DrizzleTransaction,
  scope: string,
  year: number,
  observedMax: number,
): number {
  const rows = tx
    .select({ lastValue: referenceCounters.lastValue })
    .from(referenceCounters)
    .where(and(eq(referenceCounters.scope, scope), eq(referenceCounters.year, year)))
    .all();

  const stored = rows[0]?.lastValue ?? 0;
  const next = Math.max(stored, observedMax) + 1;

  if (rows.length === 0) {
    tx.insert(referenceCounters)
      .values({ scope, year, lastValue: next, updatedAt: new Date() })
      .run();
  } else {
    tx.update(referenceCounters)
      .set({ lastValue: next, updatedAt: new Date() })
      .where(and(eq(referenceCounters.scope, scope), eq(referenceCounters.year, year)))
      .run();
  }

  return next;
}
