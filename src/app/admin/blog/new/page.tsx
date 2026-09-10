import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { requireAdminPage } from "@/lib/admin";

export default async function NewBlogPostPage() {
  await requireAdminPage("/admin/blog/new");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-2">
            <Link
              href="/admin/blog"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Blog
            </Link>
          </div>
          <div>
            <h1 className="text-xl font-bold">New Blog Post</h1>
            <p className="text-sm text-muted-foreground">
              Create a new blog post
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <BlogPostForm />
      </main>
    </div>
  );
}
