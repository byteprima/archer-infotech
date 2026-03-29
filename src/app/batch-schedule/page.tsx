import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, Users, MapPin, Monitor, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Batch Schedule",
  description:
    "View upcoming batch schedules for all IT training courses at Archer Infotech. Both offline classroom and online batches available.",
};

// Sample batch data - this would ideally come from a database
const batches = {
  offline: [
    {
      id: 1,
      course: "Java Full Stack",
      startDate: "April 15, 2024",
      timing: "9:00 AM - 12:00 PM",
      duration: "6 Months",
      seats: 15,
      seatsAvailable: 5,
    },
    {
      id: 2,
      course: "Python Programming",
      startDate: "April 10, 2024",
      timing: "2:00 PM - 5:00 PM",
      duration: "2.5 Months",
      seats: 20,
      seatsAvailable: 8,
    },
    {
      id: 3,
      course: "AWS Cloud Computing",
      startDate: "April 20, 2024",
      timing: "6:00 PM - 9:00 PM",
      duration: "3 Months",
      seats: 15,
      seatsAvailable: 10,
    },
    {
      id: 4,
      course: "MERN Stack",
      startDate: "April 25, 2024",
      timing: "10:00 AM - 1:00 PM",
      duration: "5 Months",
      seats: 15,
      seatsAvailable: 7,
    },
    {
      id: 5,
      course: "DevOps Engineering",
      startDate: "May 1, 2024",
      timing: "9:00 AM - 12:00 PM",
      duration: "4 Months",
      seats: 15,
      seatsAvailable: 12,
    },
    {
      id: 6,
      course: "Data Science",
      startDate: "May 5, 2024",
      timing: "2:00 PM - 5:00 PM",
      duration: "5 Months",
      seats: 12,
      seatsAvailable: 9,
    },
  ],
  online: [
    {
      id: 7,
      course: "Java Full Stack",
      startDate: "April 12, 2024",
      timing: "7:00 PM - 9:00 PM",
      duration: "6 Months",
      seats: 30,
      seatsAvailable: 15,
    },
    {
      id: 8,
      course: "Machine Learning",
      startDate: "April 18, 2024",
      timing: "8:00 PM - 10:00 PM",
      duration: "4 Months",
      seats: 25,
      seatsAvailable: 18,
    },
    {
      id: 9,
      course: "Python Programming",
      startDate: "April 22, 2024",
      timing: "6:00 PM - 8:00 PM",
      duration: "2.5 Months",
      seats: 30,
      seatsAvailable: 20,
    },
    {
      id: 10,
      course: "Generative AI",
      startDate: "April 28, 2024",
      timing: "7:00 PM - 9:00 PM",
      duration: "3 Months",
      seats: 25,
      seatsAvailable: 22,
    },
    {
      id: 11,
      course: "AWS Cloud Computing",
      startDate: "May 3, 2024",
      timing: "8:00 PM - 10:00 PM",
      duration: "3 Months",
      seats: 30,
      seatsAvailable: 25,
    },
    {
      id: 12,
      course: "React.js",
      startDate: "May 8, 2024",
      timing: "6:00 PM - 8:00 PM",
      duration: "2.5 Months",
      seats: 25,
      seatsAvailable: 20,
    },
  ],
};

function BatchCard({
  batch,
  mode,
}: {
  batch: (typeof batches.offline)[0];
  mode: "offline" | "online";
}) {
  const isAlmostFull = batch.seatsAvailable <= 5;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{batch.course}</CardTitle>
          {isAlmostFull && (
            <Badge className="bg-red-100 text-red-700">Almost Full</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span>Starts: {batch.startDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span>{batch.timing}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {mode === "offline" ? (
            <MapPin className="h-4 w-4 text-primary" />
          ) : (
            <Monitor className="h-4 w-4 text-primary" />
          )}
          <span>{mode === "offline" ? "Classroom Training" : "Live Online"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-primary" />
          <span>
            {batch.seatsAvailable} of {batch.seats} seats available
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

export default function BatchSchedulePage() {
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
              <TabsList className="grid w-full md:w-auto grid-cols-2">
                <TabsTrigger value="offline" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  Offline Batches
                </TabsTrigger>
                <TabsTrigger value="online" className="gap-2">
                  <Monitor className="h-4 w-4" />
                  Online Batches
                </TabsTrigger>
              </TabsList>
              <p className="text-sm text-muted-foreground">
                Last updated: March 2024
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
                {batches.offline.map((batch) => (
                  <BatchCard key={batch.id} batch={batch} mode="offline" />
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
                {batches.online.map((batch) => (
                  <BatchCard key={batch.id} batch={batch} mode="online" />
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
