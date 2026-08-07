import { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd, CategoryCollectionJsonLd } from "@/components/seo/json-ld";
import { getNeighbourhoodsByPriority } from "@/data/locations";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site-config";
import { LastUpdated } from "@/components/seo/last-updated";
import { LOCATIONS_LAST_REVIEWED } from "@/lib/seo/content-dates";

export const metadata: Metadata = buildPageMetadata({
  title: "IT Training Across Pune — Locations We Serve",
  description:
    "Archer Infotech's training centre is in Kothrud, and we serve students and IT professionals across Pune — Karve Nagar, Erandwane, Baner, Aundh, Hinjewadi, Wakad, Pimpri-Chinchwad, Deccan and more — with classroom, weekend and live online batches.",
  path: "/locations",
});

export default function LocationsIndexPage() {
  const areas = getNeighbourhoodsByPriority();

  return (
    <>
      <PageEvent event="locations_index_viewed" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Locations", url: "/locations" },
        ]}
      />
      <CategoryCollectionJsonLd
        name="IT Training Across Pune — Locations We Serve"
        description="Archer Infotech's training centre is in Kothrud and serves students across Pune — Karve Nagar, Erandwane, Baner, Aundh, Hinjewadi, Wakad, Pimpri-Chinchwad, Deccan and more."
        url="/locations"
        items={areas.map((area) => ({
          name: `IT training in ${area.name}`,
          url: `/locations/${area.slug}`,
          description: area.tagline,
        }))}
      />

      <header className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs variant="light" items={[{ name: "Locations" }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
            IT Training Across Pune — Locations We Serve
          </h1>
          <LastUpdated iso={LOCATIONS_LAST_REVIEWED} className="mt-3 text-xs md:text-sm text-white/70" />
          <p className="text-lg text-white/85 max-w-3xl">
            Our centre is in Kothrud, but our students come from right across
            Pune and the PCMC belt. Find your neighbourhood below for commute
            details, the courses students near you choose, and the batch format
            that fits — classroom, weekend or live online.
          </p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/locations/${area.slug}`}
              className="group rounded-xl border p-6 hover:border-primary hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex items-center gap-2 text-primary mb-2">
                <MapPin className="h-5 w-5" />
                <h2 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {area.name}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground flex-grow">
                {area.tagline}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
                IT training in {area.name}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-muted/30 border p-6 text-center">
          <p className="text-muted-foreground">
            Don&apos;t see your area? We serve all of Pune through live online
            batches and weekend classroom sessions.{" "}
            <Link href="/contact" className="text-primary hover:underline font-medium">
              Talk to us
            </Link>{" "}
            or call{" "}
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="text-primary hover:underline font-medium"
            >
              {siteConfig.contact.phone}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
