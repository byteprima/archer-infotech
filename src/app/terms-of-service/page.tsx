import { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Archer Infotech. Read our terms and conditions for using our training services.",
};

function getCurrentDate() {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" };
  return date.toLocaleDateString("en-IN", options);
}

export default function TermsOfServicePage() {
  const lastUpdated = getCurrentDate();

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
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
              Welcome to {siteConfig.name}. By accessing our website or enrolling in our courses,
              you agree to be bound by these Terms of Service. Please read them carefully before
              using our services.
            </p>

            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-6">
              By accessing or using the services provided by {siteConfig.name}, you acknowledge
              that you have read, understood, and agree to be bound by these Terms of Service. If
              you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-bold mb-4">2. Services Description</h2>
            <p className="text-muted-foreground mb-4">
              {siteConfig.name} provides IT training and educational services, including but not
              limited to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Classroom and online training programs</li>
              <li>Course materials and resources</li>
              <li>Placement assistance services</li>
              <li>Corporate training solutions</li>
              <li>Internship programs</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">3. Enrollment and Fees</h2>
            <h3 className="text-lg font-semibold mb-2">3.1 Registration</h3>
            <p className="text-muted-foreground mb-4">
              To enroll in our courses, you must provide accurate and complete information during
              the registration process. You are responsible for maintaining the confidentiality
              of your account credentials.
            </p>
            <h3 className="text-lg font-semibold mb-2">3.2 Course Fees</h3>
            <p className="text-muted-foreground mb-4">
              Course fees are as quoted at the time of enrollment. Fees must be paid according to
              the payment schedule agreed upon during registration. We offer various payment
              options including EMI plans.
            </p>
            <h3 className="text-lg font-semibold mb-2">3.3 Refund Policy</h3>
            <p className="text-muted-foreground mb-6">
              Refund requests must be made within 7 days of enrollment and before attending more
              than 2 sessions. Refunds are subject to a processing fee of 10% of the course fee.
              No refunds will be provided after this period.
            </p>

            <h2 className="text-2xl font-bold mb-4">4. Student Responsibilities</h2>
            <p className="text-muted-foreground mb-4">As a student, you agree to:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Attend classes regularly and punctually</li>
              <li>Complete assignments and projects on time</li>
              <li>Maintain professional conduct during training sessions</li>
              <li>Not share course materials with unauthorized persons</li>
              <li>Respect intellectual property rights of course content</li>
              <li>Not engage in any form of cheating or academic dishonesty</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground mb-6">
              All course materials, including but not limited to presentations, videos, code
              samples, and documentation, are the intellectual property of {siteConfig.name}.
              You are granted a limited, non-transferable license to use these materials for
              personal educational purposes only. Reproduction, distribution, or commercial use
              of these materials is strictly prohibited.
            </p>

            <h2 className="text-2xl font-bold mb-4">6. Placement Assistance</h2>
            <p className="text-muted-foreground mb-6">
              {siteConfig.name} provides placement assistance to eligible students. However, we
              do not guarantee job placement. Placement assistance includes resume preparation,
              interview coaching, and connecting students with potential employers. Final
              selection depends on the student&apos;s performance and the employer&apos;s hiring
              criteria.
            </p>

            <h2 className="text-2xl font-bold mb-4">7. Code of Conduct</h2>
            <p className="text-muted-foreground mb-4">
              Students and users are expected to maintain professional behavior. The following
              are prohibited:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Harassment or discrimination of any kind</li>
              <li>Disruptive behavior during classes</li>
              <li>Unauthorized recording of sessions</li>
              <li>Sharing login credentials with others</li>
              <li>Any illegal activities</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-6">
              {siteConfig.name} shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of our services. Our
              total liability shall not exceed the amount paid by you for the specific course
              or service in question.
            </p>

            <h2 className="text-2xl font-bold mb-4">9. Disclaimer</h2>
            <p className="text-muted-foreground mb-6">
              While we strive to provide accurate and up-to-date information, {siteConfig.name}
              makes no warranties regarding the completeness, reliability, or accuracy of course
              content. Technology and industry practices evolve rapidly, and some information
              may become outdated.
            </p>

            <h2 className="text-2xl font-bold mb-4">10. Modifications to Terms</h2>
            <p className="text-muted-foreground mb-6">
              We reserve the right to modify these Terms of Service at any time. Changes will be
              effective immediately upon posting on our website. Your continued use of our
              services after any changes constitutes acceptance of the modified terms.
            </p>

            <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
            <p className="text-muted-foreground mb-6">
              These Terms of Service shall be governed by and construed in accordance with the
              laws of India. Any disputes arising from these terms shall be subject to the
              exclusive jurisdiction of the courts in Pune, Maharashtra.
            </p>

            <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              For any questions regarding these Terms of Service, please contact us:
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
