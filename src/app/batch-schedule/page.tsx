import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, Users, MapPin, Monitor, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/data/site-config";
import { db } from "@/db";
import { batches as batchesTable, type Batch } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Batch Schedule",
  description:
    "View upcoming batch schedules for all IT training courses at Archer Infotech. Both offline classroom and online batches available.",
};

function BatchCard({ batch }: { batch: Batch }) {
  const isAlmostFull = batch.seatsAvailable <= 5;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{batch.courseName}</CardTitle>
          {isAlmostFull && (
            <Badge className="bg-red-100 text-red-700">Almost Full</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span>Starts: {new Date(batch.startDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span>{batch.timing}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {batch.mode === "offline" ? (
            <MapPin className="h-4 w-4 text-primary" />
          ) : (
            <Monitor className="h-4 w-4 text-primary" />
          )}
          <span>{batch.mode === "offline" ? "Classroom Training" : "Live Online"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-primary" />
          <span>
            {batch.seatsAvailable} of {batch.totalSeats} seats available
          </span>
        </div>
        <div className="pt-2">
          <Badge variant="outline">{batch.duration}</Badge>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 w-full justify-center bg-secondary text-secondary-foreground py-2 rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors mt-2"
        >
          Enroll Now
        </Link>
      </CardContent>
    </Card>
  );
}

export default async function BatchSchedulePage() {
  const offlineBatches = await db.select().from(batchesTable).where(eq(batchesTable.mode, "offline")).orderBy(asc(batchesTable.startDate));
  const onlineBatches = await db.select().from(batchesTable).where(eq(batchesTable.mode, "online")).orderBy(asc(batchesTable.startDate));

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Batch Schedule
            </h1>
            <p className="text-lg text-white/80">
              View upcoming batch schedules for all our IT training courses. Choose
              between classroom training in Pune or live online sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="offline" className="w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <TabsList
                size="lg"
                className="grid w-full max-w-3xl grid-cols-1 gap-2 border border-primary/10 bg-primary/5 shadow-sm sm:grid-cols-2"
              >
                <TabsTrigger
                  value="offline"
                  className="flex min-h-20 flex-col items-start justify-center gap-1 border border-transparent bg-transparent px-4 text-left text-foreground/75 hover:bg-background/80 hover:text-foreground data-active:border-primary/15 data-active:bg-background data-active:text-primary data-active:shadow-sm sm:items-center sm:text-center"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 shrink-0" />
                    <span>Offline Batches</span>
                  </span>
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                    Classroom training in Pune
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="online"
                  className="flex min-h-20 flex-col items-start justify-center gap-1 border border-transparent bg-transparent px-4 text-left text-foreground/75 hover:bg-background/80 hover:text-foreground data-active:border-primary/15 data-active:bg-background data-active:text-primary data-active:shadow-sm sm:items-center sm:text-center"
                >
                  <span className="flex items-center gap-2">
                    <Monitor className="h-5 w-5 shrink-0" />
                    <span>Online Batches</span>
                  </span>
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                    Live instructor-led sessions
                  </span>
                </TabsTrigger>
              </TabsList>
              <p className="text-sm text-muted-foreground">
                Last updated: April 2026
              </p>
            </div>

            <TabsContent value="offline">
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Classroom Training in Pune
                </h3>
                <p className="text-sm text-muted-foreground">
                  In-person classes at our training center. Small batch sizes for
                  personalized attention.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offlineBatches.map((batch) => (
                  <BatchCard key={batch.id} batch={batch} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="online">
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-primary" />
                  Live Online Training
                </h3>
                <p className="text-sm text-muted-foreground">
                  Interactive live classes via Zoom/Google Meet. Learn from
                  anywhere with the same quality training.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {onlineBatches.map((batch) => (
                  <BatchCard key={batch.id} batch={batch} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">Custom Batch Timing</h3>
                <p className="text-sm text-muted-foreground">
                  Need a different timing? Contact us for custom batch arrangements.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">Weekend Batches</h3>
                <p className="text-sm text-muted-foreground">
                  Weekend-only batches available for working professionals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">Fast Track Options</h3>
                <p className="text-sm text-muted-foreground">
                  Accelerated courses available for quick completion.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can&apos;t Find a Suitable Batch?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Contact us to discuss your requirements. We can arrange custom timings
            or notify you when new batches are scheduled.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
            >
              Contact Us
            </Link>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
