"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  Phone,
  Code,
  Layers,
  Globe,
  Cloud,
  Award,
  Brain,
  Wand2,
  Smartphone,
  Database,
  Rocket,
  LucideIcon,
} from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/common/social-icons";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { categories, getFeaturedCourses } from "@/data/courses";
import { siteConfig } from "@/data/site-config";
import { captureAnalyticsEvent } from "@/lib/posthog/client";

const mainNavItems = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Courses", href: "/courses", hasDropdown: true },
  { name: "Placements", href: "/placements" },
  { name: "Internships", href: "/internships" },
  { name: "Corporate Training", href: "/corporate-training" },
  { name: "Batch Schedule", href: "/batch-schedule" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const categoryIcons: Record<string, LucideIcon> = {
  Code,
  Layers,
  Globe,
  Cloud,
  Award,
  Brain,
  Wand2,
  Smartphone,
  Database,
  Rocket,
};

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const featuredCourses = getFeaturedCourses().slice(0, 5);
  const trackContactClick = (method: "phone" | "email", location: string) => {
    captureAnalyticsEvent("contact_method_clicked", {
      method,
      location,
    });
  };
  const trackSocialClick = (network: string, location: string) => {
    captureAnalyticsEvent("social_link_clicked", {
      network,
      location,
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="hidden md:block bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2 hover:text-secondary transition-colors"
                onClick={() => trackContactClick("phone", "header_top_bar")}
              >
                <Phone className="h-4 w-4" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-secondary transition-colors"
                onClick={() => trackContactClick("email", "header_top_bar")}
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Facebook"
                onClick={() => trackSocialClick("facebook", "header_top_bar")}
              >
                <FacebookIcon />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Instagram"
                onClick={() => trackSocialClick("instagram", "header_top_bar")}
              >
                <InstagramIcon />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="LinkedIn"
                onClick={() => trackSocialClick("linkedin", "header_top_bar")}
              >
                <LinkedinIcon />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Twitter"
                onClick={() => trackSocialClick("twitter", "header_top_bar")}
              >
                <TwitterIcon />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="YouTube"
                onClick={() => trackSocialClick("youtube", "header_top_bar")}
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.svg"
              alt="Archer Infotech"
              width={44}
              height={44}
              className="h-11 w-auto"
              priority
            />
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">Archer</span>
              <span className="text-xl font-bold text-secondary">Infotech</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {mainNavItems.map((item) =>
                  item.hasDropdown ? (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuTrigger
                        className={cn(
                          "bg-transparent",
                          pathname.startsWith("/courses") && "bg-primary/10 text-primary font-semibold"
                        )}
                      >
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[600px] gap-3 p-4 lg:w-[700px] lg:grid-cols-2">
                          <div>
                            <h4 className="mb-3 text-sm font-semibold text-primary">
                              Course Categories
                            </h4>
                            <ul className="space-y-1">
                              {categories.map((category) => {
                                const IconComponent = categoryIcons[category.icon];
                                return (
                                  <li key={category.slug}>
                                    <Link
                                      href={`/courses?category=${category.slug}`}
                                      className="flex items-center gap-2 select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    >
                                      {IconComponent && <IconComponent className="h-4 w-4 text-primary" />}
                                      {category.name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div>
                            <h4 className="mb-3 text-sm font-semibold text-primary">
                              Popular Courses
                            </h4>
                            <ul className="space-y-2">
                              {featuredCourses.map((course) => (
                                <li key={course.slug}>
                                  <Link
                                    href={`/courses/${course.categorySlug}/${course.slug}`}
                                    className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="font-medium">{course.shortTitle}</div>
                                    <p className="text-xs text-muted-foreground">
                                      {course.duration}
                                    </p>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 pt-2 border-t">
                              <Link
                                href="/courses"
                                className="text-sm font-medium text-primary hover:text-secondary"
                              >
                                View All Courses →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                          pathname === item.href && "bg-primary/10 text-primary font-semibold"
                        )}
                      >
                        {item.name}
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-2.5 text-sm font-semibold transition-all"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger className="lg:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-6">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Image
                    src="/images/logo.svg"
                    alt="Archer Infotech"
                    width={36}
                    height={36}
                    className="h-9 w-auto"
                  />
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-primary">Archer</span>
                    <span className="text-lg font-bold text-secondary">Infotech</span>
                  </div>
                </Link>
                <nav className="flex flex-col gap-4">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      buttonVariants(),
                      "w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    )}
                  >
                    Enquire Now
                  </Link>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-center justify-center gap-2 text-primary font-medium"
                  >
                    <Phone className="h-4 w-4" />
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
