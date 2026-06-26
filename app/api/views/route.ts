import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase.rpc('increment_views');
  if (error) return NextResponse.json({ error: 'failed' }, { status: 500 });
  return NextResponse.json({ count: data });
}
