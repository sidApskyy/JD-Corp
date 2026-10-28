"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { contactSchema, type ContactData } from "@/lib/contact";

const categories: ContactData["category"][] = ["General enquiry", "Business opportunity", "Project enquiry", "Careers", "Media"];
type Fields = "category" | "name" | "email" | "organization" | "message";

export function ContactForm() {
  const [values, setValues] = useState<ContactData>({ category: "General enquiry", name: "", email: "", organization: "", message: "", website: "" });
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  function update(field: Fields, value: string) { setValues((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })); if (status === "error") setStatus("idle"); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const issues = result.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(issues).map(([key, messages]) => [key, messages?.[0]])));
      document.getElementById(result.error.issues[0].path[0]?.toString())?.focus();
      return;
    }
    setStatus("sending"); setServerMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(result.data) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Delivery failed.");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setServerMessage(error instanceof Error ? error.message : "We could not deliver your enquiry. Please try again.");
    }
  }
  if (status === "success") return <div className="form-success" role="status"><Check size={32} strokeWidth={1} /><h2>Thank you for reaching out.</h2><p>Your enquiry was accepted for delivery. We&apos;ll be in touch when we can.</p><Link href="/" className="text-link">BACK TO HOME <ArrowUpRight size={18} /></Link></div>;
  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="form-heading"><span className="eyebrow">ENQUIRY FORM / 01</span><p>Tell us a little about what you have in mind.</p></div>
    <div className="form-field"><label htmlFor="category">I&apos;m getting in touch about <span>*</span></label><select id="category" value={values.category} onChange={(event) => update("category", event.target.value)}>{categories.map((category) => <option key={category}>{category}</option>)}</select></div>
    <div className="form-row"><div className="form-field"><label htmlFor="name">Your name <span>*</span></label><input id="name" autoComplete="name" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} /><span id="name-error" className="field-error">{errors.name}</span></div><div className="form-field"><label htmlFor="email">Email address <span>*</span></label><input id="email" type="email" autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} /><span id="email-error" className="field-error">{errors.email}</span></div></div>
    <div className="form-field"><label htmlFor="organization">Organization <span className="optional">(OPTIONAL)</span></label><input id="organization" autoComplete="organization" value={values.organization} onChange={(event) => update("organization", event.target.value)} aria-invalid={!!errors.organization} aria-describedby={errors.organization ? "organization-error" : undefined} /><span id="organization-error" className="field-error">{errors.organization}</span></div>
    <div className="form-field"><label htmlFor="message">Your message <span>*</span></label><textarea id="message" rows={5} value={values.message} onChange={(event) => update("message", event.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} /><span id="message-error" className="field-error">{errors.message}</span></div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => setValues((current) => ({ ...current, website: event.target.value }))} /></div>
    <p className="form-privacy">By submitting this form, you agree to the handling of your information as described in our <Link href="/privacy">privacy notice</Link>.</p>
    {status === "error" && <p className="form-alert" role="alert">{serverMessage}</p>}
    <button className="button-dark form-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "SENDING..." : "SEND ENQUIRY"} <ArrowUpRight size={17} /></button>
  </form>;
}
