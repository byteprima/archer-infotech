import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";
import { getPostById } from "@/lib/actions/blog";
import { BlogPostForm } from "@/components/admin/blog-post-form";

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const postId = parseInt(id, 10);

  if (isNaN(postId)) {
    notFound();
  }

  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

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
            <h1 className="text-xl font-bold">Edit Blog Post</h1>
            <p className="text-sm text-muted-foreground">
              Editing: {post.title}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <BlogPostForm post={post} />
      </main>
    </div>
  );
}
