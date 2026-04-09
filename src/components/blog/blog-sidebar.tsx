import Link from "next/link";
import Image from "next/image";
import { Tag, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecentPost {
  id: number;
  title: string;
  slug: string;
  featuredImage: string | null;
  publishedAt: Date | null;
}

interface BlogSidebarProps {
  categories?: string[];
  recentPosts?: RecentPost[];
  currentCategory?: string;
}

export function BlogSidebar({
  categories = [],
  recentPosts = [],
  currentCategory,
}: BlogSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Categories */}
      {categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Tag className="h-4 w-4 text-secondary" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Link href="/blog">
                <Badge
                  variant={!currentCategory ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  All
                </Badge>
              </Link>
              {categories.map((category) => (
                <Link key={category} href={`/blog?category=${encodeURIComponent(category)}`}>
                  <Badge
                    variant={currentCategory === category ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-secondary" />
              Recent Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="flex gap-3 group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary/30">
                          {post.title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    {post.publishedAt && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={post.publishedAt.toISOString()}>
                          {post.publishedAt.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </time>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA Card */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-lg mb-2">
            Want to Learn More?
          </h3>
          <p className="text-primary-foreground/80 text-sm mb-4">
            Explore our industry-leading IT courses with 100% placement assistance.
          </p>
          <Link
            href="/courses"
            className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
          >
            View Courses
          </Link>
        </CardContent>
      </Card>
    </aside>
  );
}
