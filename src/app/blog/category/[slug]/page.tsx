import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { BlogListingJsonLd, BlogBreadcrumbJsonLd } from "@/components/blog/blog-json-ld";
import { getPublishedPosts, getCategories, getRecentPosts } from "@/lib/actions/blog";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site-config";
import { categoryPath, resolveCategorySlug } from "@/lib/blog/category-slug";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

// Categories come from the database. The production image is built without
// DATABASE_URL, so a static (generateStaticParams) route can't enumerate real
// categories at build time and trips DYNAMIC_SERVER_USAGE on first request.
// Render on demand at request time — same model as /blog — where the DB is
// reachable. P5-06 follow-up.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = resolveCategorySlug(slug, categories);
  if (!category) return { title: "Category Not Found" };

  return buildPageMetadata({
    title: `${category} Articles & Tutorials`,
    description: `Browse ${category} articles, tutorials and career insights from ${siteConfig.name}'s expert trainers. IT training and tech career guidance from Pune.`,
    path: categoryPath(category),
  });
}

export default async function BlogCategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || "1", 10);

  const categories = await getCategories();
  const category = resolveCategorySlug(slug, categories);
  if (!category) notFound();

  const [{ posts, totalPages }, recentPosts] = await Promise.all([
    getPublishedPosts({ page, limit: 9, category }),
    getRecentPosts(5),
  ]);

  const basePath = categoryPath(category);

  return (
    <>
      <BlogListingJsonLd posts={posts} />
      <BlogBreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: category, url: basePath },
        ]}
      />

      {/* Hero */}
      <section className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-sm text-white/70 mb-2">
              <Link href="/blog" className="hover:text-white underline-offset-2 hover:underline">
                Blog
              </Link>{" "}
              / {category}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {category}
            </h1>
            <p className="text-lg text-white/80">
              Articles, tutorials and career insights on {category.toLowerCase()}{" "}
              from {siteConfig.name}&apos;s expert trainers.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {posts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No Posts Found</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    There are no posts in the &ldquo;{category}&rdquo; category yet.
                  </p>
                  <Link href="/blog">
                    <Button>View All Posts</Button>
                  </Link>
                </div>
              ) : (
                <>
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

                  {/* Pagination — clean category paths */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
                      {page > 1 && (
                        <Link href={page - 1 === 1 ? basePath : `${basePath}?page=${page - 1}`}>
                          <Button variant="outline" size="sm">&larr; Previous</Button>
                        </Link>
                      )}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Link key={p} href={p === 1 ? basePath : `${basePath}?page=${p}`}>
                          <Button
                            variant={p === page ? "default" : "outline"}
                            size="sm"
                            className="min-w-[36px]"
                          >
                            {p}
                          </Button>
                        </Link>
                      ))}
                      {page < totalPages && (
                        <Link href={`${basePath}?page=${page + 1}`}>
                          <Button variant="outline" size="sm">Next &rarr;</Button>
                        </Link>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

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
