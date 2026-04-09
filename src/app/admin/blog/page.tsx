import Link from "next/link";
import {
  ChevronLeft,
  Plus,
  FileText,
  Eye,
  EyeOff,
  Pencil,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/actions/blog";
import { DeletePostButton, TogglePublishButton } from "./actions";
import { requireAdminPage } from "@/lib/admin";

interface AdminBlogPageProps {
  searchParams: Promise<{ status?: string; page?: string; q?: string }>;
}

export default async function AdminBlogPage({ searchParams }: AdminBlogPageProps) {
  await requireAdminPage();

  const params = await searchParams;
  const status = params.status as "all" | "published" | "draft" | undefined;
  const page = parseInt(params.page || "1", 10);
  const search = params.q?.trim() || "";

  const { posts, totalCount, totalPages, publishedCount, draftCount } =
    await getAllPosts({
      page,
      limit: 10,
      status: status || "all",
      search,
    });

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
              <h1 className="text-xl font-bold">Blog Management</h1>
              <p className="text-sm text-muted-foreground">
                Manage blog posts and articles
              </p>
            </div>
            <Link href="/admin/blog/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{totalCount}</div>
              <p className="text-sm text-muted-foreground">Total Posts</p>
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
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              name="q"
              defaultValue={search}
              placeholder="Search by title, slug, or category..."
              className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {status && status !== "all" && <input type="hidden" name="status" value={status} />}
            <Button type="submit" variant="outline">
              Search
            </Button>
          </form>
          <div className="flex gap-2">
            <Link href={search ? `/admin/blog?q=${encodeURIComponent(search)}` : "/admin/blog"}>
              <Button variant={!status || status === "all" ? "default" : "outline"} size="sm">
                All
              </Button>
            </Link>
            <Link
              href={`/admin/blog?status=published${search ? `&q=${encodeURIComponent(search)}` : ""}`}
            >
              <Button variant={status === "published" ? "default" : "outline"} size="sm">
                Published
              </Button>
            </Link>
            <Link
              href={`/admin/blog?status=draft${search ? `&q=${encodeURIComponent(search)}` : ""}`}
            >
              <Button variant={status === "draft" ? "default" : "outline"} size="sm">
                Drafts
              </Button>
            </Link>
          </div>
        </div>

        {/* Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No posts found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {search ? "Try a different search term or filter." : "Create your first blog post to get started"}
                </p>
                <Link href="/admin/blog/new" className="mt-4 inline-block">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Title</th>
                      <th className="pb-3 font-medium">Category</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id} className="border-b last:border-0">
                        <td className="py-4">
                          <div className="font-medium">{post.title}</div>
                          <div className="text-sm text-muted-foreground">
                            /blog/{post.slug}
                          </div>
                        </td>
                        <td className="py-4">
                          {post.category ? (
                            <Badge variant="outline">{post.category}</Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="py-4">
                          {post.isPublished ? (
                            <Badge className="bg-green-100 text-green-800">
                              <Eye className="h-3 w-3 mr-1" />
                              Published
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <EyeOff className="h-3 w-3 mr-1" />
                              Draft
                            </Badge>
                          )}
                        </td>
                        <td className="py-4">
                          <div className="text-sm text-muted-foreground">
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString()
                              : new Date(post.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center justify-end gap-2">
                            {post.isPublished && (
                              <a
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button variant="ghost" size="sm">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </a>
                            )}
                            <TogglePublishButton
                              id={post.id}
                              isPublished={post.isPublished ?? false}
                            />
                            <Link href={`/admin/blog/${post.id}/edit`}>
                              <Button variant="ghost" size="sm">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Link>
                            <DeletePostButton id={post.id} title={post.title} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {page > 1 && (
                  <Link
                    href={`/admin/blog?page=${page - 1}${status ? `&status=${status}` : ""}${search ? `&q=${encodeURIComponent(search)}` : ""}`}
                  >
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                  </Link>
                )}
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link
                    href={`/admin/blog?page=${page + 1}${status ? `&status=${status}` : ""}${search ? `&q=${encodeURIComponent(search)}` : ""}`}
                  >
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Database Status */}
        {!process.env.DATABASE_URL && (
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> Database is not configured. Posts will not be
              persisted. Set the DATABASE_URL environment variable to enable database
              storage.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
