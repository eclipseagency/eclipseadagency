"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";

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

const serviceOptions = [
  "Branding & Identity",
  "Digital Marketing",
  "Web & App Development",
  "Production",
  "3D Creations",
  "Animation",
  "Multiple Services",
];

const budgetOptions = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

export function ContactForm() {
  const [form, setForm] = useState<FormData>(initialState);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
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
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-text-muted outline-none transition-colors duration-300 focus:border-primary focus:ring-2 focus:ring-primary/50";

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary text-primary">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="mb-2 font-heading text-xl font-bold">Message Sent</h3>
        <p className="text-sm text-text-secondary">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <Button className="mt-6" onClick={() => setStatus("idle")} size="sm" variant="outline">
          Send Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-10" noValidate>
      {/* Honeypot — hidden from real users */}
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
            Name *
          </label>
          <input
            id="name"
            type="text"
            className={inputClasses}
            placeholder="Your name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
            Email *
          </label>
          <input
            id="email"
            type="email"
            className={inputClasses}
            placeholder="you@company.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="company" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
            Company
          </label>
          <input
            id="company"
            type="text"
            className={inputClasses}
            placeholder="Your company"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="service" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
            Service
          </label>
          <select
            id="service"
            className={inputClasses}
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="budget" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
            Budget Range
          </label>
          <select
            id="budget"
            className={inputClasses}
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
          >
            <option value="">Select a range</option>
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
            Message *
          </label>
          <textarea
            id="message"
            rows={5}
            className={inputClasses}
            placeholder="Tell us about your project..."
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
          {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-400">
          Something went wrong. Please try again.
        </p>
      )}

      <div className="mt-6">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
