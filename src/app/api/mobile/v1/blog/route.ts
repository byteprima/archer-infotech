import { NextRequest } from "next/server";
import { and, desc, eq, like, or, type SQL } from "drizzle-orm";

import { db, blogPosts } from "@/db";
import { ApiError, handle, json, readJson, requireMobile } from "@/lib/mobile-api/guard";

export const runtime = "nodejs";

const str = (v: unknown) => (v === null || v === undefined ? null : String(v));

export async function GET(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    const published = searchParams.get("published");

    const conds: SQL[] = [];
    if (q) {
      const term = `%${q}%`;
      const search = or(
        like(blogPosts.title, term),
        like(blogPosts.slug, term),
        like(blogPosts.category, term),
      );
      if (search) conds.push(search);
    }
    if (published === "true" || published === "false") {
      conds.push(eq(blogPosts.isPublished, published === "true"));
    }

    const rows = await db
      .select()
      .from(blogPosts)
      .where(conds.length ? and(...conds) : undefined)
      .orderBy(desc(blogPosts.createdAt));
    return json(rows);
  });
}

export async function POST(req: NextRequest) {
  return handle(async () => {
    requireMobile(req);
    const body = await readJson(req);
    const title = String(body.title || "").trim();
    const slug = String(body.slug || "").trim();
    const content = String(body.content || "").trim();
    if (!title) throw new ApiError(422, "Title is required");
    if (!slug) throw new ApiError(422, "Slug is required");
    if (!content) throw new ApiError(422, "Content is required");

    const isPublished = body.isPublished !== undefined ? Boolean(body.isPublished) : false;
    let publishedAt = body.publishedAt ? new Date(String(body.publishedAt)) : null;
    if (isPublished && !publishedAt) publishedAt = new Date();

    const inserted = await db
      .insert(blogPosts)
      .values({
        title,
        slug,
        excerpt: str(body.excerpt),
        content,
        featuredImage: str(body.featuredImage),
        category: str(body.category),
        tags: str(body.tags),
        metaTitle: str(body.metaTitle),
        metaDescription: str(body.metaDescription),
        author: body.author !== undefined ? String(body.author) : "Archer Infotech",
        isPublished,
        publishedAt,
      })
      .returning();
    return json(inserted[0], 201);
  });
}
