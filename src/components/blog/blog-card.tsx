import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  category?: string | null;
  author?: string | null;
  publishedAt?: Date | null;
  createdAt: Date;
}

export function BlogCard({
  title,
  slug,
  excerpt,
  featuredImage,
  category,
  author,
  publishedAt,
  createdAt,
}: BlogCardProps) {
  const displayDate = publishedAt || createdAt;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/blog/${slug}`}>
        {/* Featured Image */}
        <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary/30">
                {title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          {category && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              {category}
            </Badge>
          )}
        </div>

        <CardContent className="p-5">
          {/* Title */}
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time dateTime={displayDate.toISOString()}>
                {displayDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </time>
            </div>
            {author && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{author}</span>
              </div>
            )}
          </div>

          {/* Read More */}
          <div className="mt-4 pt-4 border-t">
            <span className="text-sm font-medium text-primary hover:underline">
              Read More &rarr;
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
