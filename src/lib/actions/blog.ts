"use server";

import { z } from "zod";
import { eq, desc, and, sql, like, or, type SQL } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import {
  placeholderBlogs,
  getPlaceholderCategories,
  getPlaceholderPostBySlug,
  getPlaceholderRecentPosts,
} from "@/data/placeholder-blogs";
import { logAdminAction, requireAdminAction } from "@/lib/admin";

// Schema for blog post validation
const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().url().optional().or(z.literal("")),
  category: z.string().optional(),
  tags: z.string().optional(),
  metaTitle: z.string().max(255).optional(),
  metaDescription: z.string().optional(),
  author: z.string().optional(),
  isPublished: z.boolean().optional(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;

export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: unknown;
};

// ============================================
// PUBLIC FUNCTIONS
// ============================================

export async function getPublishedPosts(options?: {
  page?: number;
  limit?: number;
  category?: string;
}): Promise<{
  posts: Array<{
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    featuredImage: string | null;
    category: string | null;
    author: string | null;
    publishedAt: Date | null;
    createdAt: Date;
  }>;
  totalCount: number;
  totalPages: number;
}> {
  const page = options?.page || 1;
  const limit = options?.limit || 9;
  const offset = (page - 1) * limit;

  try {
    if (!process.env.DATABASE_URL) {
      // Use placeholder data when no database is configured
      let filteredPosts = placeholderBlogs.filter((p) => p.isPublished);
      if (options?.category) {
        filteredPosts = filteredPosts.filter((p) => p.category === options.category);
      }
      const totalCount = filteredPosts.length;
      const totalPages = Math.ceil(totalCount / limit);
      const paginatedPosts = filteredPosts
        .sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0))
        .slice(offset, offset + limit)
        .map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          featuredImage: p.featuredImage,
          category: p.category,
          author: p.author,
          publishedAt: p.publishedAt,
          createdAt: p.createdAt,
        }));
      return { posts: paginatedPosts, totalCount, totalPages };
    }

    const { db, blogPosts } = await import("@/db");

    // Build where conditions
    const conditions = [eq(blogPosts.isPublished, true)];
    if (options?.category) {
      conditions.push(eq(blogPosts.category, options.category));
    }

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(blogPosts)
      .where(and(...conditions));
    const totalCount = Number(countResult[0]?.count || 0);
    const totalPages = Math.ceil(totalCount / limit);

    // Get posts
    const posts = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        featuredImage: blogPosts.featuredImage,
        category: blogPosts.category,
        author: blogPosts.author,
        publishedAt: blogPosts.publishedAt,
        createdAt: blogPosts.createdAt,
      })
      .from(blogPosts)
      .where(and(...conditions))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit)
      .offset(offset);

    return { posts, totalCount, totalPages };
  } catch (error) {
    console.error("Error fetching published posts:", error);
    return { posts: [], totalCount: 0, totalPages: 0 };
  }
}

export async function getPublishedPostBySlug(slug: string) {
  try {
    if (!process.env.DATABASE_URL) {
      // Use placeholder data when no database is configured
      return getPlaceholderPostBySlug(slug) || null;
    }

    const { db, blogPosts } = await import("@/db");

    const result = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true)))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    if (!process.env.DATABASE_URL) {
      // Use placeholder data when no database is configured
      return getPlaceholderCategories();
    }

    const { db, blogPosts } = await import("@/db");

    const result = await db
      .selectDistinct({ category: blogPosts.category })
      .from(blogPosts)
      .where(
        and(eq(blogPosts.isPublished, true), sql`${blogPosts.category} IS NOT NULL`)
      );

    return result.map((r) => r.category).filter(Boolean) as string[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getRecentPosts(
  limit: number = 5,
  excludeSlug?: string
): Promise<
  Array<{
    id: number;
    title: string;
    slug: string;
    featuredImage: string | null;
    publishedAt: Date | null;
  }>
> {
  try {
    if (!process.env.DATABASE_URL) {
      // Use placeholder data when no database is configured
      return getPlaceholderRecentPosts(limit, excludeSlug).map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        featuredImage: p.featuredImage,
        publishedAt: p.publishedAt,
      }));
    }

    const { db, blogPosts } = await import("@/db");

    const conditions = [eq(blogPosts.isPublished, true)];
    if (excludeSlug) {
      conditions.push(sql`${blogPosts.slug} != ${excludeSlug}`);
    }

    const posts = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        featuredImage: blogPosts.featuredImage,
        publishedAt: blogPosts.publishedAt,
      })
      .from(blogPosts)
      .where(and(...conditions))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit);

    return posts;
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  try {
    if (!process.env.DATABASE_URL) {
      // Use placeholder data when no database is configured
      return placeholderBlogs.filter((p) => p.isPublished).map((p) => p.slug);
    }

    const { db, blogPosts } = await import("@/db");

    const result = await db
      .select({ slug: blogPosts.slug })
      .from(blogPosts)
      .where(eq(blogPosts.isPublished, true));

    return result.map((r) => r.slug);
  } catch (error) {
    console.error("Error fetching all slugs:", error);
    return [];
  }
}

