import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  // ✅ Correct date format (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*")
    .gte("date", today)
    .order("date", { ascending: true });

  return Response.json({ data, error });
}

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("events")
    .insert([body]);

  return Response.json({ data, error });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const { error } = await supabaseAdmin
    .from("events")
    .delete()
    .eq("id", id);

  return Response.json({ error });
}