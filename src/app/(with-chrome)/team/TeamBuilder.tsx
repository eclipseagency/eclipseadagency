"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Pricing data — base prices in USD (converted from EGP / 50)       */
/* ------------------------------------------------------------------ */

interface Role {
  id: string;
  title: string;
  tooltip: string;
  juniorUSD: number;
  seniorUSD: number;
}

const roles: Role[] = [
  { id: "graphic-designer", title: "Graphic Designer", tooltip: "Creates visual content — social media posts, branding materials, ads, packaging, and print designs", juniorUSD: 300, seniorUSD: 500 },
  { id: "smm-specialist", title: "Social Media Specialist", tooltip: "Manages your social media accounts — content planning, scheduling, engagement, and community growth", juniorUSD: 240, seniorUSD: 400 },
  { id: "account-moderator", title: "Account Moderator", tooltip: "Handles client communication, replies to comments & DMs, and maintains brand voice across platforms", juniorUSD: 200, seniorUSD: 300 },
  { id: "motion-designer", title: "Motion Designer", tooltip: "Creates animated content — motion graphics, logo animations, explainer videos, and animated ads", juniorUSD: 300, seniorUSD: 600 },
  { id: "video-editor", title: "Video Editor", tooltip: "Edits and produces video content — reels, commercials, product videos, and long-form content", juniorUSD: 240, seniorUSD: 500 },
  { id: "web-developer", title: "Web Developer (Powered by Claude)", tooltip: "Builds websites, web apps, e-commerce stores, and custom software — AI-assisted for faster delivery", juniorUSD: 300, seniorUSD: 800 },
  { id: "media-buyer", title: "Media Buyer", tooltip: "Manages paid advertising — Google Ads, Meta Ads, TikTok Ads — optimizing budgets for maximum ROI", juniorUSD: 240, seniorUSD: 500 },
];

const includedFree = [
  "Marketing Director",
  "HR Manager",
  "Accountant",
  "CRM System",
];

type Currency = "USD" | "SAR" | "AED";

const currencyRates: Record<Currency, number> = {
  USD: 1,
  SAR: 3.75,
  AED: 3.67,
};

const currencySymbols: Record<Currency, string> = {
  USD: "$",
  SAR: "SAR",
  AED: "AED",
};

type OfficeType = "extension" | "registered";

const officeOptions: { id: OfficeType; title: string; desc: string; perPersonUSD: number }[] = [
  {
    id: "extension",
    title: "Extension of Eclipse Office",
    desc: "Your team works from our existing office under Eclipse's company umbrella. Fastest setup, lowest overhead.",
    perPersonUSD: 0,
  },
  {
    id: "registered",
    title: "New Registered Office",
    desc: "A new company registered in Egypt under your name — with bank accounts, legal entity, full compliance, office equipment & PCs.",
    perPersonUSD: 700,
  },
];

// Pre-built smart team: $3,000 USD/month
const smartTeamUSD = 3000;

/* ------------------------------------------------------------------ */
/*  Selection state                                                    */
/* ------------------------------------------------------------------ */