// ============================================
// ADMIN FUNCTIONS
// ============================================

export async function getAllPosts(options?: {
  page?: number;
  limit?: number;
  status?: "all" | "published" | "draft";
  search?: string;
}): Promise<{
  posts: Array<{
    id: number;
    title: string;
    slug: string;
    category: string | null;
    isPublished: boolean | null;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }>;
  totalCount: number;
  totalPages: number;
  publishedCount: number;
  draftCount: number;
}> {
  await requireAdminAction();

  const page = options?.page || 1;
  const limit = options?.limit || 10;
  const offset = (page - 1) * limit;

  try {
    if (!process.env.DATABASE_URL) {
      return {
        posts: [],
        totalCount: 0,
        totalPages: 0,
        publishedCount: 0,
        draftCount: 0,
      };
    }

    const { db, blogPosts } = await import("@/db");

    // Build where conditions
    const conditions: SQL[] = [];
    if (options?.status === "published") {
      conditions.push(eq(blogPosts.isPublished, true));
    } else if (options?.status === "draft") {
      conditions.push(eq(blogPosts.isPublished, false));
    }
    if (options?.search?.trim()) {
      const searchTerm = `%${options.search.trim()}%`;
      conditions.push(
        or(
          like(blogPosts.title, searchTerm),
          like(blogPosts.slug, searchTerm),
          like(sql`coalesce(${blogPosts.category}, '')`, searchTerm)
        )!
      );
    }

    // Get counts
    const allCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(blogPosts);
    const publishedCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(blogPosts)
      .where(eq(blogPosts.isPublished, true));
    const draftCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(blogPosts)
      .where(eq(blogPosts.isPublished, false));

    const totalCount = Number(allCountResult[0]?.count || 0);
    const publishedCount = Number(publishedCountResult[0]?.count || 0);
    const draftCount = Number(draftCountResult[0]?.count || 0);

    // Get filtered count for pagination
    let filteredCount = totalCount;
    if (conditions.length > 0) {
      const filteredCountResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(blogPosts)
        .where(and(...conditions));
      filteredCount = Number(filteredCountResult[0]?.count || 0);
    }
    const totalPages = Math.ceil(filteredCount / limit);

    // Get posts
    const posts = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        category: blogPosts.category,
        isPublished: blogPosts.isPublished,
        publishedAt: blogPosts.publishedAt,
        createdAt: blogPosts.createdAt,
        updatedAt: blogPosts.updatedAt,
      })
      .from(blogPosts)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(blogPosts.createdAt))
      .limit(limit)
      .offset(offset);

    return { posts, totalCount, totalPages, publishedCount, draftCount };
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return {
      posts: [],
      totalCount: 0,
      totalPages: 0,
      publishedCount: 0,
      draftCount: 0,
    };
  }
}

export async function getPostById(id: number) {
  await requireAdminAction();

  try {
    if (!process.env.DATABASE_URL) {
      return null;
    }

    const { db, blogPosts } = await import("@/db");

    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("Error fetching post by id:", error);
    return null;
  }
}

export async function createPost(data: BlogPostFormData): Promise<ActionResult> {
  await requireAdminAction();

  const validationResult = blogPostSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    if (!process.env.DATABASE_URL) {
      console.log("Blog post creation (no database configured):", validationResult.data);
      return {
        success: true,
        message: "Blog post created successfully (mock)",
      };
    }

    const { db, blogPosts } = await import("@/db");

    // Check for duplicate slug
    const existing = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(eq(blogPosts.slug, validationResult.data.slug))
      .limit(1);

    if (existing.length > 0) {
      return {
        success: false,
        message: "A post with this slug already exists",
      };
    }

    const result = await db
      .insert(blogPosts)
      .values({
        title: validationResult.data.title,
        slug: validationResult.data.slug,
        excerpt: validationResult.data.excerpt || null,
        content: validationResult.data.content,
        featuredImage: validationResult.data.featuredImage || null,
        category: validationResult.data.category || null,
        tags: validationResult.data.tags || null,
        metaTitle: validationResult.data.metaTitle || null,
        metaDescription: validationResult.data.metaDescription || null,
        author: validationResult.data.author || "Archer Infotech",
        isPublished: validationResult.data.isPublished ?? false,
        publishedAt: validationResult.data.isPublished ? new Date() : null,
      })
      .returning({ id: blogPosts.id });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");

    await logAdminAction({
      action: "blog.create",
      entityType: "blog_post",
      entityId: result[0]?.id ?? null,
      summary: `Created blog post "${validationResult.data.title}"`,
      metadata: {
        slug: validationResult.data.slug,
        isPublished: validationResult.data.isPublished ?? false,
      },
    });

    return {
      success: true,
      message: "Blog post created successfully",
      data: { id: result[0]?.id },
    };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return {
      success: false,
      message: "Failed to create blog post. Please try again.",
    };
  }
}

