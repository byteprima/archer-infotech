"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, GraduationCap } from "lucide-react";
import {
  salaryRoles,
  EXPERIENCE_LEVELS,
  formatRange,
  formatLpa,
  type SalaryRole,
} from "@/data/salary-data";

interface CourseLink {
  title: string;
  href: string;
}

interface SalaryCalculatorProps {
  /** slug → { title, href } for the courses linked from each role. */
  courseLinks: Record<string, CourseLink>;
}

/**
 * Interactive Pune IT salary estimator. The full dataset is also rendered
 * server-side as a table below this component, so crawlers and AI engines
 * index the data even without running this JS (P6-11).
 */
export function SalaryCalculator({ courseLinks }: SalaryCalculatorProps) {
  const [roleId, setRoleId] = useState(salaryRoles[0].id);
  const [level, setLevel] = useState<SalaryRole["tiers"][number]["level"]>("fresher");

  const role = salaryRoles.find((r) => r.id === roleId) ?? salaryRoles[0];
  const tier = role.tiers.find((t) => t.level === level) ?? role.tiers[0];

  // Bar geometry: place the selected tier's band within the role's full
  // fresher→lead span so you can see where this stage sits on the ladder.
  const spanMin = role.tiers[0].min;
  const spanMax = role.tiers[role.tiers.length - 1].max;
  const span = spanMax - spanMin || 1;
  const leftPct = ((tier.min - spanMin) / span) * 100;
  const widthPct = Math.max(((tier.max - tier.min) / span) * 100, 3);

  const links = role.courseSlugs
    .map((s) => courseLinks[s])
    .filter((l): l is CourseLink => Boolean(l));

  return (
    <div className="rounded-2xl border bg-background shadow-sm overflow-hidden">
      {/* Inputs */}
      <div className="grid sm:grid-cols-2 gap-4 p-6 bg-muted/30 border-b">
        <label className="block">
          <span className="text-sm font-medium mb-1.5 block">Role</span>
          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Select role"
          >
            {salaryRoles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium mb-1.5 block">Experience</span>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as typeof level)}
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Select experience level"
          >
            {EXPERIENCE_LEVELS.map((l) => (
              <option key={l.level} value={l.level}>
                {l.label} ({l.years})
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Result */}
      <div className="p-6 space-y-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">
            Estimated salary in Pune — {role.title}, {tier.label} ({tier.years})
          </p>
          <p className="text-4xl md:text-5xl font-bold text-primary">
            {formatRange(tier.min, tier.max)}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Pune market average for this role: {formatLpa(role.puneAverage)}
          </p>
        </div>

        {/* Ladder bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatLpa(spanMin)}</span>
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> career ladder
            </span>
            <span>{formatLpa(spanMax)}</span>
          </div>
          <div className="relative h-3 rounded-full bg-muted">
            <div
              className="absolute h-3 rounded-full bg-secondary"
              style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground">
            {role.tiers.map((t) => (
              <span
                key={t.level}
                className={t.level === level ? "font-semibold text-foreground" : ""}
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{role.blurb}</p>

        {/* Path to this role */}
        {links.length > 0 && (
          <div className="rounded-lg border bg-muted/20 p-4">
            <p className="text-sm font-medium flex items-center gap-2 mb-3">
              <GraduationCap className="h-4 w-4 text-secondary" />
              Train for this role at Archer Infotech
            </p>
            <div className="flex flex-wrap gap-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-1 rounded-full border bg-background px-3 py-1.5 text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  {l.title} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
