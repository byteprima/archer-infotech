#!/usr/bin/env python3
"""
Insert or update a blog post in the site's SQLite database.

Blog posts are not stored in this repo — they live in the `blog_posts` table of
the production SQLite DB on the VPS. Publishing a post therefore means running
this script against that DB, not committing a file. Only the post's images live
in the repo, under `public/images/blog/`.

Content is authored as markdown. `BlogPostContent` detects markdown vs. the HTML
that the admin TipTap editor produces, so plain markdown is rendered correctly.

Usage
-----
    # dry run — prints what would change, touches nothing
    python3 insert-blog-post.py --meta post.json --content post.md --db /path/sqlite.db --dry-run

    # insert (or update an existing row with the same slug)
    python3 insert-blog-post.py --meta post.json --content post.md --db /path/sqlite.db

Metadata JSON keys: title, slug, excerpt, category, tags, metaTitle,
metaDescription, featuredImage, author (optional, defaults to "Archer Infotech"),
isPublished (optional bool, defaults true), publishedAt (optional ISO-8601
string, defaults to now).

Timestamp columns are Unix **milliseconds** — the schema declares
`mode: "timestamp_ms"` for blog posts. Writing seconds here renders year-58239
dates on the live site.

A timestamped backup of the DB is taken before any write.
"""

import argparse
import json
import os
import shutil
import sqlite3
import sys
import time
from datetime import datetime, timezone

DEFAULT_AUTHOR = "Archer Infotech"

# Columns the script writes. Anything else in the metadata file is rejected, so
# a typo'd key fails loudly instead of being silently dropped.
FIELDS = {
    "title": "title",
    "slug": "slug",
    "excerpt": "excerpt",
    "category": "category",
    "tags": "tags",
    "metaTitle": "meta_title",
    "metaDescription": "meta_description",
    "featuredImage": "featured_image",
    "author": "author",
}
REQUIRED = ("title", "slug", "excerpt", "category", "metaTitle", "metaDescription")
OPTIONAL_META = ("isPublished", "publishedAt")


def parse_args():
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--meta", required=True, help="path to the metadata JSON file")
    p.add_argument("--content", required=True, help="path to the markdown body")
    p.add_argument("--db", required=True, help="path to sqlite.db")
    p.add_argument("--dry-run", action="store_true", help="report only, write nothing")
    p.add_argument("--no-backup", action="store_true",
                   help="skip the pre-write DB backup (not recommended)")
    return p.parse_args()


def load_meta(path):
    with open(path, encoding="utf-8") as fh:
        meta = json.load(fh)

    unknown = set(meta) - set(FIELDS) - set(OPTIONAL_META)
    if unknown:
        sys.exit(f"error: unknown metadata key(s): {', '.join(sorted(unknown))}")

    missing = [k for k in REQUIRED if not meta.get(k)]
    if missing:
        sys.exit(f"error: missing required metadata: {', '.join(missing)}")

    # Google truncates well before these; keep the warnings advisory, not fatal.
    if len(meta["metaTitle"]) > 60:
        print(f"warning: metaTitle is {len(meta['metaTitle'])} chars (>60)")
    if len(meta["metaDescription"]) > 160:
        print(f"warning: metaDescription is {len(meta['metaDescription'])} chars (>160)")

    return meta


def published_at_ms(meta):
    raw = meta.get("publishedAt")
    if not raw:
        return int(time.time() * 1000)
    dt = datetime.fromisoformat(raw)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return int(dt.timestamp() * 1000)


def backup(db_path, slug):
    dest = f"{db_path}.bak-pre-{slug}-{int(time.time())}"
    shutil.copy2(db_path, dest)
    print(f"backup: {dest}")


def main():
    args = parse_args()

    if not os.path.exists(args.db):
        sys.exit(f"error: no database at {args.db}")

    meta = load_meta(args.meta)
    with open(args.content, encoding="utf-8") as fh:
        content = fh.read().strip()
    if not content:
        sys.exit("error: content file is empty")

    now_ms = int(time.time() * 1000)
    values = {col: meta.get(key) for key, col in FIELDS.items()}
    values["author"] = meta.get("author") or DEFAULT_AUTHOR
    values["content"] = content
    values["is_published"] = 1 if meta.get("isPublished", True) else 0
    values["published_at"] = published_at_ms(meta)
    values["updated_at"] = now_ms

    conn = sqlite3.connect(args.db)
    conn.row_factory = sqlite3.Row
    existing = conn.execute(
        "SELECT id FROM blog_posts WHERE slug = ?", (meta["slug"],)
    ).fetchone()

    action = "UPDATE" if existing else "INSERT"
    words = len(content.split())
    print(f"{action}: {meta['slug']}")
    print(f"  title      {meta['title']}")
    print(f"  category   {meta['category']}   author: {values['author']}")
    print(f"  image      {values['featured_image']}")
    print(f"  content    {len(content):,} chars / ~{words:,} words")
    print(f"  published  {values['is_published']} at "
          f"{datetime.fromtimestamp(values['published_at'] / 1000, timezone.utc):%Y-%m-%d %H:%M UTC}")

    if args.dry_run:
        print("dry run — nothing written")
        conn.close()
        return

    if not args.no_backup:
        conn.close()
        backup(args.db, meta["slug"])
        conn = sqlite3.connect(args.db)
        conn.row_factory = sqlite3.Row

    if existing:
        cols = [c for c in values if c != "slug"]
        conn.execute(
            f"UPDATE blog_posts SET {', '.join(f'{c} = ?' for c in cols)} WHERE slug = ?",
            [values[c] for c in cols] + [meta["slug"]],
        )
        post_id = existing["id"]
    else:
        values["created_at"] = now_ms
        cols = list(values)
        conn.execute(
            f"INSERT INTO blog_posts ({', '.join(cols)}) "
            f"VALUES ({', '.join('?' for _ in cols)})",
            [values[c] for c in cols],
        )
        post_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]

    conn.commit()

    row = conn.execute(
        "SELECT id, slug, is_published, length(content) AS n, "
        "datetime(published_at / 1000, 'unixepoch') AS pub "
        "FROM blog_posts WHERE id = ?", (post_id,)
    ).fetchone()
    conn.close()

    print(f"ok: id={row['id']} slug={row['slug']} published={row['is_published']} "
          f"chars={row['n']:,} at={row['pub']} UTC")
    print(f"    https://archerinfotech.in/blog/{row['slug']}")


if __name__ == "__main__":
    main()
