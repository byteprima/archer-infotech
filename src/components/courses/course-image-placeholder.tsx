import {
  Award,
  Brain,
  Cloud,
  Code,
  Database,
  Globe,
  Layers,
  Rocket,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { categories, type Course } from "@/data/courses";

const iconMap: Record<string, React.ElementType> = {
  Award,
  Brain,
  Cloud,
  Code,
  Database,
  Globe,
  Layers,
  Rocket,
  Smartphone,
  Sparkles,
};

export function CourseImagePlaceholder({ course }: { course: Course }) {
  const category = categories.find((item) => item.slug === course.categorySlug);
  const Icon = iconMap[category?.icon ?? "Code"] ?? Code;

  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-primary/12 via-primary/6 to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(13,148,136,0.16),transparent_32%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(30,58,95,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,58,95,0.08)_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-background/80 text-primary shadow-sm ring-1 ring-primary/10 backdrop-blur-sm">
            <Icon className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-background/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm">
            Course Preview
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {course.category}
          </p>
          <h3 className="max-w-[15rem] text-xl font-semibold leading-tight text-foreground">
            {course.shortTitle}
          </h3>
        </div>
      </div>
    </div>
  );
}
