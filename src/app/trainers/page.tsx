import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getTeamMembers } from "@/data/team";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Trainers — Industry Experts at Archer Infotech, Pune",
  description:
    "Meet the trainers behind Archer Infotech's Pune programmes. 10–15+ years of MNC experience across Java, Python, AI/ML, Cloud, .NET, Full Stack, and Generative AI.",
  path: "/trainers",
});

export default function TrainersPage() {
  const trainers = getTeamMembers();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Trainers", url: "/trainers" },
        ]}
      />

      <section className="gradient-hero text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-4">
              <Award className="h-4 w-4 text-secondary" />
              <span>Industry-experienced trainers</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Meet the Trainers Behind Archer Infotech
            </h1>
            <p className="text-lg text-white/80">
              Every course at Archer Infotech is led by a working professional with deep
              MNC experience. Get to know the people teaching you, the projects they
              have shipped, and the courses they own.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((trainer) => (
              <Link key={trainer.id} href={`/trainers/${trainer.id}`} className="block">
                <Card className="hover:shadow-lg hover:border-primary/30 transition-all h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {trainer.image ? (
                        <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0 ring-2 ring-primary/10">
                          <Image
                            src={trainer.image}
                            alt={`${trainer.name}, ${trainer.role} at Archer Infotech, Pune`}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold shrink-0">
                          {trainer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                      <div className="flex-grow">
                        <h2 className="font-semibold text-lg">{trainer.name}</h2>
                        <p className="text-sm text-muted-foreground mb-1">{trainer.role}</p>
                        <p className="text-xs text-primary font-medium">
                          {trainer.experience}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mt-4 line-clamp-3">
                      {trainer.bio}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {trainer.expertise.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {trainer.expertise.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{trainer.expertise.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                      View profile <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
