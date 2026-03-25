"use client";

import { useLocale } from "@/i18n/LocaleContext";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "./ContactForm";
import { siteConfig } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { MailIcon, PhoneIcon, MapPinIcon } from "@/components/ui/Icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function ContactContent() {
  const { t } = useLocale();

  const contactInfo = [
    {
      icon: MailIcon,
      label: t("contact.page.emailLabel"),
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: PhoneIcon,
      label: t("contact.page.phoneLabel"),
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone}`,
    },
    {
      icon: MapPinIcon,
      label: t("contact.page.officeLabel"),
      value: siteConfig.address,
    },
  ];

  return (
    <>
      <PageHero
        badge={t("contact.page.badge")}
        title={t("contact.page.title")}
        subtitle={t("contact.page.subtitle")}
        illustration="/images/hero-pages/contact-hero.svg"
      />

      <SectionWrapper>
        <Breadcrumbs
          items={[
            { label: t("breadcrumb.home"), href: "/" },
            { label: t("nav.contact") },
          ]}
        />
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-20">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 font-heading text-2xl font-bold">{t("contact.page.infoTitle")}</h2>
            <p className="mb-8 text-text-secondary leading-relaxed">
              {t("contact.page.infoDesc")}
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
