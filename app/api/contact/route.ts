import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

const { error } = await supabase
    .from('message')        // table name
    .insert({ name, email, subject, message })

  if (error){
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true });
}
