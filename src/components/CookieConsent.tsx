"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "eclipse-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      // Small delay so it slides in after page load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  return (
    <div
      className={`fixed bottom-20 left-5 z-[9999] max-w-sm rounded-2xl border border-white/10 bg-[#0a0a0a] p-5 shadow-2xl transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      <p className="mb-4 text-sm leading-relaxed text-white/70">
        We use cookies and analytics to improve your experience.{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-2 transition-colors hover:text-[#ff6b35]"
        >
          Privacy&nbsp;Policy
        </Link>
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={handleAccept}
          className="rounded-lg bg-[#ff6b35] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e55a28]"
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white/60 transition-colors hover:border-white/40 hover:text-white/90"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
