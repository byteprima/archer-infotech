import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { requireAdminPage } from "@/lib/admin";

export default async function NewTestimonialPage() {
  await requireAdminPage();

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
            <h1 className="text-xl font-bold">New Testimonial</h1>
            <p className="text-sm text-muted-foreground">
              Create a new testimonial and choose whether it should be published or featured.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <TestimonialForm />
      </main>
    </div>
  );
}
