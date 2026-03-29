import { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Archer Infotech. Learn how we collect, use, and protect your personal information.",
};

function getCurrentDate() {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" };
  return date.toLocaleDateString("en-IN", options);
}

export default function PrivacyPolicyPage() {
  const lastUpdated = getCurrentDate();

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-white/80">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <p className="text-muted-foreground mb-8">
              At {siteConfig.name}, we are committed to protecting your privacy and ensuring the
              security of your personal information. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website or use our
              services.
            </p>

            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">We may collect the following types of information:</p>
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Name and contact information (email address, phone number)</li>
              <li>Educational background and professional experience</li>
              <li>Course preferences and enrollment details</li>
              <li>Payment information (processed securely through payment gateways)</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website addresses</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use the collected information for:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Processing course enrollments and providing training services</li>
              <li>Communicating about courses, schedules, and updates</li>
              <li>Sending promotional materials and newsletters (with your consent)</li>
              <li>Improving our website and services</li>
              <li>Providing placement assistance and connecting you with potential employers</li>
              <li>Responding to inquiries and providing customer support</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may
              share your information with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Partner companies for placement assistance (with your consent)</li>
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground mb-6">
              We implement appropriate security measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. However, no
              method of transmission over the Internet is 100% secure, and we cannot guarantee
              absolute security.
            </p>

            <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
            <p className="text-muted-foreground mb-6">
              Our website may use cookies and similar tracking technologies to enhance your
              browsing experience. You can choose to disable cookies through your browser
              settings, but this may affect some features of our website.
            </p>

            <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate or incomplete information</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">7. Third-Party Links</h2>
            <p className="text-muted-foreground mb-6">
              Our website may contain links to third-party websites. We are not responsible for
              the privacy practices of these external sites. We encourage you to review their
              privacy policies before providing any personal information.
            </p>

            <h2 className="text-2xl font-bold mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground mb-6">
              Our services are not directed to individuals under 16 years of age. We do not
              knowingly collect personal information from children. If you believe we have
              collected information from a child, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
            <p className="text-muted-foreground mb-6">
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page with an updated revision date. We encourage you to review this policy
              periodically.
            </p>

            <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or our data practices, please
              contact us:
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <p className="font-semibold mb-2">{siteConfig.name}</p>
              <p className="text-muted-foreground">
                {siteConfig.contact.address.line1}
                <br />
                {siteConfig.contact.address.line2}
                <br />
                {siteConfig.contact.address.city}, {siteConfig.contact.address.state} -{" "}
                {siteConfig.contact.address.pincode}
              </p>
              <p className="text-muted-foreground mt-2">
                Email:{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-primary hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="text-muted-foreground">
                Phone:{" "}
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-primary hover:underline"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
