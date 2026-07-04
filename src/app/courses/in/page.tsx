import { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd, CategoryCollectionJsonLd } from "@/components/seo/json-ld";
import { LastUpdated } from "@/components/seo/last-updated";
import { courseLocations } from "@/data/course-locations";
import { getNeighbourhood } from "@/data/locations";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";

export const metadata: Metadata = buildPageMetadata({
  title: "IT Courses in Pune by Area — Hinjewadi, Baner, Kothrud & More",
  description:
    "Find Archer Infotech IT courses close to you — Java Full Stack, Python, DevOps, AWS, Data Science, MERN, Generative AI and Machine Learning training mapped to Hinjewadi, Baner, Kothrud, Wakad, Aundh and Pimpri-Chinchwad.",
  path: "/courses/in",
});

// Hub index for the /courses/in/[slug] course×location cluster. These combo
// pages were the most orphaned in the set — reachable only from the tail of
// /courses. This hub groups them by Pune area for a crawlable, human-usable
// entry point and is linked from the footer.
export default function CourseLocationHubPage() {
  // Group combos by their resolved Pune neighbourhood.
  const groups = new Map<string, { area: string; items: typeof courseLocations }>();
  for (const combo of courseLocations) {
    const area = getNeighbourhood(combo.locationSlug)?.name ?? "Across Pune";
    if (!groups.has(area)) groups.set(area, { area, items: [] });
    groups.get(area)!.items.push(combo);
  }
  const grouped = [...groups.values()].sort((a, b) => a.area.localeCompare(b.area));

  return (
    <>
      <PageEvent event="course_location_hub_viewed" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Courses", url: "/courses" },
          { name: "By Pune Area", url: "/courses/in" },
        ]}
      />
      <CategoryCollectionJsonLd
        name="IT Courses in Pune by Area"
        description="Course-and-location landing pages mapping Archer Infotech's job-focused IT courses to the Pune areas where those roles are hiring."
        url="/courses/in"
        items={courseLocations.map((c) => ({
          name: c.shortLabel,
          url: `/courses/in/${c.slug}`,
          description: c.metaDescription,
        }))}
      />

      <header className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            variant="light"
            items={[{ name: "Courses", href: "/courses" }, { name: "By Pune Area" }]}
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
            IT Courses in Pune, by Area
          </h1>
          <p className="text-lg text-white/85 max-w-3xl">
            Every course runs online and in our Kothrud classroom. These pages
            map each job-focused track to the Pune area where it hires most —
            Hinjewadi, Baner, Wakad, Aundh, Pimpri-Chinchwad and Kothrud — with
            the local employers and commute in mind.
          </p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          {grouped.map((g) => (
            <div key={g.area}>
              <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold">
                <MapPin className="h-6 w-6 text-primary" />
                {g.area}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {g.items.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/courses/in/${c.slug}`}
                    className="group rounded-xl border p-5 hover:border-primary hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {c.shortLabel}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium">
                      View course
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <LastUpdated iso={EVERGREEN_LAST_REVIEWED} />
        </div>
      </section>
    </>
  );
}
