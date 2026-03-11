"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WireframeBackground } from "@/components/ui/WireframeBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
export default function ChromeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <WireframeBackground />
      <Header />
      <main id="main-content" className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
