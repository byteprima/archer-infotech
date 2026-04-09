import { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { BlogListingJsonLd, BlogBreadcrumbJsonLd } from "@/components/blog/blog-json-ld";
import { getPublishedPosts, getCategories, getRecentPosts } from "@/lib/actions/blog";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  description: `Read the latest articles, tutorials, and insights from ${siteConfig.name}. Stay updated on IT trends, programming tips, career advice, and more.`,
  keywords: [
    "IT blog",
    "programming tutorials",
    "tech articles",
    "career advice",
    "software development",
    "Pune IT training",
  ],
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: `Read the latest articles, tutorials, and insights from ${siteConfig.name}.`,
    type: "website",
    url: `${siteConfig.url}/blog`,
  },
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const category = params.category;
  const page = parseInt(params.page || "1", 10);

  const [{ posts, totalCount, totalPages }, categories, recentPosts] = await Promise.all([
    getPublishedPosts({ page, limit: 9, category }),
    getCategories(),
    getRecentPosts(5),
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <BlogListingJsonLd posts={posts} />
      <BlogBreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]}
      />

      {/* Hero Section */}
      <section className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Blog
            </h1>
            <p className="text-lg text-white/80">
              Stay updated with the latest in technology, programming tutorials,
              career tips, and insights from our expert trainers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Posts Grid */}
            <div className="lg:col-span-3">
              {/* Category Badge */}
              {category && (
                <div className="mb-6 flex items-center gap-2">
                  <span className="text-muted-foreground">Filtered by:</span>
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {category}
                  </span>
                  <Link href="/blog">
                    <Button variant="ghost" size="sm">
                      Clear
                    </Button>
                  </Link>
                </div>
              )}

              {posts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No Posts Found</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    {category
                      ? `There are no posts in the "${category}" category yet.`
                      : "We haven't published any blog posts yet. Check back soon!"}
                  </p>
                  {category && (
                    <Link href="/blog">
                      <Button>View All Posts</Button>
                    </Link>
                  )}
                </div>
              ) : (
                <>
                  {/* Posts Grid */}
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {posts.map((post) => (
                      <BlogCard
                        key={post.id}
                        title={post.title}
                        slug={post.slug}
                        excerpt={post.excerpt}
                        featuredImage={post.featuredImage}
                        category={post.category}
                        author={post.author}
                        publishedAt={post.publishedAt}
                        createdAt={post.createdAt}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-12">
                      {page > 1 && (
                        <Link
                          href={`/blog?page=${page - 1}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                        >
                          <Button variant="outline">&larr; Previous</Button>
                        </Link>
                      )}
                      <span className="text-sm text-muted-foreground">
                        Page {page} of {totalPages}
                      </span>
                      {page < totalPages && (
                        <Link
                          href={`/blog?page=${page + 1}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                        >
                          <Button variant="outline">Next &rarr;</Button>
                        </Link>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar
                categories={categories}
                recentPosts={recentPosts}
                currentCategory={category}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
