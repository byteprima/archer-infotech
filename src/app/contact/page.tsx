import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/data/site-config";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Archer Infotech for course inquiries, batch schedules, and career counseling. Visit our Pune center or contact us online.",
};

export default function ContactPage() {
  return (
    <>
      <PageEvent
        event="contact_page_viewed"
        properties={{ page_type: "contact", page_path: "/contact" }}
      />

      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-white/80">
              Have questions about our courses? Want to know about batch schedules
              or fees? Get in touch with us and our team will get back to you shortly.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="relative !overflow-visible">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
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
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="group flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary">
                      <MapPin className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Address</h4>
                      <p className="text-sm text-muted-foreground">
                        {siteConfig.contact.address.line1}
                        <br />
                        {siteConfig.contact.address.line2}
                        <br />
                        {siteConfig.contact.address.city},{" "}
                        {siteConfig.contact.address.state} -{" "}
                        {siteConfig.contact.address.pincode}
                      </p>
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
                    href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hi,%20I'm%20interested%20in%20your%20IT%20training%20courses.`}
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
    </>
  );
}
