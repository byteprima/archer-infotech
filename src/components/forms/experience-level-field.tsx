"use client";

/**
 * "Are you a fresher or experienced?" — the shared background field.
 *
 * Lives beside {@link ../forms/mode-preference-field ModePreferenceField} and for
 * the same reason: it appears on every lead form, and the option labels are
 * written verbatim to `leads.experience_level` and counted in the admin panel.
 * A form that says "Working professional" while another says "Experienced"
 * produces two buckets for one answer.
 *
 * Required, unlike the delivery-format question. Fresher-vs-experienced is the
 * first thing a counsellor needs — it decides which batch, which fee structure
 * and which pitch the call opens with — and it is a two-option question a
 * visitor can answer without thinking, so the cost of making it mandatory is
 * far lower than the cost of calling a lead blind.
 */

import {
  EXPERIENCE_LEVEL_HINTS,
  EXPERIENCE_LEVEL_OPTIONS,
} from "@/lib/leads/experience-level";

export function ExperienceLevelField({
  name = "experienceLevel",
  label = "Are you a fresher or experienced?",
  defaultValue,
  required = true,
  className,
}: {
  name?: string;
  label?: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <fieldset className={className}>
      <legend className="mb-2 text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {EXPERIENCE_LEVEL_OPTIONS.map((option) => (
          <label
            key={option}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-input px-3 py-1.5 text-sm transition-colors hover:bg-muted has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary"
          >
            <input
              type="radio"
              name={name}
              value={option}
              required={required}
              defaultChecked={defaultValue === option}
              className="h-3.5 w-3.5"
            />
            <span>{EXPERIENCE_LEVEL_HINTS[option]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
