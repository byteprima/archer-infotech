"use client";

/**
 * Admission Information for one lead.
 *
 * Two states in one panel, because they are two halves of the same question —
 * has this person joined, and on what terms:
 *
 *   no admission yet  → the conversion form, prefilled from the lead
 *   admission exists  → the record, editable in place
 *
 * The fee is shown as a live subtotal while typing. The server recomputes it
 * on write regardless (see lib/admissions/money.ts) — this is here so the
 * person quoting a discount over the phone can see the figure they are about
 * to agree to.
 */

import { useMemo, useState, useTransition } from "react";
import { GraduationCap, Loader2, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  convertLeadToAdmission,
  updateAdmission,
} from "@/lib/actions/admissions";
import {
  ADMISSION_STATUSES,
  ADMISSION_STATUS_LABELS,
  PAYMENT_STATUSES,
  PAYMENT_STATUS_LABELS,
  type AdmissionStatus,
  type PaymentStatus,
} from "@/lib/admissions/lifecycle";
import {
  computeFees,
  formatPaise,
  paiseToRupeeInput,
} from "@/lib/admissions/money";
import { toast } from "sonner";

const SELECT =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm disabled:opacity-60";

const STATUS_COLORS: Record<AdmissionStatus, string> = {
  ENROLLED: "bg-emerald-100 text-emerald-800",
  ON_HOLD: "bg-amber-100 text-amber-800",
  CANCELLED: "bg-gray-100 text-gray-700",
};

const PAYMENT_COLORS: Record<PaymentStatus, string> = {
  PENDING: "bg-red-100 text-red-800",
  PARTIAL: "bg-amber-100 text-amber-800",
  PAID: "bg-emerald-100 text-emerald-800",
  REFUNDED: "bg-gray-100 text-gray-700",
};

export interface AdmissionCourseOption {
  slug: string;
  title: string;
}

export interface AdmissionBatchOption {
  id: number;
  batchName: string | null;
  courseName: string;
  startDate: Date | null;
}

export interface AdmissionRecord {
  id: number;
  admissionNumber: string | null;
  studentName: string;
  phone: string;
  email: string | null;
  courseSlug: string;
  courseName: string;
  batchId: number | null;
  batchName: string | null;
  admissionDate: Date | null;
  courseFee: number;
  discount: number;
  finalFee: number;
  status: string;
  paymentStatus: string;
  notes: string | null;
}

interface AdmissionPanelProps {
  leadId: number;
  leadName: string;
  leadPhone: string;
  leadEmail: string | null;
  /** Best guess at the course from the enquiry, pre-selected in the form. */
  suggestedCourseSlug: string | null;
  courses: AdmissionCourseOption[];
  batches: AdmissionBatchOption[];
  admission: AdmissionRecord | null;
}

