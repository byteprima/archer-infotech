import Link from "next/link";
import { ChevronLeft, Plus, Quote, CheckCircle2, CircleOff, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TestimonialAdminActions } from "@/components/admin/testimonial-admin-actions";
import { getAllTestimonials } from "@/lib/actions/testimonials";
import { requireAdminPage } from "@/lib/admin";

export default async function AdminTestimonialsPage() {
  await requireAdminPage();

  const { testimonials, totalCount, publishedCount, draftCount, highlightedCount } =
    await getAllTestimonials();

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-2 flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold">Testimonials Management</h1>
              <p className="text-sm text-muted-foreground">
                Manage student reviews, feature strong stories, and control public visibility.
              </p>
            </div>
            <Link href="/admin/testimonials/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Testimonial
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{totalCount}</div>
              <p className="text-sm text-muted-foreground">Total testimonials</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{publishedCount}</div>
              <p className="text-sm text-muted-foreground">Published</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">{draftCount}</div>
              <p className="text-sm text-muted-foreground">Drafts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{highlightedCount}</div>
              <p className="text-sm text-muted-foreground">Highlighted</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="flex h-full flex-col pt-6">
                <Quote className="mb-4 h-8 w-8 text-secondary" />
                <p className="mb-4 flex-grow text-muted-foreground line-clamp-4">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-4 border-t pt-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={testimonial.photoUrl || undefined}
                      alt={testimonial.name}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.name
                        .split(" ")
                        .filter(Boolean)
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {[testimonial.role, testimonial.company].filter(Boolean).join(" at ") ||
                        "Role not set"}
                    </div>
                    {testimonial.courseTaken && (
                      <div className="text-xs text-muted-foreground">
                        Course: {testimonial.courseTaken}
                      </div>
                    )}
                    <div className="mt-1 flex items-center gap-1">
                      {Array.from({ length: testimonial.rating ?? 5 }).map((_, index) => (
                        <Star key={index} className="h-3 w-3 fill-secondary text-secondary" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {testimonial.isHighlighted ? (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Sparkles className="mr-1 h-3 w-3" />
                      Highlighted
                    </Badge>
                  ) : (
                    <Badge variant="outline">Standard</Badge>
                  )}
                  {testimonial.isPublished ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Published
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-800">
                      <CircleOff className="mr-1 h-3 w-3" />
                      Draft
                    </Badge>
                  )}
                </div>

                <div className="mt-4">
                  <TestimonialAdminActions
                    id={testimonial.id}
                    name={testimonial.name}
                    isPublished={testimonial.isPublished ?? true}
                    isHighlighted={testimonial.isHighlighted ?? false}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {testimonials.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Quote className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No testimonials found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add your first testimonial to showcase student success stories.
              </p>
              <Link href="/admin/testimonials/new" className="mt-4 inline-block">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Testimonial
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
