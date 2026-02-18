"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig, footerContent } from "@/data/site";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  BehanceIcon,
  PinterestIcon,
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
    <footer
      className="relative overflow-hidden px-5 pt-20 pb-8 md:px-8"
      style={{
        background: "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(20,18,15,1) 100%)",
        borderTopLeftRadius: "2rem",
        borderTopRightRadius: "2rem",
      }}
    >
      {/* Decorative glow */}
      <div className="absolute -top-20 left-1/2 h-40 w-[60%] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-[80px]" />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-5 inline-block">
              <Image src="/images/logo.png" alt={siteConfig.name} width={180} height={48} />
            </Link>
            <p className="text-sm leading-relaxed text-text-secondary">
              {footerContent.description}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-5 text-sm font-semibold text-white/80">
              Services
            </h4>
            <ul className="space-y-3">
              {footerContent.links.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5 text-sm font-semibold text-white/80">
              Company
            </h4>
            <ul className="space-y-3">
              {footerContent.links.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="mb-5 text-sm font-semibold text-white/80">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/40">
                <MailIcon size={15} className="mt-0.5 shrink-0 text-primary/70" />
                <a href={`mailto:${siteConfig.email}`} className="transition-colors duration-300 hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/40">
                <PhoneIcon size={15} className="mt-0.5 shrink-0 text-primary/70" />
                <a href={`tel:${siteConfig.phone}`} className="transition-colors duration-300 hover:text-white">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/40">
                <MapPinIcon size={15} className="mt-0.5 shrink-0 text-primary/70" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] text-white/40 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.05] pt-8 md:flex-row">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <Link href="/privacy" className="transition-colors duration-300 hover:text-white/60">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors duration-300 hover:text-white/60">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
