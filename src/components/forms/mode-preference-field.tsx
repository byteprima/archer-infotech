"use client";

/**
 * "How do you want to study?" — the shared delivery-format field.
 *
 * Lives in one place because it appears on five different lead forms and the
 * option labels have to match exactly: they are written to `leads.mode_preference`
 * and counted in the admin panel, so a form that says "Classroom" while another
 * says "Offline" produces two buckets for one answer.
 *
 * Radio buttons rather than a select: four short options that a visitor should
 * be able to answer without opening anything, on a form where every extra
 * interaction costs a submission.
 */

export const MODE_PREFERENCE_OPTIONS = [
  "Online",
  "Offline",
  "Hybrid",
  "No preference",
] as const;

export type ModePreference = (typeof MODE_PREFERENCE_OPTIONS)[number];

/**
 * On-screen wording for each stored value.
 *
 * "Offline" and "Classroom" name the same thing — the site's own course and
 * bootcamp copy says Classroom, the admin said Offline — so the label carries
 * both and the stored value stays "Offline". Keeping the value means no
 * migration and no risk to the rows already collected; putting the label in
 * one place means the three files that had spelled it out by hand, in two
 * different capitalisations, cannot drift again.
 */
export const MODE_PREFERENCE_LABELS: Record<string, string> = {
  Online: "Online",
  Offline: "Offline (Classroom)",
  Hybrid: "Hybrid",
  "No preference": "No preference",
};

/** Label for a stored value, falling back to the raw value if unknown. */
export function modePreferenceLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return MODE_PREFERENCE_LABELS[value] ?? value;
}

export function ModePreferenceField({
  name = "modePreference",
  label = "How would you like to study?",
  defaultValue,
  className,
}: {
  name?: string;
  label?: string;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <fieldset className={className}>
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {MODE_PREFERENCE_OPTIONS.map((option) => (
          <label
            key={option}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-input px-3 py-1.5 text-sm transition-colors hover:bg-muted has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary"
          >
            <input
              type="radio"
              name={name}
              value={option}
              defaultChecked={defaultValue === option}
              className="h-3.5 w-3.5"
            />
            <span>{MODE_PREFERENCE_LABELS[option] ?? option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
