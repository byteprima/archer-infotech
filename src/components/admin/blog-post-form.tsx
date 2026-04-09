"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Save, Eye, EyeOff } from "lucide-react";
import { TiptapEditor } from "@/components/admin/tiptap-editor";
import {
  createPost,
  updatePost,
  type BlogPostFormData,
} from "@/lib/actions/blog";
import { generateSlug } from "@/lib/utils/slug";
import type { BlogPost } from "@/db/schema";

interface BlogPostFormProps {
  post?: BlogPost | null;
  onSuccess?: () => void;
}

export function BlogPostForm({ post, onSuccess }: BlogPostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState<BlogPostFormData>({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    featuredImage: post?.featuredImage || "",
    category: post?.category || "",
    tags: post?.tags || "",
    metaTitle: post?.metaTitle || "",
    metaDescription: post?.metaDescription || "",
    author: post?.author || "Archer Infotech",
    isPublished: post?.isPublished || false,
  });

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      // Only auto-generate slug if it's empty or matches the old title's slug
      slug: !prev.slug || prev.slug === generateSlug(prev.title)
        ? generateSlug(value)
        : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});

    try {
      const result = post
        ? await updatePost(post.id, formData)
        : await createPost(formData);

      if (result.success) {
        onSuccess?.();
        router.push("/admin/blog");
        router.refresh();
      } else {
        setError(result.message);
        if (result.errors) {
          setFieldErrors(result.errors);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditing = !!post;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>
                The main content of your blog post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter post title"
                  className={fieldErrors.title ? "border-red-500" : ""}
                />
                {fieldErrors.title && (
                  <p className="text-sm text-red-500">{fieldErrors.title[0]}</p>
                )}
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor="slug">
                  URL Slug <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">/blog/</span>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                      }))
                    }
                    placeholder="post-url-slug"
                    className={fieldErrors.slug ? "border-red-500" : ""}
                  />
                </div>
                {fieldErrors.slug && (
                  <p className="text-sm text-red-500">{fieldErrors.slug[0]}</p>
                )}
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  placeholder="Brief summary of the post (displayed in listings)"
                  rows={3}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label>
                  Content <span className="text-red-500">*</span>
                </Label>
                <TiptapEditor
                  content={formData.content}
                  onChange={(html) =>
                    setFormData((prev) => ({ ...prev, content: html }))
                  }
                  placeholder="Write your blog post content here..."
                  error={!!fieldErrors.content}
                />
                {fieldErrors.content && (
                  <p className="text-sm text-red-500">{fieldErrors.content[0]}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isPublished">Status</Label>
                  <p className="text-sm text-muted-foreground">
                    {formData.isPublished ? "Published" : "Draft"}
                  </p>
                </div>
                <Switch
                  id="isPublished"
                  checked={formData.isPublished}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isPublished: checked }))
                  }
                />
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {isEditing ? "Update Post" : "Save Post"}
                    </>
                  )}
                </Button>
                {formData.isPublished && formData.slug && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.open(`/blog/${formData.slug}`, "_blank")}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Category & Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, category: e.target.value }))
                  }
                  placeholder="e.g., Technology, Career Tips"
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, tags: e.target.value }))
                  }
                  placeholder="java, python, aws (comma-separated)"
                />
                <p className="text-xs text-muted-foreground">
                  Separate tags with commas
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="featuredImage">Image URL</Label>
                <Input
                  id="featuredImage"
                  value={formData.featuredImage}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, featuredImage: e.target.value }))
                  }
                  placeholder="https://example.com/image.jpg"
                  className={fieldErrors.featuredImage ? "border-red-500" : ""}
                />
                {fieldErrors.featuredImage && (
                  <p className="text-sm text-red-500">{fieldErrors.featuredImage[0]}</p>
                )}
                {formData.featuredImage && (
                  <div className="mt-2">
                    <img
                      src={formData.featuredImage}
                      alt="Featured preview"
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Customize how this post appears in search results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Meta Title */}
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, metaTitle: e.target.value }))
                  }
                  placeholder="Custom title for search engines"
                />
                <p className="text-xs text-muted-foreground">
                  {(formData.metaTitle || formData.title).length}/60 characters
                </p>
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      metaDescription: e.target.value,
                    }))
                  }
                  placeholder="Brief description for search results"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {(formData.metaDescription || formData.excerpt || "").length}/160 characters
                </p>
              </div>

              {/* Author */}
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, author: e.target.value }))
                  }
                  placeholder="Author name"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