function today(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function toDateInput(value: Date | null): string {
  if (!value) return today();
  const d = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function batchLabel(batch: AdmissionBatchOption): string {
  const name = batch.batchName || batch.courseName;
  if (!batch.startDate) return name;
  const start = new Date(batch.startDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return `${name} — starts ${start}`;
}

/** The live subtotal, using the same rules the server will apply. */
function FeeSummary({ fee, discount }: { fee: string; discount: string }) {
  const result = useMemo(() => computeFees(fee, discount), [fee, discount]);
  if (!result.ok) {
    return (
      <p className="text-xs text-muted-foreground">
        {fee.trim() === "" ? "Enter the course fee." : result.message}
      </p>
    );
  }
  return (
    <p className="flex items-center gap-2 text-sm">
      <Receipt className="h-4 w-4 text-muted-foreground" />
      <span className="text-muted-foreground">Payable</span>
      <span className="font-semibold">{formatPaise(result.finalFee)}</span>
      {result.discount > 0 && (
        <span className="text-xs text-muted-foreground">
          after {formatPaise(result.discount)} off
        </span>
      )}
    </p>
  );
}

export function AdmissionPanel({
  leadId,
  leadName,
  leadPhone,
  leadEmail,
  suggestedCourseSlug,
  courses,
  batches,
  admission,
}: AdmissionPanelProps) {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  // Conversion form
  const [name, setName] = useState(leadName);
  const [phone, setPhone] = useState(leadPhone);
  const [email, setEmail] = useState(leadEmail ?? "");
  const [courseSlug, setCourseSlug] = useState(
    suggestedCourseSlug ?? courses[0]?.slug ?? "",
  );
  const [batchId, setBatchId] = useState("");
  const [date, setDate] = useState(today());
  const [fee, setFee] = useState("");
  const [discount, setDiscount] = useState("");
  const [payment, setPayment] = useState<PaymentStatus>("PENDING");
  const [notes, setNotes] = useState("");

  // Record form
  const [recordStatus, setRecordStatus] = useState<AdmissionStatus>(
    (admission?.status as AdmissionStatus) ?? "ENROLLED",
  );
  const [recordPayment, setRecordPayment] = useState<PaymentStatus>(
    (admission?.paymentStatus as PaymentStatus) ?? "PENDING",
  );
  const [recordBatch, setRecordBatch] = useState(
    admission?.batchId ? String(admission.batchId) : "",
  );
  const [recordFee, setRecordFee] = useState(
    paiseToRupeeInput(admission?.courseFee),
  );
  const [recordDiscount, setRecordDiscount] = useState(
    paiseToRupeeInput(admission?.discount),
  );
  const [recordNotes, setRecordNotes] = useState(admission?.notes ?? "");

  function handleConvert() {
    startTransition(async () => {
      const result = await convertLeadToAdmission({
        leadId,
        studentName: name,
        phone,
        email,
        courseSlug,
        batchId: batchId ? Number(batchId) : null,
        admissionDate: date,
        courseFee: fee,
        discount,
        paymentStatus: payment,
        notes,
      });
      toast[result.success ? "success" : "error"](result.message);
      if (result.success) setOpen(false);
    });
  }

  function handleUpdate() {
    if (!admission) return;
    startTransition(async () => {
      const result = await updateAdmission({
        admissionId: admission.id,
        leadId,
        batchId: recordBatch ? Number(recordBatch) : null,
        status: recordStatus,
        paymentStatus: recordPayment,
        courseFee: recordFee,
        discount: recordDiscount,
        notes: recordNotes,
      });
      toast[result.success ? "success" : "error"](result.message);
    });
  }

  if (admission) {
    const status = (admission.status as AdmissionStatus) ?? "ENROLLED";
    const paymentStatus =
      (admission.paymentStatus as PaymentStatus) ?? "PENDING";
    return (
      <section className="rounded-lg border bg-card p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 font-semibold">
            <GraduationCap className="h-4 w-4" />
            Admission
          </h2>
          <div className="flex flex-wrap justify-end gap-1">
            <Badge className={STATUS_COLORS[status] ?? ""}>
              {ADMISSION_STATUS_LABELS[status] ?? admission.status}
            </Badge>
            <Badge className={PAYMENT_COLORS[paymentStatus] ?? ""}>
              {PAYMENT_STATUS_LABELS[paymentStatus] ?? admission.paymentStatus}
            </Badge>
          </div>
        </div>

        <dl className="mb-4 space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Reference</dt>
            <dd className="font-mono">{admission.admissionNumber ?? "—"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Course</dt>
            <dd className="text-right">{admission.courseName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Admitted</dt>
            <dd>{toDateInput(admission.admissionDate)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Payable</dt>
            <dd className="font-semibold">{formatPaise(admission.finalFee)}</dd>
          </div>
        </dl>

        <div className="space-y-3 border-t pt-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Admission status</Label>
              <select
                className={SELECT}
                value={recordStatus}
                disabled={pending}
                onChange={(e) =>
                  setRecordStatus(e.target.value as AdmissionStatus)
                }
              >
                {ADMISSION_STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {ADMISSION_STATUS_LABELS[value]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-xs">Payment</Label>
              <select
                className={SELECT}
                value={recordPayment}
                disabled={pending}
                onChange={(e) =>
                  setRecordPayment(e.target.value as PaymentStatus)
                }
              >
                {PAYMENT_STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {PAYMENT_STATUS_LABELS[value]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label className="text-xs">Batch</Label>
            <select
              className={SELECT}
              value={recordBatch}
              disabled={pending}
              onChange={(e) => setRecordBatch(e.target.value)}
            >
              <option value="">Not assigned yet</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batchLabel(batch)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Course fee (₹)</Label>
              <Input
                value={recordFee}
                disabled={pending}
                inputMode="decimal"
                onChange={(e) => setRecordFee(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs">Discount (₹)</Label>
              <Input
                value={recordDiscount}
                disabled={pending}
                inputMode="decimal"
                onChange={(e) => setRecordDiscount(e.target.value)}
              />
            </div>
          </div>
          <FeeSummary fee={recordFee} discount={recordDiscount} />

          <div>
            <Label className="text-xs">Notes</Label>
            <Textarea
              rows={2}
              value={recordNotes}
              disabled={pending}
              onChange={(e) => setRecordNotes(e.target.value)}
            />
          </div>

          {recordStatus === "CANCELLED" && admission.status !== "CANCELLED" && (
            <p className="rounded-md bg-amber-50 p-2 text-xs text-amber-900">
              Cancelling moves the lead back to Follow-up so it returns to the
              call queue rather than disappearing.
            </p>
          )}

          <Button
            size="sm"
            className="w-full"
            disabled={pending}
            onClick={handleUpdate}
          >
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save admission
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border bg-card p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-semibold">
          <GraduationCap className="h-4 w-4" />
          Admission
        </h2>
        {!open && (
          <Button size="sm" onClick={() => setOpen(true)}>
            Convert to Admission
          </Button>
        )}
      </div>

      {!open ? (
        <p className="text-sm text-muted-foreground">
          Not converted yet. Converting records the fee agreed and marks the
          lead Admission Confirmed — the enquiry and its follow-ups are kept.
        </p>
      ) : (
        <div className="space-y-3">
          <div>
            <Label className="text-xs">Student name</Label>
            <Input
              value={name}
              disabled={pending}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Phone</Label>
              <Input
                value={phone}
                disabled={pending}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs">Email</Label>
              <Input
                value={email}
                disabled={pending}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">Course</Label>
            <select
              className={SELECT}
              value={courseSlug}
              disabled={pending}
              onChange={(e) => setCourseSlug(e.target.value)}
            >
              {courses.map((course) => (
                <option key={course.slug} value={course.slug}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-xs">Batch (optional)</Label>
            <select
              className={SELECT}
              value={batchId}
              disabled={pending}
              onChange={(e) => setBatchId(e.target.value)}
            >
              <option value="">Decide later</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batchLabel(batch)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Admission date</Label>
              <Input
                type="date"
                value={date}
                disabled={pending}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs">Payment</Label>
              <select
                className={SELECT}
                value={payment}
                disabled={pending}
                onChange={(e) => setPayment(e.target.value as PaymentStatus)}
              >
                {PAYMENT_STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {PAYMENT_STATUS_LABELS[value]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Course fee (₹)</Label>
              <Input
                value={fee}
                disabled={pending}
                inputMode="decimal"
                placeholder="45000"
                onChange={(e) => setFee(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs">Discount (₹)</Label>
              <Input
                value={discount}
                disabled={pending}
                inputMode="decimal"
                placeholder="0"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </div>
          <FeeSummary fee={fee} discount={discount} />

          <div>
            <Label className="text-xs">Notes</Label>
            <Textarea
              rows={2}
              value={notes}
              disabled={pending}
              placeholder="Instalment plan, documents pending, who approved the discount…"
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1"
              disabled={pending}
              onClick={handleConvert}
            >
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Record admission
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={pending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
