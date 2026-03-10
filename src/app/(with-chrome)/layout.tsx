"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WireframeBackground } from "@/components/ui/WireframeBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/ui/Preloader";

export default function ChromeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <WireframeBackground />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
