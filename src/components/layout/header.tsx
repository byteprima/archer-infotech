"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
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

const mainNavItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses", hasDropdown: true },
  { name: "Placements", href: "/placements" },
  { name: "Internships", href: "/internships" },
  { name: "Corporate Training", href: "/corporate-training" },
  { name: "Batch Schedule", href: "/batch-schedule" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const featuredCourses = getFeaturedCourses().slice(0, 4);

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
              >
                <Phone className="h-4 w-4" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-secondary transition-colors"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span>Best IT Training Institute in Pune</span>
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
              src="/images/logo.png"
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
                          pathname.startsWith("/courses") && "text-primary font-medium"
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
                            <ul className="space-y-2">
                              {categories.map((category) => (
                                <li key={category.slug}>
                                  <Link
                                    href={`/courses/${category.slug}`}
                                    className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    {category.name}
                                  </Link>
                                </li>
                              ))}
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
                          pathname === item.href && "text-primary font-semibold"
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
              className={cn(
                buttonVariants(),
                "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              )}
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
                    src="/images/logo.png"
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
