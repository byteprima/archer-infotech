import Link from "next/link";
import {
  ChevronLeft,
  GraduationCap,
  IndianRupee,
  Search,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { requireAdminPage } from "@/lib/admin";
import {
  getAdmissionCourseOptions,
  getAdmissionTotals,
  listAdmissions,
} from "@/lib/actions/admissions";
import {
  ADMISSION_STATUSES,
  ADMISSION_STATUS_LABELS,
  PAYMENT_STATUSES,
  PAYMENT_STATUS_LABELS,
  admissionStatusLabel,
  paymentStatusLabel,
} from "@/lib/admissions/lifecycle";
import { formatPaise } from "@/lib/admissions/money";

/**
 * Every admission, in one place.
 *
 * The record itself is created and maintained from the lead it came from —
 * that is where the context is. This page exists because a set of records you
 * can only reach one enquiry at a time is not a set of records: the office
 * needs to answer "who joined this month" and "who still owes fees" without
 * knowing which lead to open first.
 *
 * Deliberately plain. Charts and conversion rates are Phase 4.
 */

const statusColors: Record<string, string> = {
  ENROLLED: "bg-emerald-100 text-emerald-800",
  ON_HOLD: "bg-amber-100 text-amber-800",
  CANCELLED: "bg-gray-100 text-gray-700",
};

const paymentColors: Record<string, string> = {
  PENDING: "bg-red-100 text-red-800",
  PARTIAL: "bg-amber-100 text-amber-800",
  PAID: "bg-emerald-100 text-emerald-800",
  REFUNDED: "bg-gray-100 text-gray-700",
};

const SELECT =
  "h-9 rounded-md border border-input bg-background px-3 text-sm";

function formatDate(value: Date | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface AdminAdmissionsPageProps {
  searchParams: Promise<{
    status?: string;
    payment?: string;
    course?: string;
    q?: string;
    from?: string;
    to?: string;
  }>;
}

export default async function AdminAdmissionsPage({
  searchParams,
}: AdminAdmissionsPageProps) {
  await requireAdminPage("/admin/admissions");

  const params = await searchParams;
  const filters = {
    status: params.status || undefined,
    paymentStatus: params.payment || undefined,
    courseSlug: params.course || undefined,
    search: params.q || undefined,
    from: params.from || undefined,
    to: params.to || undefined,
  };

  const [rows, totals, courseOptions] = await Promise.all([
    listAdmissions(filters),
    getAdmissionTotals(filters),
    getAdmissionCourseOptions(),
  ]);

  return (
    <div className="min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-2 flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
          <div>
            <h1 className="text-xl font-bold">Admissions</h1>
            <p className="text-sm text-muted-foreground">
              {totals.count} record{totals.count === 1 ? "" : "s"}
              {filters.status || filters.paymentStatus || filters.courseSlug || filters.search
                ? " matching these filters"
                : ""}
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                Active admissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totals.activeCount}</p>
              <p className="text-xs text-muted-foreground">
                Cancelled records excluded
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <IndianRupee className="h-4 w-4" />
                Fees agreed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatPaise(totals.feeTotal)}</p>
              <p className="text-xs text-muted-foreground">
                Payable after discounts — not what has been collected
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Wallet className="h-4 w-4" />
                Fully paid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {totals.paidCount}
                <span className="ml-1 text-base font-normal text-muted-foreground">
                  / {totals.activeCount}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                {totals.activeCount - totals.paidCount} still owing
              </p>
            </CardContent>
          </Card>
        </div>

        <form method="get" className="mb-6 flex flex-wrap items-end gap-3">
          <div className="min-w-56 flex-1">
            <label className="mb-1 block text-xs text-muted-foreground">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                name="q"
                defaultValue={params.q ?? ""}
                placeholder="Name, phone, email or ADM number"
                className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">
              Status
            </label>
            <select name="status" defaultValue={params.status ?? ""} className={SELECT}>
              <option value="">All</option>
              {ADMISSION_STATUSES.map((value) => (
                <option key={value} value={value}>
                  {ADMISSION_STATUS_LABELS[value]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">
              Payment
            </label>
            <select name="payment" defaultValue={params.payment ?? ""} className={SELECT}>
              <option value="">All</option>
              {PAYMENT_STATUSES.map((value) => (
                <option key={value} value={value}>
                  {PAYMENT_STATUS_LABELS[value]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">
              Course
            </label>
            <select name="course" defaultValue={params.course ?? ""} className={SELECT}>
              <option value="">All</option>
              {courseOptions.map((option) => (
                <option key={option.courseSlug} value={option.courseSlug}>
                  {option.courseName} ({option.count})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">From</label>
            <input type="date" name="from" defaultValue={params.from ?? ""} className={SELECT} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">To</label>
            <input type="date" name="to" defaultValue={params.to ?? ""} className={SELECT} />
          </div>
          <Button type="submit" size="sm">
            Apply
          </Button>
          <Link href="/admin/admissions">
            <Button type="button" variant="ghost" size="sm">
              Clear
            </Button>
          </Link>
        </form>

        {rows.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-sm text-muted-foreground">
              No admissions match this view. Admissions are created from a
              lead — open one and use{" "}
              <span className="font-medium">Convert to Admission</span>.
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="overflow-x-auto p-0">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium">Reference</th>
                    <th className="px-4 py-3 font-medium">Student</th>
                    <th className="px-4 py-3 font-medium">Course</th>
                    <th className="px-4 py-3 font-medium">Batch</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 text-right font-medium">Payable</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Payment</th>
                    <th className="px-4 py-3 font-medium">Counsellor</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-b last:border-0">
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">
                        <Link
                          href={`/admin/leads/${row.leadId}`}
                          className="hover:underline"
                        >
                          {row.admissionNumber ?? `#${row.id}`}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/leads/${row.leadId}`}
                          className="font-medium hover:underline"
                        >
                          {row.studentName}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          {row.phone}
                        </div>
                      </td>
                      <td className="px-4 py-3">{row.courseName}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.batchName ?? "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {formatDate(row.admissionDate)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right font-medium">
                        {formatPaise(row.finalFee)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={statusColors[row.status] ?? ""}>
                          {admissionStatusLabel(row.status)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={paymentColors[row.paymentStatus] ?? ""}>
                          {paymentStatusLabel(row.paymentStatus)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.counsellor ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
