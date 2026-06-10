import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

const LIMITS = { name: 100, email: 254, subject: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= max ? trimmed : null;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  //honeypot, only bots fill this
  if (body.company) {
    return NextResponse.json({ success: true });
  }

  const name = cleanString(body.name, LIMITS.name);
  const email = cleanString(body.email, LIMITS.email);
  const message = cleanString(body.message, LIMITS.message);
  const hasSubject = typeof body.subject === "string" && body.subject.trim() !== "";
  const subject = hasSubject ? cleanString(body.subject, LIMITS.subject) : "";

  if (!name || !email || !message || subject === null || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const { error } = await supabase
    .from('message')        // table name
    .insert({ name, email, subject, message })

  if (error) {
    console.error("contact insert failed:", error.message);
    return NextResponse.json({ error: "Could not save your message" }, { status: 500 })
  }
  return NextResponse.json({ success: true });
}
