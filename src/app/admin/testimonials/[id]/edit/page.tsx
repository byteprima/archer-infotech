import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { getTestimonialById } from "@/lib/actions/testimonials";
import { requireAdminPage } from "@/lib/admin";

interface EditTestimonialPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  await requireAdminPage();

  const { id } = await params;
  const testimonialId = Number.parseInt(id, 10);

  if (Number.isNaN(testimonialId)) {
    notFound();
  }

  const testimonial = await getTestimonialById(testimonialId);

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-2 flex items-center gap-4">
            <Link
              href="/admin/testimonials"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Testimonials
            </Link>
          </div>
          <div>
            <h1 className="text-xl font-bold">Edit Testimonial</h1>
            <p className="text-sm text-muted-foreground">
              Editing: {testimonial.name}
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <TestimonialForm testimonial={testimonial} />
      </main>
    </div>
  );
}