export async function updatePost(
  id: number,
  data: BlogPostFormData
): Promise<ActionResult> {
  await requireAdminAction();

  const validationResult = blogPostSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    if (!process.env.DATABASE_URL) {
      console.log("Blog post update (no database configured):", id, validationResult.data);
      return {
        success: true,
        message: "Blog post updated successfully (mock)",
      };
    }

    const { db, blogPosts } = await import("@/db");

    // Check for duplicate slug (excluding current post)
    const existing = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(
        and(eq(blogPosts.slug, validationResult.data.slug), sql`${blogPosts.id} != ${id}`)
      )
      .limit(1);

    if (existing.length > 0) {
      return {
        success: false,
        message: "A post with this slug already exists",
      };
    }

    // Get current post to check if publish status changed
    const currentPost = await db
      .select({ isPublished: blogPosts.isPublished, publishedAt: blogPosts.publishedAt })
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1);

    const wasPublished = currentPost[0]?.isPublished;
    const isNowPublished = validationResult.data.isPublished ?? false;

    // Set publishedAt if newly published
    let publishedAt = currentPost[0]?.publishedAt;
    if (!wasPublished && isNowPublished) {
      publishedAt = new Date();
    }

    await db
      .update(blogPosts)
      .set({
        title: validationResult.data.title,
        slug: validationResult.data.slug,
        excerpt: validationResult.data.excerpt || null,
        content: validationResult.data.content,
        featuredImage: validationResult.data.featuredImage || null,
        category: validationResult.data.category || null,
        tags: validationResult.data.tags || null,
        metaTitle: validationResult.data.metaTitle || null,
        metaDescription: validationResult.data.metaDescription || null,
        author: validationResult.data.author || "Archer Infotech",
        isPublished: isNowPublished,
        publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id));

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${validationResult.data.slug}`);

    await logAdminAction({
      action: "blog.update",
      entityType: "blog_post",
      entityId: id,
      summary: `Updated blog post "${validationResult.data.title}"`,
      metadata: {
        slug: validationResult.data.slug,
        isPublished: isNowPublished,
      },
    });

    return {
      success: true,
      message: "Blog post updated successfully",
    };
  } catch (error) {
    console.error("Error updating blog post:", error);
    return {
      success: false,
      message: "Failed to update blog post. Please try again.",
    };
  }
}

export async function deletePost(id: number): Promise<ActionResult> {
  await requireAdminAction();

  try {
    if (!process.env.DATABASE_URL) {
      console.log("Blog post deletion (no database configured):", id);
      return {
        success: true,
        message: "Blog post deleted successfully (mock)",
      };
    }

    const { db, blogPosts } = await import("@/db");

    // Get slug for revalidation
    const post = await db
      .select({ slug: blogPosts.slug })
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1);

    await db.delete(blogPosts).where(eq(blogPosts.id, id));

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    if (post[0]?.slug) {
      revalidatePath(`/blog/${post[0].slug}`);
    }

    await logAdminAction({
      action: "blog.delete",
      entityType: "blog_post",
      entityId: id,
      summary: `Deleted blog post with ID ${id}`,
      metadata: {
        slug: post[0]?.slug ?? null,
      },
    });

    return {
      success: true,
      message: "Blog post deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return {
      success: false,
      message: "Failed to delete blog post. Please try again.",
    };
  }
}

export async function togglePublishStatus(
  id: number,
  isPublished: boolean
): Promise<ActionResult> {
  await requireAdminAction();

  try {
    if (!process.env.DATABASE_URL) {
      console.log("Blog post publish toggle (no database configured):", id, isPublished);
      return {
        success: true,
        message: isPublished ? "Post published successfully" : "Post unpublished successfully",
      };
    }

    const { db, blogPosts } = await import("@/db");

    // Get current post
    const post = await db
      .select({ slug: blogPosts.slug, publishedAt: blogPosts.publishedAt })
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1);

    // Set publishedAt if newly published
    const publishedAt = isPublished
      ? post[0]?.publishedAt || new Date()
      : post[0]?.publishedAt;

    await db
      .update(blogPosts)
      .set({
        isPublished,
        publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id));

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    if (post[0]?.slug) {
      revalidatePath(`/blog/${post[0].slug}`);
    }

    await logAdminAction({
      action: "blog.publish",
      entityType: "blog_post",
      entityId: id,
      summary: `${isPublished ? "Published" : "Unpublished"} blog post with ID ${id}`,
      metadata: {
        slug: post[0]?.slug ?? null,
        isPublished,
      },
    });

    return {
      success: true,
      message: isPublished ? "Post published successfully" : "Post unpublished successfully",
    };
  } catch (error) {
    console.error("Error toggling publish status:", error);
    return {
      success: false,
      message: "Failed to update publish status. Please try again.",
    };
  }
}