interface RoleSelection {
  roleId: string;
  level: "junior" | "senior";
  count: number;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function TeamBuilder() {
  const [mode, setMode] = useState<"custom" | "smart">("custom");
  const [currency, setCurrency] = useState<Currency>("SAR");
  const [selections, setSelections] = useState<RoleSelection[]>([]);
  const [officeType, setOfficeType] = useState<OfficeType>("extension");

  /* helpers */
  const fmt = (usd: number) => {
    const converted = Math.round(usd * currencyRates[currency]);
    const sym = currencySymbols[currency];
    if (currency === "USD") return `$${converted.toLocaleString()}`;
    return `${converted.toLocaleString()} ${sym}`;
  };

  const getSelection = (roleId: string) =>
    selections.find((s) => s.roleId === roleId);

  const toggleRole = (roleId: string) => {
    setSelections((prev) => {
      const exists = prev.find((s) => s.roleId === roleId);
      if (exists) return prev.filter((s) => s.roleId !== roleId);
      return [...prev, { roleId, level: "junior", count: 1 }];
    });
  };

  const updateLevel = (roleId: string, level: "junior" | "senior") => {
    setSelections((prev) =>
      prev.map((s) => (s.roleId === roleId ? { ...s, level } : s))
    );
  };

  const updateCount = (roleId: string, count: number) => {
    if (count < 1) return;
    setSelections((prev) =>
      prev.map((s) => (s.roleId === roleId ? { ...s, count } : s))
    );
  };

  /* totals */
  const rolesTotal = selections.reduce((sum, sel) => {
    const role = roles.find((r) => r.id === sel.roleId)!;
    const price = sel.level === "junior" ? role.juniorUSD : role.seniorUSD;
    return sum + price * sel.count;
  }, 0);

  const headcount = selections.reduce((sum, s) => sum + s.count, 0);
  const officePerPerson = officeOptions.find((o) => o.id === officeType)!.perPersonUSD;
  const oneTimeSetupUSD = officePerPerson * headcount;
  const totalUSD = mode === "smart" ? smartTeamUSD : rolesTotal;

  /* WhatsApp summary */
  const buildWhatsAppMsg = () => {
    if (mode === "smart") {
      return `Hi Mustafa, I'm interested in the Smart Digital Marketing Team package (${fmt(smartTeamUSD)}/month). Let's discuss!`;
    }
    const lines = selections.map((sel) => {
      const role = roles.find((r) => r.id === sel.roleId)!;
      return `- ${sel.count}x ${role.title} (${sel.level})`;
    });
    const office =
      officeType === "extension"
        ? "Extension of Eclipse Office"
        : "New Registered Office";
    const setupMsg = oneTimeSetupUSD > 0 ? `\nOne-time setup: ${fmt(oneTimeSetupUSD)} (${headcount} x ${fmt(700)} for equipment, PCs, legal & registration)` : "";
    return `Hi Mustafa, I'd like to build a custom team:\n\n${lines.join("\n")}\n\nOffice: ${office}\nMonthly: ${fmt(totalUSD)}/month${setupMsg}\n\nLet's discuss!`;
  };

  return (
    <div>
      {/* Currency switcher */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {(["SAR", "USD", "AED"] as Currency[]).map((c) => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            className={`rounded-full px-5 py-2 text-sm font-bold transition-all duration-200 ${
              currency === c
                ? "bg-primary text-white shadow-[0_0_20px_rgba(194,138,20,0.3)]"
                : "border border-border bg-bg-card text-text-secondary hover:border-border-hover"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Mode toggle */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => setMode("smart")}
          className={`rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
            mode === "smart"
              ? "border-primary bg-primary/5 shadow-[0_0_30px_rgba(194,138,20,0.1)]"
              : "border-border bg-bg-card hover:border-border-hover"
          }`}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </span>
            <h3 className="font-heading text-lg font-bold">Smart Team</h3>
          </div>
          <p className="mb-3 text-sm text-text-secondary">
            Ready-made 9-person digital marketing team. Starts within 1 week after payment.
          </p>
          <div className="font-heading text-2xl font-bold text-primary">
            {fmt(smartTeamUSD)}
            <span className="ml-1 text-sm font-normal text-text-muted">/ month</span>
          </div>
        </button>

        <button
          onClick={() => setMode("custom")}
          className={`rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
            mode === "custom"
              ? "border-primary bg-primary/5 shadow-[0_0_30px_rgba(194,138,20,0.1)]"
              : "border-border bg-bg-card hover:border-border-hover"
          }`}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18M3 12h18" />
              </svg>
            </span>
            <h3 className="font-heading text-lg font-bold">Build Your Own</h3>
          </div>
          <p className="mb-3 text-sm text-text-secondary">
            Pick exact roles, seniority levels, and team size. Full customization.
          </p>
          <div className="font-heading text-2xl font-bold text-primary">
            Custom
            <span className="ml-1 text-sm font-normal text-text-muted">/ you decide</span>
          </div>
        </button>
      </div>

      {/* ── Smart Team Details ── */}
      {mode === "smart" && (
        <div className="rounded-2xl border-2 border-primary bg-bg-card overflow-hidden">
          <div className="bg-primary/10 px-8 py-5 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
              Ready in 1 Week
            </p>
            <h3 className="mt-1 font-heading text-2xl font-bold">
              Smart Digital Marketing Team
            </h3>
          </div>
          <div className="p-8">
            <div className="mb-6 text-center">
              <span className="font-heading text-5xl font-bold text-primary">
                {fmt(smartTeamUSD)}
              </span>
              <span className="ml-2 text-text-secondary">/ month</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                "2x Graphic Designer",
                "2x Social Media Specialist",
                "Content Creator",
                "Video Editor",
                "Account Manager",
                "Motion Designer",
                "SEO Specialist",
              ].map((role) => (
                <div key={role} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {role}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-border bg-bg-elevated/50 p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.1em] text-primary">Included at No Extra Cost</p>
              <div className="flex flex-wrap gap-2">
                {includedFree.map((item) => (
                  <span key={item} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-text-muted">
              9 team members. Fully managed & on-site. Self-started — ready to work on any project.
            </p>
          </div>
        </div>
      )}

      {/* ── Custom Builder ── */}
      {mode === "custom" && (
        <div className="space-y-6">
          {/* Roles */}
          <div className="rounded-2xl border border-border bg-bg-card p-6 md:p-8">
            <h3 className="mb-1 font-heading text-xl font-bold">Select Your Roles</h3>
            <p className="mb-6 text-sm text-text-secondary">
              Toggle roles on/off, choose junior or senior, and set quantity.
            </p>

            <div className="space-y-3">
              {roles.map((role) => {
                const sel = getSelection(role.id);
                const active = !!sel;
                return (
                  <div
                    key={role.id}
                    className={`rounded-xl border-2 p-4 transition-all duration-200 ${
                      active
                        ? "border-primary bg-primary/5"
                        : "border-border bg-bg-elevated/30 hover:border-border-hover"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Toggle */}
                      <button
                        onClick={() => toggleRole(role.id)}
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                          active
                            ? "border-primary bg-primary text-white"
                            : "border-border"
                        }`}
                      >
                        {active && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>

                      {/* Title + price */}
                      <div className="flex-1">
                        <p className="font-bold group/tip relative cursor-help">
                          {role.title}
                          <span className="pointer-events-none absolute -top-2 left-0 z-50 hidden w-64 -translate-y-full rounded-lg border border-border bg-[#1a1a1a] px-3 py-2 text-xs font-normal leading-relaxed text-white shadow-xl group-hover/tip:block">
                            {role.tooltip}
                          </span>
                        </p>
                        <p className="text-xs text-text-muted">
                          Junior: {fmt(role.juniorUSD)} — Senior: {fmt(role.seniorUSD)}
                        </p>
                      </div>

                      {/* Level + Count (only when active) */}
                      {active && (
                        <div className="flex items-center gap-3">
                          {/* Junior/Senior toggle */}
                          <div className="flex rounded-lg border border-border overflow-hidden">
                            <button
                              onClick={() => updateLevel(role.id, "junior")}
                              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                                sel.level === "junior"
                                  ? "bg-primary text-white"
                                  : "bg-bg-card text-text-secondary hover:bg-bg-elevated"
                              }`}
                            >
                              Junior
                            </button>
                            <button
                              onClick={() => updateLevel(role.id, "senior")}
                              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                                sel.level === "senior"
                                  ? "bg-primary text-white"
                                  : "bg-bg-card text-text-secondary hover:bg-bg-elevated"
                              }`}
                            >
                              Senior
                            </button>
                          </div>

                          {/* Count */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateCount(role.id, sel.count - 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-bg-card text-sm font-bold transition-colors hover:border-border-hover"
                            >
                              -
                            </button>
                            <span className="w-7 text-center text-sm font-bold">
                              {sel.count}
                            </span>
                            <button
                              onClick={() => updateCount(role.id, sel.count + 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-bg-card text-sm font-bold transition-colors hover:border-border-hover"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Included free */}
          <div className="rounded-2xl border border-border bg-bg-card p-6 md:p-8">
            <h3 className="mb-1 font-heading text-xl font-bold">Included at No Extra Cost</h3>
            <p className="mb-4 text-sm text-text-secondary">
              Powered by Eclipse — zero headache to run your team.
            </p>
            <div className="flex flex-wrap gap-3">
              {includedFree.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Office type */}
          <div className="rounded-2xl border border-border bg-bg-card p-6 md:p-8">
            <h3 className="mb-1 font-heading text-xl font-bold">Office Setup</h3>
            <p className="mb-4 text-sm text-text-secondary">
              Choose how your team is structured legally.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {officeOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setOfficeType(opt.id)}
                  className={`rounded-xl border-2 p-5 text-left transition-all duration-200 ${
                    officeType === opt.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-border-hover"
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <h4 className="font-bold">{opt.title}</h4>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        officeType === opt.id ? "border-primary bg-primary" : "border-border"
                      }`}
                    >
                      {officeType === opt.id && (
                        <div className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <p className="mb-2 text-xs leading-relaxed text-text-secondary">
                    {opt.desc}
                  </p>
                  <p className="text-sm font-bold text-primary">
                    {opt.perPersonUSD === 0
                      ? "No extra cost"
                      : `+${fmt(opt.perPersonUSD)} per person (one-time — equipment, PCs, legal & registration)`}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Summary / Total ── */}
      <div className="mt-8 overflow-hidden rounded-2xl border-2 border-primary bg-bg-card">
        <div className="bg-primary/10 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-primary">
                Estimated Monthly Cost
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-heading text-4xl font-bold text-primary">
                  {fmt(totalUSD)}
                </span>
                <span className="text-sm text-text-secondary">/ month</span>
              </div>
            </div>
            <div className="text-right text-sm text-text-secondary">
              {mode === "custom" && (
                <>
                  <p>{headcount} team member{headcount !== 1 ? "s" : ""}</p>
                  <p>{officeType === "registered" ? "New Registered Office" : "Eclipse Office Extension"}</p>
                  {oneTimeSetupUSD > 0 && (
                    <p className="mt-1 font-medium text-primary">
                      + {fmt(oneTimeSetupUSD)} one-time setup ({headcount} x {fmt(700)})
                    </p>
                  )}
                </>
              )}
              {mode === "smart" && <p>9 team members — Ready in 1 week</p>}
            </div>
          </div>
        </div>

        {/* All 3 currencies */}
        <div className="flex divide-x divide-border border-t border-border">
          {(["SAR", "USD", "AED"] as Currency[]).map((c) => {
            const val = Math.round(totalUSD * currencyRates[c]);
            return (
              <div key={c} className="flex-1 px-4 py-3 text-center">
                <p className="text-xs text-text-muted">{c}</p>
                <p className={`font-heading text-lg font-bold ${c === currency ? "text-primary" : ""}`}>
                  {c === "USD" ? "$" : ""}
                  {val.toLocaleString()}
                  {c !== "USD" ? ` ${c}` : ""}
                </p>
              </div>
            );
          })}
        </div>

        {mode === "custom" && oneTimeSetupUSD > 0 && (
          <div className="border-t border-border bg-primary/5 px-6 py-3 text-center">
            <p className="text-sm">
              <span className="text-text-muted">One-time setup: </span>
              <span className="font-bold text-primary">{fmt(oneTimeSetupUSD)}</span>
              <span className="text-text-muted"> ({headcount} x {fmt(700)} for equipment, PCs, legal & registration)</span>
            </p>
          </div>
        )}

        <div className="border-t border-border px-6 py-5 text-center">
          <a
            href={`https://wa.me/201129560357?text=${encodeURIComponent(buildWhatsAppMsg())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Get Started on WhatsApp
          </a>
          <p className="mt-3 text-xs text-text-muted">
            Your team configuration will be shared automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
