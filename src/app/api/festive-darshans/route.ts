import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const festival_name = searchParams.get("festival_name");

  let query = supabaseAdmin.from("festive_darshans").select("*");

  if (date) {
    query = query.eq("date", date);
  }
  if (festival_name) {
    query = query.ilike("festival_name", `%${festival_name}%`);
  }

  // Get the most recent festival if no filters are applied
  query = query.order("date", { ascending: false }).limit(20);

  const { data, error } = await query;

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ data });
}

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("festive_darshans")
    .insert([body]);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ data });
}
