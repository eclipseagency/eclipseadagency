"use client";

import { useEffect } from "react";

export default function V2Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hide root layout elements (Header, Footer, Preloader, CustomCursor, WireframeBackground)
    document.body.classList.add("v2-page");
    document.body.style.cursor = "auto";
    return () => {
      document.body.classList.remove("v2-page");
      document.body.style.cursor = "";
    };
  }, []);

  return <>{children}</>;
}
