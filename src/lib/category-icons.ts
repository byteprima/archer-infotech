import {
  Award,
  Brain,
  Briefcase,
  Bug,
  Cloud,
  Code,
  Database,
  Globe,
  Layers,
  Rocket,
  Smartphone,
  Wand2,
  type LucideIcon,
} from "lucide-react";

import type { CategoryIconName } from "@/data/courses";

/**
 * The single category-name → icon table.
 *
 * There used to be three of these — footer, header and the course tile
 * placeholder — each maintained by hand and each drifting separately. The
 * footer was missing Bug and Briefcase, so Testing & QA and Salesforce
 * rendered no icon at all; the tile placeholder had Sparkles where the data
 * says Wand2, so every AI & GenAI tile silently fell back to a generic Code
 * icon. Nothing failed loudly in either case, which is why both survived.
 *
 * The `Record<CategoryIconName, LucideIcon>` annotation is the point: adding
 * a category icon name in courses.ts without adding it here will not
 * compile. A missing icon is now a build error rather than a blank space
 * somebody notices months later.
 */
export const CATEGORY_ICONS: Record<CategoryIconName, LucideIcon> = {
  Code,
  Layers,
  Globe,
  Cloud,
  Award,
  Brain,
  Wand2,
  Smartphone,
  Database,
  Bug,
  Briefcase,
  Rocket,
};
