"use client";

/**
 * Course picker for the admin forms — the same catalogue the public
 * /contact form offers, plus a free-text box for anything outside it.
 *
 * `courseTaken` (placements) and `courseInterest` (leads) were plain text
 * inputs, so every admin typed the course name by hand. That produced values
 * the public form could never produce — "Full Stack Development" against the
 * catalogue's "Java Full Stack Development", casing drift, abbreviations —
 * and those columns are grouped in the leads dashboard and rendered on the
 * public placements page. Two spellings of one course are two rows.
 *
 * Both fields stay a single comma-joined string in the database, which is
 * exactly what the contact form already writes (`selectedCourses.join(", ")`),
 * so nothing about the schema or existing rows changes.
 *
 * WHY THE FREE-TEXT BOX IS ON BOTH, not just leads: these forms edit existing
 * records as well as creating new ones. A row saved years ago, or imported,
 * can hold a course that is no longer in the catalogue. Without somewhere for
 * unrecognised values to live, opening such a record in the editor and saving
 * it would silently drop them. The box is where they land, pre-filled, so a
 * round-trip through the form is lossless.
 */
import { useMemo, useState } from "react";

import { CourseSelect } from "@/components/forms/course-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { coursesSummary } from "@/data/courses-minimal";

interface CoursePickerFieldProps {
  /** Comma-joined course string as stored in the DB. */
  value: string;
  /** Receives the recombined comma-joined string. */
  onChange: (value: string) => void;
  label: string;
  id: string;
  /** Helper text under the free-text box. */
  customHint?: string;
}

const SEPARATOR = ", ";

function splitValue(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function CoursePickerField({
  value,
  onChange,
  label,
  id,
  customHint = "Anything not in the catalogue — historical or one-off course names.",
}: CoursePickerFieldProps) {
  const catalogueTitles = useMemo(
    () => new Set(coursesSummary.map((c) => c.title)),
    [],
  );

  // Split the stored string into what the picker can represent and what it
  // cannot. Matching is exact against the catalogue title, the same key
  // CourseSelect toggles on, so a value either round-trips through the
  // dropdown or lands in the free-text box — never both, never neither.
  const { selected, custom } = useMemo(() => {
    const parts = splitValue(value);
    return {
      selected: parts.filter((p) => catalogueTitles.has(p)),
      custom: parts.filter((p) => !catalogueTitles.has(p)),
    };
  }, [value, catalogueTitles]);

  // The free-text box keeps its own state rather than re-deriving its
  // display from the merged value on every keystroke. Deriving it meant
  // typing a comma — the separator — round-tripped through split/join and
  // vanished before the next character could be typed, which made entering
  // a second custom course impossible. Local state lets the field hold
  // exactly what was typed; the merged value is still emitted on change.
  const [customText, setCustomText] = useState(() => custom.join(SEPARATOR));

  // Re-sync only when `value` changes from OUTSIDE this component — a
  // different record loaded into the same form — not when it changes
  // because we just emitted it. React's documented way to adjust state on a
  // prop change is to do it during render against a remembered copy, rather
  // than in an effect (which would cascade an extra render).
  const [syncedValue, setSyncedValue] = useState(value);
  if (value !== syncedValue) {
    setSyncedValue(value);
    setCustomText(
      splitValue(value)
        .filter((p) => !catalogueTitles.has(p))
        .join(SEPARATOR),
    );
  }

  /** Emit, and remember what we emitted so the sync above ignores it. */
  const commit = (nextSelected: string[], nextCustom: string[]) => {
    const merged = [...nextSelected, ...nextCustom].join(SEPARATOR);
    setSyncedValue(merged);
    onChange(merged);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <CourseSelect
        value={selected}
        onValueChange={(next) => commit(next, splitValue(customText))}
      />
      <div className="space-y-1">
        <Input
          id={id}
          value={customText}
          placeholder="Other course (optional)"
          onChange={(e) => {
            setCustomText(e.target.value);
            commit(selected, splitValue(e.target.value));
          }}
        />
        <p className="text-xs text-muted-foreground">{customHint}</p>
      </div>
    </div>
  );
}
