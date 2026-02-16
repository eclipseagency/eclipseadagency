import Link from "next/link";
import Image from "next/image";
import { siteConfig, footerContent } from "@/data/site";
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  BehanceIcon,
  PinterestIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
} from "@/components/ui/Icons";

const socialIcons = [
  { Icon: LinkedInIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { Icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { Icon: TikTokIcon, href: siteConfig.social.tiktok, label: "TikTok" },
  { Icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
  { Icon: BehanceIcon, href: siteConfig.social.behance, label: "Behance" },
  { Icon: PinterestIcon, href: siteConfig.social.pinterest, label: "Pinterest" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg px-5 pt-16 pb-8 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-5 inline-block">
              <Image src="/images/logo.png" alt={siteConfig.name} width={200} height={52} />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-text-secondary">
              {footerContent.description}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-5 font-heading text-sm font-bold uppercase tracking-[0.15em]">
              Services
            </h4>
            <ul className="space-y-3">
              {footerContent.links.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5 font-heading text-sm font-bold uppercase tracking-[0.15em]">
              Company
            </h4>
            <ul className="space-y-3">
              {footerContent.links.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="mb-5 font-heading text-sm font-bold uppercase tracking-[0.15em]">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <MailIcon size={16} className="mt-0.5 shrink-0 text-primary" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-text transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <PhoneIcon size={16} className="mt-0.5 shrink-0 text-primary" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-text transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <MapPinIcon size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-colors duration-300 hover:bg-white/10 hover:text-primary"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-text-muted">
            <Link href="/privacy" className="hover:text-text transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-text transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
