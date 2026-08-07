import { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, Bus } from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd, CategoryCollectionJsonLd } from "@/components/seo/json-ld";
import { LastUpdated } from "@/components/seo/last-updated";
import { studentCities } from "@/data/student-cities";
import { buildPageMetadata } from "@/lib/seo";
import { LOCATIONS_LAST_REVIEWED } from "@/lib/seo/content-dates";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";

export const metadata: Metadata = buildPageMetadata({
  title: "IT Training in Pune for Students from Across Maharashtra",
  description:
    "Online and classroom IT training in Pune for students from Kolhapur, Nashik, Sangli, Satara, Solapur, Ahmednagar and Pandharpur — same curriculum, trainers and 90% placement support, whichever city you are in.",
  path: "/it-training-in-pune-for",
  lastModified: LOCATIONS_LAST_REVIEWED,
});

// Hub index for the /it-training-in-pune-for/[city] cluster. Created to give
// the city feeder pages a real crawlable entry point (they previously had no
// hub — only sibling links + sitemap — and stalled at "discovered / not
// indexed" in GSC).
export default function CityFeederHubPage() {
  const cities = [...studentCities].sort((a, b) => a.priority - b.priority);

  return (
    <>
      <PageEvent event="city_feeder_hub_viewed" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "IT Training by Home City", url: "/it-training-in-pune-for" },
        ]}
      />
      <CategoryCollectionJsonLd
        name="IT Training in Pune for Students from Across Maharashtra"
        description="City-by-city guides to training in Pune online or in the classroom, with travel, stay and batch details for students relocating from other Maharashtra cities."
        url="/it-training-in-pune-for"
        items={cities.map((c) => ({
          name: `IT Training in Pune for ${c.city} Students`,
          url: `/it-training-in-pune-for/${c.slug}`,
          description: c.metaDescription,
        }))}
      />

      <header className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs variant="light" items={[{ name: "IT Training by Home City" }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
            IT Training in Pune for Students Across Maharashtra
          </h1>
          <p className="text-lg text-white/85 max-w-3xl">
            Not from Pune? You still have three ways to train with Archer
            Infotech — live online from home, weekend batches where we run a
            local office, or a classroom seat in Kothrud. Pick your city for
            travel, stay and batch details.
          </p>
        </div>
      </header>

      {/* Opening summary — factual, derived from the collection itself,
          so it cannot drift out of sync with what the hub lists. P-05. */}
      <DefinitiveAnswer eyebrow="For students outside Pune, in short">
        {`Archer Infotech trains students from ${studentCities.length} Maharashtra and neighbouring cities — Satara, Kolhapur, Nashik, Solapur, Sangli-Miraj, Chhatrapati Sambhajinagar and more. Each city page covers live-online batches you can join from home, classroom options in Kothrud, travel time, and the Pune employers hiring from that region.`}
      </DefinitiveAnswer>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/it-training-in-pune-for/${c.slug}`}
              className="group rounded-xl border p-6 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 text-primary mb-2">
                <MapPin className="h-5 w-5" />
                <h2 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {c.city}
                </h2>
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                {c.region}
              </p>
              <p className="text-sm text-muted-foreground">{c.tagline}</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Bus className="h-3.5 w-3.5" />
                {c.distanceKm} km · {c.travelTimeLabel} to our Kothrud centre
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
                See options for {c.city}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <LastUpdated iso={LOCATIONS_LAST_REVIEWED} />
        </div>
      </section>
    </>
  );
}
