import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact";

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please check the form fields.", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint || !endpoint.startsWith("https://")) return NextResponse.json({ error: "Online enquiries are not available yet. Please try again later." }, { status: 503 });
  const { category, name, email, organization, message } = parsed.data;
  const enquiry = { category, name, email, organization, message };
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(process.env.CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` } : {}) },
      body: JSON.stringify({ ...enquiry, submittedAt: new Date().toISOString(), source: "JD CORP website" }),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Delivery endpoint returned ${response.status}`);
    return NextResponse.json({ message: "Your enquiry has been received." });
  } catch (error) {
    console.error("Contact delivery failed:", error);
    return NextResponse.json({ error: "We could not deliver your enquiry. Please try again later." }, { status: 502 });
  }
}
