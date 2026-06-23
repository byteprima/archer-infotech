import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db, blogPosts, type NewBlogPost } from "@/db";
import { ApiError, handle, json, readJson, requireMobile } from "@/lib/mobile-api/guard";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

async function getId(ctx: Ctx): Promise<number> {
  const { id } = await ctx.params;
  const num = Number.parseInt(id, 10);
  if (Number.isNaN(num)) throw new ApiError(400, "Invalid id");
  return num;
}

export async function GET(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const id = await getId(ctx);
    const row = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    if (!row[0]) throw new ApiError(404, "Blog post not found");
    return json(row[0]);
  });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const id = await getId(ctx);
    const body = await readJson(req);

    const existing = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    if (!existing[0]) throw new ApiError(404, "Blog post not found");

    const patch: Partial<NewBlogPost> = { updatedAt: new Date() };
    const str = (v: unknown) => (v === null || v === undefined ? null : String(v));
    if ("title" in body) patch.title = String(body.title);
    if ("slug" in body) patch.slug = String(body.slug);
    if ("excerpt" in body) patch.excerpt = str(body.excerpt);
    if ("content" in body) patch.content = String(body.content);
    if ("featuredImage" in body) patch.featuredImage = str(body.featuredImage);
    if ("category" in body) patch.category = str(body.category);
    if ("tags" in body) patch.tags = str(body.tags);
    if ("metaTitle" in body) patch.metaTitle = str(body.metaTitle);
    if ("metaDescription" in body) patch.metaDescription = str(body.metaDescription);
    if ("author" in body) patch.author = String(body.author);
    if ("isPublished" in body) patch.isPublished = Boolean(body.isPublished);
    if ("publishedAt" in body) {
      patch.publishedAt = body.publishedAt ? new Date(String(body.publishedAt)) : null;
    }

    // Publishing now sets publishedAt if it is absent (not provided in this
    // patch and not already set on the existing row).
    if (patch.isPublished === true && !patch.publishedAt && !existing[0].publishedAt) {
      patch.publishedAt = new Date();
    }

    await db.update(blogPosts).set(patch).where(eq(blogPosts.id, id));
    const updated = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    return json(updated[0]);
  });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  return handle(async () => {
    requireMobile(req);
    const id = await getId(ctx);
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return new Response(null, { status: 204 });
  });
}
