"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/i18n/LocaleContext";

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

const initialState: FormData = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};

const serviceOptionKeys = [
  "contact.opt.branding",
  "contact.opt.marketing",
  "contact.opt.web",
  "contact.opt.production",
  "contact.opt.3d",
  "contact.opt.animation",
  "contact.opt.multiple",
] as const;

const budgetOptionKeys = [
  "contact.budget.under5k",
  "contact.budget.5to15k",
  "contact.budget.15to50k",
  "contact.budget.50kPlus",
  "contact.budget.notSure",
] as const;

export function ContactForm() {
  const { t } = useLocale();
  const [form, setForm] = useState<FormData>(initialState);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = t("contact.nameRequired");
    if (!form.email.trim()) e.email = t("contact.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t("contact.emailInvalid");
    if (!form.message.trim()) e.message = t("contact.messageRequired");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    // Honeypot check
    if (honeypot) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  const inputClasses =
    "w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/20";

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-bg-card p-12 text-center animate-fade-in-up">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary animate-scale-in">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="mb-2 font-heading text-2xl font-bold">{t("contact.successTitle")}</h3>
        <p className="text-sm text-text-secondary">
          {t("contact.successDesc")}
        </p>
        <Button className="mt-6" onClick={() => setStatus("idle")} size="sm" variant="outline">
          {t("contact.sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-bg-card p-8 md:p-10" noValidate>
      {/* Honeypot - hidden from real users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
            {t("contact.name")} *
          </label>
          <input
            id="name"
            type="text"
            className={inputClasses}
            placeholder={t("contact.namePlaceholder")}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
            {t("contact.email")} *
          </label>
          <input
            id="email"
            type="email"
            className={inputClasses}
            placeholder={t("contact.emailPlaceholder")}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="company" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
            {t("contact.company")}
          </label>
          <input
            id="company"
            type="text"
            className={inputClasses}
            placeholder={t("contact.companyPlaceholder")}
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="service" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
            {t("contact.service")}
          </label>
          <select
            id="service"
            className={inputClasses}
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
          >
            <option value="">{t("contact.service")}</option>
            {serviceOptionKeys.map((key) => (
              <option key={key} value={t(key)}>
                {t(key)}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="budget" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
            {t("contact.budget")}
          </label>
          <select
            id="budget"
            className={inputClasses}
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
          >
            <option value="">{t("contact.budget")}</option>
            {budgetOptionKeys.map((key) => (
              <option key={key} value={t(key)}>
                {t(key)}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
            {t("contact.message")} *
          </label>
          <textarea
            id="message"
            rows={5}
            className={inputClasses}
            placeholder={t("contact.messagePlaceholder")}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
          {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
        </div>
      </div>

      {status === "error" && (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
          <svg className="h-5 w-5 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <p className="flex-1 text-sm text-red-400">
            {t("contact.error")}
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-xs font-semibold uppercase tracking-wider text-red-400 transition-colors hover:text-red-300"
          >
            {t("contact.dismiss")}
          </button>
        </div>
      )}

      <div className="mt-6">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {t("contact.sending")}
            </span>
          ) : (
            t("contact.send")
          )}
        </Button>
      </div>
    </form>
  );
}
