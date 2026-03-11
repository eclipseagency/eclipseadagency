import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Privacy Policy - Eclipse Agency",
  description:
    "Privacy Policy for Eclipse Agency. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy - Eclipse Agency",
    description:
      "Privacy Policy for Eclipse Agency. Learn how we collect, use, and protect your personal information.",
    url: "https://www.eclipseagency.net/privacy",
    siteName: "Eclipse Agency",
    type: "website",
  },
};

const LAST_UPDATED = "March 11, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        badge="Legal"
        title="Privacy Policy"
        subtitle="Your privacy matters to us. This policy explains how Eclipse Agency collects, uses, and safeguards your information."
      />

      {/* ── Introduction ── */}
      <SectionWrapper dark>
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-sm text-text-secondary">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            Eclipse Agency (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
            operates the website{" "}
            <a
              href="https://www.eclipseagency.net"
              className="text-white underline underline-offset-2"
            >
              www.eclipseagency.net
            </a>{" "}
            (the &quot;Site&quot;). This Privacy Policy describes how we
            collect, use, and disclose information when you visit or interact
            with our Site. By using our Site, you agree to the practices
            described in this policy.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Information We Collect ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            1. Information We Collect
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>
              <strong className="text-white">
                Information you provide directly:
              </strong>{" "}
              When you fill out a contact form, request a quote, or send us an
              email, we may collect your name, email address, phone number,
              company name, and any other details you choose to share.
            </p>
            <p>
              <strong className="text-white">
                Information collected automatically:
              </strong>{" "}
              When you visit our Site, we automatically collect certain technical
              data, including your IP address, browser type, operating system,
              referring URLs, pages viewed, and the date and time of your visit.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── How We Use Your Information ── */}
      <SectionWrapper dark>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc space-y-3 pl-6 text-base leading-relaxed text-text-secondary md:text-lg">
            <li>To respond to your inquiries and provide requested services</li>
            <li>To improve and optimize our Site and user experience</li>
            <li>
              To analyze usage trends and measure the effectiveness of our
              content
            </li>
            <li>
              To send occasional communications about our services (only with
              your consent)
            </li>
            <li>To comply with legal obligations and protect our rights</li>
          </ul>
        </div>
      </SectionWrapper>

      {/* ── Cookies & Tracking ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            3. Cookies &amp; Tracking Technologies
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>
              Our Site uses cookies and similar tracking technologies to enhance
              your browsing experience and gather analytics data. You can control
              cookie preferences through your browser settings.
            </p>
            <p>
              We use{" "}
              <strong className="text-white">essential cookies</strong> that are
              necessary for the Site to function correctly, and{" "}
              <strong className="text-white">analytics cookies</strong> to
              understand how visitors interact with our Site.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Third-Party Services ── */}
      <SectionWrapper dark>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            4. Third-Party Services
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>We use the following third-party services on our Site:</p>
            <ul className="list-disc space-y-3 pl-6">
              <li>
                <strong className="text-white">Vercel Analytics:</strong> We use
                Vercel Analytics to collect anonymized usage data about Site
                performance and visitor behavior. Vercel Analytics does not use
                cookies and does not collect personally identifiable information.
                See{" "}
                <a
                  href="https://vercel.com/docs/analytics/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-2"
                >
                  Vercel&apos;s privacy policy
                </a>
                .
              </li>
              <li>
                <strong className="text-white">Vimeo:</strong> We embed video
                content hosted on Vimeo. When you view an embedded video, Vimeo
                may collect data in accordance with their own{" "}
                <a
                  href="https://vimeo.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-2"
                >
                  privacy policy
                </a>
                .
              </li>
              <li>
                <strong className="text-white">Vercel Hosting:</strong> Our Site
                is hosted on Vercel&apos;s infrastructure. Vercel may process
                server logs containing IP addresses and request metadata.
              </li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Data Retention ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            5. Data Retention
          </h2>
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            We retain personal information only for as long as necessary to
            fulfill the purposes described in this policy, unless a longer
            retention period is required or permitted by law. Contact form
            submissions are retained for up to 24 months after our last
            interaction with you.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Data Security ── */}
      <SectionWrapper dark>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            6. Data Security
          </h2>
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            We implement reasonable technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. Our Site is served over
            HTTPS, and we regularly review our security practices. However, no
            method of transmission over the Internet is 100% secure, and we
            cannot guarantee absolute security.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Your Rights ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            7. Your Rights
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc space-y-3 pl-6">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the
              details below.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Changes to This Policy ── */}
      <SectionWrapper dark>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            8. Changes to This Policy
          </h2>
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated &quot;Last
            updated&quot; date. We encourage you to review this page
            periodically.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Contact ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            9. Contact Us
          </h2>
          <div className="space-y-2 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <p>
              <strong className="text-white">Eclipse Agency</strong>
              <br />
              Riyadh, Saudi Arabia
              <br />
              Email:{" "}
              <a
                href="mailto:marketing@eclipseadagency.com"
                className="text-white underline underline-offset-2"
              >
                marketing@eclipseadagency.com
              </a>
              <br />
              Website:{" "}
              <a
                href="https://www.eclipseagency.net"
                className="text-white underline underline-offset-2"
              >
                www.eclipseagency.net
              </a>
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
