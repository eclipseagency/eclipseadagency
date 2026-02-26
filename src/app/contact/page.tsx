import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "./ContactForm";
import { siteConfig } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { MailIcon, PhoneIcon, MapPinIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Eclipse Agency. Tell us about your project and we'll show you what's possible.",
};

const contactInfo = [
  {
    icon: MailIcon,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
  },
  {
    icon: MapPinIcon,
    label: "Office",
    value: siteConfig.address,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Get Started"
        title="Let's Build Something Extraordinary"
        subtitle="Tell us about your project and goals. We'll get back to you within 24 hours with ideas and next steps."
        image="/images/hero-pages/astronaut-over-1.jpg"
      />

      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-20">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 font-heading text-2xl font-bold">Get in Touch</h2>
            <p className="mb-8 text-text-secondary leading-relaxed">
              Whether you have a project in mind or just want to explore possibilities,
              we&apos;re here to help. Reach out through the form or contact us directly.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block text-sm text-text-secondary transition-colors hover:text-primary"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-text-secondary">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
