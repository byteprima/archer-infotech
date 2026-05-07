import Link from "next/link";
import Image from "next/image";
import { LinkedinIcon } from "@/components/common/social-icons";
import type { TeamMember } from "@/data/team";

interface TrainerBylineProps {
  trainer: TeamMember;
  /**
   * Visual variant. "header" runs inline with the post title (compact);
   * "footer" is the larger card rendered at the bottom of the post.
   */
  variant: "header" | "footer";
}

/**
 * Visible trainer byline on blog posts. Pillar 5 P5-12.
 *
 * Pairs with the BlogPosting Person schema emitted from the same data —
 * the byline is what humans see ("Yogesh Patil, Founder & Director,
 * 15+ years"); the schema is what AI engines and Google parse. Both
 * point at the same canonical /trainers/{slug} profile so search engines
 * can match the article to a verifiable named expert.
 */
export function TrainerByline({ trainer, variant }: TrainerBylineProps) {
  if (variant === "header") {
    return (
      <Link
        href={`/trainers/${trainer.id}`}
        className="group inline-flex items-center gap-2.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm hover:bg-white/15 transition-colors"
      >
        {trainer.image ? (
          <span className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-white/30 shrink-0">
            <Image
              src={trainer.image}
              alt={`${trainer.name}, ${trainer.role} at Archer Infotech`}
              fill
              sizes="28px"
              className="object-cover"
            />
          </span>
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white shrink-0">
            {trainer.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
        )}
        <span className="text-sm font-medium text-white group-hover:underline">
          {trainer.name}
        </span>
      </Link>
    );
  }

  return (
    <aside
      aria-label="About the author"
      className="mt-10 rounded-2xl border border-border bg-card p-5 md:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
        About the author
      </p>
      <div className="flex flex-col sm:flex-row gap-5">
        {trainer.image ? (
          <Link
            href={`/trainers/${trainer.id}`}
            className="block shrink-0 self-start"
          >
            <span className="relative inline-block h-20 w-20 overflow-hidden rounded-full ring-2 ring-primary/15">
              <Image
                src={trainer.image}
                alt={`${trainer.name}, ${trainer.role} at Archer Infotech, Pune`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </span>
          </Link>
        ) : (
          <Link
            href={`/trainers/${trainer.id}`}
            className="flex h-20 w-20 shrink-0 items-center justify-center self-start rounded-full bg-primary/10 text-2xl font-bold text-primary"
          >
            {trainer.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </Link>
        )}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold leading-snug">
            <Link
              href={`/trainers/${trainer.id}`}
              className="hover:text-primary hover:underline"
            >
              {trainer.name}
            </Link>
          </h3>
          <p className="text-sm font-medium text-secondary mt-0.5">
            {trainer.role} · {trainer.experience} experience
          </p>
          {trainer.bio && (
            <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
              {trainer.bio}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <Link
              href={`/trainers/${trainer.id}`}
              className="font-semibold text-primary hover:underline"
            >
              Read full profile →
            </Link>
            {trainer.linkedin && (
              <a
                href={trainer.linkedin}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-[#0077B5] transition-colors"
                title={`${trainer.name} on LinkedIn`}
              >
                <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
