import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("iyf_classes")
    .select("*")
    .order("created_at", { ascending: false });

  return Response.json({ data, error });
}

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("iyf_classes")
    .insert([body]);

  return Response.json({ data, error });
}

export async function PATCH(req: Request) {
  const { id } = await req.json();
  return Response.json({ error: "Pinning not supported yet" });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const { error } = await supabaseAdmin
    .from("iyf_classes")
    .delete()
    .eq("id", id);

  return Response.json({ error });
}
