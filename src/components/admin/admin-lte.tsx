import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * AdminLTE-inspired admin UI primitives, rebuilt on Tailwind so they match
 * the rest of the codebase (no Bootstrap). Provides the classic
 * dashboard look: colored "small boxes", "info boxes", colored-accent
 * card boxes, and a content header with breadcrumb.
 */

type BoxColor =
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple"
  | "teal"
  | "indigo"
  | "slate";

const SOLID_BG: Record<BoxColor, string> = {
  blue: "bg-sky-500",
  green: "bg-emerald-500",
  yellow: "bg-amber-500",
  red: "bg-rose-500",
  purple: "bg-violet-500",
  teal: "bg-teal-500",
  indigo: "bg-indigo-500",
  slate: "bg-slate-600",
};

const SOFT_ICON: Record<BoxColor, string> = {
  blue: "bg-sky-100 text-sky-600",
  green: "bg-emerald-100 text-emerald-600",
  yellow: "bg-amber-100 text-amber-600",
  red: "bg-rose-100 text-rose-600",
  purple: "bg-violet-100 text-violet-600",
  teal: "bg-teal-100 text-teal-600",
  indigo: "bg-indigo-100 text-indigo-600",
  slate: "bg-slate-200 text-slate-700",
};

const TOP_ACCENT: Record<BoxColor, string> = {
  blue: "border-t-sky-500",
  green: "border-t-emerald-500",
  yellow: "border-t-amber-500",
  red: "border-t-rose-500",
  purple: "border-t-violet-500",
  teal: "border-t-teal-500",
  indigo: "border-t-indigo-500",
  slate: "border-t-slate-600",
};

/** AdminLTE "small-box": bold colored KPI tile with a faded icon + footer link. */
export function SmallBox({
  value,
  label,
  icon: Icon,
  color = "blue",
  href,
  footerLabel = "More info",
}: {
  value: React.ReactNode;
  label: string;
  icon: LucideIcon;
  color?: BoxColor;
  href?: string;
  footerLabel?: string;
}) {
  const body = (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl text-white shadow-sm transition-transform",
        SOLID_BG[color],
        href && "hover:-translate-y-0.5"
      )}
    >
      <div className="p-5">
        <p className="text-3xl font-bold leading-none">{value}</p>
        <p className="mt-2 text-sm font-medium text-white/90">{label}</p>
      </div>
      <Icon
        className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 text-white/25"
        strokeWidth={1.5}
      />
      {href && (
        <div className="flex items-center justify-center gap-1 bg-black/10 py-2 text-xs font-medium text-white/90 transition-colors group-hover:bg-black/20">
          {footerLabel}
          <ArrowRight className="h-3 w-3" />
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group block">
        {body}
      </Link>
    );
  }
  return body;
}

/** AdminLTE "info-box": white tile with a colored icon chip + label/value. */
export function InfoBox({
  label,
  value,
  icon: Icon,
  color = "blue",
}: {
  label: string;
  value: React.ReactNode;
  icon: LucideIcon;
  color?: BoxColor;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
      <div
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-lg",
          SOFT_ICON[color]
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}

/** AdminLTE "card card-outline": box with a colored top accent + header. */
export function BoxCard({
  title,
  icon: Icon,
  color = "slate",
  action,
  children,
  className,
}: {
  title: string;
  icon?: LucideIcon;
  color?: BoxColor;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-t-4 bg-card ring-1 ring-foreground/5",
        TOP_ACCENT[color],
        className
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b px-5 py-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          {title}
        </h2>
        {action}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

/** AdminLTE content-header: page title + breadcrumb row. */
export function ContentHeader({
  title,
  subtitle,
  breadcrumb,
  action,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 border-b bg-muted/30 px-4 py-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {breadcrumb}
        {action}
      </div>
    </div>
  );
}

/** Status pill colors shared by alumni list + detail. */
export const ALUMNI_STATUS_PILL: Record<string, string> = {
  new: "bg-sky-100 text-sky-700 ring-sky-600/20",
  reviewed: "bg-amber-100 text-amber-700 ring-amber-600/20",
  approved: "bg-violet-100 text-violet-700 ring-violet-600/20",
  published: "bg-emerald-100 text-emerald-700 ring-emerald-600/20",
  rejected: "bg-rose-100 text-rose-700 ring-rose-600/20",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset",
        ALUMNI_STATUS_PILL[status] || "bg-gray-100 text-gray-700 ring-gray-600/20"
      )}
    >
      {status}
    </span>
  );
}
