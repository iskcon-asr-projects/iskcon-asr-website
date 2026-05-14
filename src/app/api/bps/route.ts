import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const section = searchParams.get("section");

  let query = supabaseAdmin
    .from("iyf_bps")
    .select("*")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  if (section) {
    query = query.eq("section", section);
  }

  const { data, error } = await query;
  return Response.json({ data, error });
}

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("iyf_bps")
    .insert([body]);

  return Response.json({ data, error });
}

export async function PATCH(req: Request) {
  const { id, is_pinned } = await req.json();

  const { data, error } = await supabaseAdmin
    .from("iyf_bps")
    .update({ is_pinned })
    .eq("id", id);

  return Response.json({ data, error });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const { error } = await supabaseAdmin
    .from("iyf_bps")
    .delete()
    .eq("id", id);

  return Response.json({ error });
}
