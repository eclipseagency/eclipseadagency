import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { TermsHero } from "./TermsHero";

export const metadata: Metadata = {
  title: "Terms of Service - Eclipse Agency",
  description:
    "Terms of Service for Eclipse Agency. Read the terms and conditions that govern your use of our website and services.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service - Eclipse Agency",
    description:
      "Terms of Service for Eclipse Agency. Read the terms and conditions that govern your use of our website and services.",
    url: "https://www.eclipseagency.net/terms",
    siteName: "Eclipse Agency",
    type: "website",
  },
};

const LAST_UPDATED = "March 16, 2026";

export default function TermsOfServicePage() {
  return (
    <>
      <TermsHero />

      {/* ── Introduction ── */}
      <SectionWrapper dark>
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-sm text-text-secondary">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of the website{" "}
            <a
              href="https://www.eclipseagency.net"
              className="text-white underline underline-offset-2"
            >
              www.eclipseagency.net
            </a>{" "}
            (the &quot;Site&quot;) operated by Eclipse Agency (&quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;), a creative agency based in
            Riyadh, Saudi Arabia. By accessing or using our Site, you agree to
            be bound by these Terms. If you do not agree, please do not use the
            Site.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Use of the Site ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            1. Use of the Site
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>
              You may use our Site for lawful purposes only. You agree not to:
            </p>
            <ul className="list-disc space-y-3 pl-6">
              <li>
                Use the Site in any way that violates applicable local, national,
                or international law
              </li>
              <li>
                Attempt to gain unauthorized access to any part of the Site, its
                servers, or any connected systems
              </li>
              <li>
                Interfere with or disrupt the integrity or performance of the
                Site
              </li>
              <li>
                Reproduce, duplicate, copy, sell, or exploit any portion of the
                Site without our express written permission
              </li>
              <li>
                Use automated tools, bots, or scrapers to access or collect data
                from the Site
              </li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Intellectual Property ── */}
      <SectionWrapper dark>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            2. Intellectual Property
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>
              All content on this Site, including but not limited to text,
              graphics, logos, images, videos, design elements, and software, is
              the property of Eclipse Agency or its content suppliers and is
              protected by applicable intellectual property laws.
            </p>
            <p>
              The Eclipse Agency name, logo, and all related marks are
              trademarks of Eclipse Agency. You may not use these marks without
              our prior written consent.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Services ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            3. Our Services
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>
              Eclipse Agency provides creative and digital services including
              branding, web design, social media management, video production,
              and related consulting. Specific service engagements are governed
              by separate agreements or proposals between Eclipse Agency and the
              client.
            </p>
            <p>
              The information on this Site is provided for general informational
              purposes and does not constitute a binding offer. We reserve the
              right to modify or discontinue any service at any time without
              prior notice.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Third-Party Content ── */}
      <SectionWrapper dark>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            4. Third-Party Content &amp; Links
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>
              Our Site may contain embedded content from third-party services
              (such as Vimeo for video hosting) and links to external websites.
              We are not responsible for the content, privacy practices, or
              availability of these third-party services. Your interaction with
              any third-party site or service is governed by that
              party&apos;s own terms and policies.
            </p>
            <p>
              Our Site is hosted on Vercel and uses Statcounter for
              anonymized performance monitoring. Statcounter operates in a
              cookie-free tracking mode by default.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Disclaimer of Warranties ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            5. Disclaimer of Warranties
          </h2>
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            The Site and its content are provided on an &quot;as is&quot; and
            &quot;as available&quot; basis without warranties of any kind, either
            express or implied. We do not warrant that the Site will be
            uninterrupted, error-free, or free of viruses or other harmful
            components. To the fullest extent permitted by law, we disclaim all
            warranties, including implied warranties of merchantability, fitness
            for a particular purpose, and non-infringement.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Limitation of Liability ── */}
      <SectionWrapper dark>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            6. Limitation of Liability
          </h2>
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            To the maximum extent permitted by applicable law, Eclipse Agency
            and its directors, employees, and agents shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages
            arising out of or related to your use of, or inability to use, the
            Site. Our total liability for any claim arising from use of the Site
            shall not exceed the amount you paid us, if any, in the twelve (12)
            months preceding the claim.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Indemnification ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            7. Indemnification
          </h2>
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            You agree to indemnify, defend, and hold harmless Eclipse Agency and
            its officers, directors, employees, and agents from and against any
            claims, liabilities, damages, losses, and expenses (including
            reasonable legal fees) arising out of your use of the Site or
            violation of these Terms.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Governing Law ── */}
      <SectionWrapper dark>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            8. Governing Law
          </h2>
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            These Terms shall be governed by and construed in accordance with the
            laws of the Kingdom of Saudi Arabia. Any disputes arising from these
            Terms or your use of the Site shall be subject to the exclusive
            jurisdiction of the courts in Riyadh, Saudi Arabia.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Changes to These Terms ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            9. Changes to These Terms
          </h2>
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            We reserve the right to update or modify these Terms at any time.
            Changes will be effective immediately upon posting to this page with
            an updated &quot;Last updated&quot; date. Your continued use of the
            Site after any changes constitutes acceptance of the revised Terms.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Contact ── */}
      <SectionWrapper dark>
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            10. Contact Us
          </h2>
          <div className="space-y-2 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>
              If you have any questions about these Terms, please contact us:
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
