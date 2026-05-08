import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase env vars not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/contacts`, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ name, email, subject: subject || null, message }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Supabase error:", text);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
