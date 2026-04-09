import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Plus, Star, Quote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { isAuthenticated } from "@/lib/auth";
import { db } from "@/db";
import { testimonials as testimonialsTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function AdminTestimonialsPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const testimonials = await db.select().from(testimonialsTable).orderBy(desc(testimonialsTable.createdAt));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-2">
            <Link
              href="/admin"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Testimonials Management</h1>
              <p className="text-sm text-muted-foreground">
                {testimonials.length} testimonials
              </p>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-secondary mb-4" />
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-4 border-t">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-secondary text-secondary"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {testimonial.isHighlighted && (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Featured
                      </Badge>
                    )}
                    <Badge
                      className={
                        testimonial.isPublished
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {testimonial.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {testimonials.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No testimonials found</p>
              <Button size="sm" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add First Testimonial
              </Button>
            </CardContent>
          </Card>
        )}

      </main>
    </div>
  );
}
