import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Trophy,
  GraduationCap,
  ArrowRight,
  Star,
} from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/data/site-config";
import { ContactForm } from "@/components/forms/contact-form";
import { buildPageMetadata } from "@/lib/seo";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { LocalBusinessJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { contactFaqs } from "@/data/faqs";
import { LastUpdated } from "@/components/seo/last-updated";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Archer Infotech — IT Training Institute in Kothrud, Pune",
  description:
    "Get in touch with Archer Infotech for course inquiries, batch schedules, and career counselling. Visit our Kothrud, Pune centre or reach us by phone, WhatsApp, or email.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* LocalBusiness schema on the highest local-intent page — confirms the
          physical Kothrud centre (map is shown here). Merges with the
          canonical Org node by @id. Component existed but was never rendered;
          wired in per audit 2026-06-21. */}
      <LocalBusinessJsonLd />

      {/* Breadcrumb trail — SERP URL-path display. Audit 2026-06-21. */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />

      <PageEvent
        event="contact_page_viewed"
        properties={{ page_type: "contact", page_path: "/contact" }}
      />

      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Archer Infotech — IT Training in Kothrud, Pune
            </h1>
            <LastUpdated iso={EVERGREEN_LAST_REVIEWED} className="mt-3 text-xs md:text-sm text-white/70" />
            <p className="text-lg text-white/80">
              Have questions about our courses? Want to know about batch schedules
              or fees? Get in touch with us and our team will get back to you shortly.
            </p>
          </div>
        </div>
      </section>

      {/* Definitive Answer Paragraph — full NAP (name + address + phone +
          hours) in the first body section so AI engines lift it as the
          canonical contact answer. P8-07. */}
      <DefinitiveAnswer eyebrow="How to Reach Archer Infotech">
        Archer Infotech&apos;s Kothrud training centre is at Flat No. 12,
        Divyadarshan Housing Society, behind Kothrud Bus Stand Road, near
        Natraj Gas Agency, Londhe Wada, Chaitanya Nagar, Kothrud, Pune
        411038. The centre is open Monday to Saturday, 9:00 AM to 8:00 PM.
        Reach the team by phone or WhatsApp at +91 9850 678451, by email at
        info@archerinfotech.in, or by submitting the contact form below for
        a callback. To sit in a live demo class — no payment, no commitment —
        request a slot through any of these channels and the counselling
        team will confirm a date the same week. Archer Infotech also runs a
        second centre in Sangli: Vishwaleela Complex, Office No. G-3, Ground
        Floor, MSEB Road, opposite Walchand College side gate, Vishrambag,
        Sangli 416415, open Monday to Sunday, 8:00 AM to 8:00 PM on the same
        phone number.
      </DefinitiveAnswer>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="relative !overflow-visible border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-background shadow-lg shadow-primary/5">
                <CardHeader>
                  <CardTitle className="inline-block rounded-md bg-primary px-3 py-1.5 text-primary-foreground shadow-sm">
                    Send us a Message / Post Course Enquiry
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative !overflow-visible">
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Our Centres</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold">Pune — Kothrud (head office)</p>
                    <p className="text-muted-foreground">
                      Flat No. 12, Divyadarshan Housing Society, Kothrud, Pune
                      411038 · Mon–Sat, 9 AM–8 PM
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Sangli — Vishrambag (branch)</p>
                    <p className="text-muted-foreground">
                      Vishwaleela Complex, Office No. G-3, MSEB Road, opposite
                      Walchand College side gate, Vishrambag, Sangli 416415 ·
                      Mon–Sun, 8 AM–8 PM
                    </p>
                    <Link
                      href="/it-training-in-pune-for/sangli-miraj"
                      className="text-primary hover:underline"
                    >
                      IT training in Sangli &amp; Miraj &rarr;
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="group flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary">
                      <MapPin className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Address</h4>
                      {/* Semantic <address> + PostalAddress microdata —
                          belt-and-braces backup to the LocalBusiness JSON-LD
                          so crawlers that don't execute JSON-LD still read a
                          machine-parsable NAP. P3-19. */}
                      <address
                        className="text-sm text-muted-foreground not-italic"
                        itemScope
                        itemType="https://schema.org/PostalAddress"
                      >
                        <span itemProp="streetAddress">
                          {siteConfig.contact.address.line1},{" "}
                          {siteConfig.contact.address.line2}
                        </span>
                        <br />
                        <span itemProp="addressLocality">
                          {siteConfig.contact.address.city}
                        </span>
                        ,{" "}
                        <span itemProp="addressRegion">
                          {siteConfig.contact.address.state}
                        </span>{" "}
                        -{" "}
                        <span itemProp="postalCode">
                          {siteConfig.contact.address.pincode}
                        </span>
                        <meta itemProp="addressCountry" content="IN" />
                      </address>
                    </div>
                  </div>

                  <div className="group flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary">
                      <Phone className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <TrackedAnchor
                        href={`tel:${siteConfig.contact.phone}`}
                        className="text-sm text-muted-foreground hover:text-primary"
                        event="contact_method_clicked"
                        properties={{ method: "phone", location: "contact_page" }}
                      >
                        {siteConfig.contact.phone}
                      </TrackedAnchor>
                    </div>
                  </div>

                  <div className="group flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary">
                      <Mail className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <TrackedAnchor
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-sm text-muted-foreground hover:text-primary"
                        event="contact_method_clicked"
                        properties={{ method: "email", location: "contact_page" }}
                      >
                        {siteConfig.contact.email}
                      </TrackedAnchor>
                    </div>
                  </div>

                  <div className="group flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary">
                      <Clock className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Working Hours</h4>
                      <p className="text-sm text-muted-foreground">
                        Monday - Saturday
                        <br />
                        9:00 AM - 8:00 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#25D366] text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageCircle className="h-6 w-6" />
                    <h3 className="font-semibold text-lg">Chat on WhatsApp</h3>
                  </div>
                  <p className="text-white/90 text-sm mb-4">
                    Get quick responses to your queries via WhatsApp.
                  </p>
                  <TrackedAnchor
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace("+", "")}?text=Hi,%20I'm%20interested%20in%20your%20IT%20training%20courses.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-white text-[#25D366] py-2 rounded-lg font-medium hover:bg-white/90 transition-colors"
                    event="whatsapp_clicked"
                    properties={{ location: "contact_page_card", source: "contact_page" }}
                  >
                    Start Chat
                  </TrackedAnchor>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Already-a-student routes. The contact form above is for people
          deciding whether to enrol; these three are for people who already did
          and have something to tell us. All were previously hard to reach —
          /alumni was linked from nowhere, placements could only be entered by
          an admin, and /review (the short URL that forwards to the Google
          review box) existed only on QR cards and posters, with no route to it
          from the site at all. */}
      <section className="relative overflow-hidden gradient-hero py-12 text-white">
        {/* Same treatment as the home-page CTA (components/home/cta-section):
            the gradient plus this 10%-opacity cross pattern. Kept as markup
            rather than extracted into a shared component because the two
            sections lay their content out differently — only the backdrop is
            shared. */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-2 text-center text-2xl font-bold">
              Already studied with us?
            </h2>
            <p className="mb-8 text-center text-white/80">
              Three quick things — none of them need a login.
            </p>
            <div className="grid gap-5 md:grid-cols-3">
              <Link
                href="/placements/submit"
                className="group rounded-xl border border-white/20 bg-white/5 p-6 transition-all hover:border-secondary hover:bg-white/10 hover:shadow-md"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/20 text-secondary">
                  <Trophy className="h-5 w-5" />
                </div>
                <h3 className="mb-1 font-semibold text-white group-hover:text-secondary">
                  Recently placed? Tell us about it
                </h3>
                <p className="text-sm text-white/70">
                  Share your offer and attach the letter. We verify every
                  placement before it appears anywhere.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-secondary">
                  Submit your placement
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="/alumni"
                className="group rounded-xl border border-white/20 bg-white/5 p-6 transition-all hover:border-white hover:bg-white/10 hover:shadow-md"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-white/15 text-white">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="mb-1 font-semibold text-white group-hover:text-white">
                  Archer alumnus? Share where you are now
                </h3>
                <p className="text-sm text-white/70">
                  Update your role and company — and tell us if your team is
                  hiring, so we can refer current students.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white">
                  Update your details
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              {/* /review is an internal short URL that server-redirects to the
                  Google review box, so the href stays relative — the
                  destination lives in siteConfig and must not be duplicated
                  here. Tracked because review velocity is a metric we act on,
                  and opened in a new tab so a visitor mid-enquiry is not
                  handed off to Google and lost. */}
              <TrackedLink
                href="/review"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/20 bg-white/5 p-6 transition-all hover:border-secondary hover:bg-white/10 hover:shadow-md"
                event="review_cta_clicked"
                properties={{ location: "contact_alumni_box" }}
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/20 text-secondary">
                  <Star className="h-5 w-5" />
                </div>
                <h3 className="mb-1 font-semibold text-white group-hover:text-secondary">
                  Learned something here? Leave a review
                </h3>
                <p className="text-sm text-white/70">
                  Ninety seconds on Google. It is the most useful thing an
                  alumnus can do for the students deciding right now.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-secondary">
                  Write a Google review
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Find Us</h2>
          <div className="aspect-video rounded-xl overflow-hidden border">
            <iframe
              src={siteConfig.googleMaps.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Archer Infotech Location"
            />
          </div>
        </div>
      </section>

      {/* FAQ block + FAQPage JSON-LD — local intent / GBP-style queries
          (address, hours, parking, demo booking, walk-in policy). P8-08. */}
      <FaqSection
        heading="Contact &amp; Visit FAQs"
        intro="Address, working hours, parking, demo class booking, and how to reach the Archer Infotech Kothrud centre."
        items={contactFaqs}
      />
    </>
  );
}
