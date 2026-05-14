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

  let query = supabaseAdmin.from("daily_darshans").select("*");

  if (date) {
    query = query.eq("date", date);
  } else {
    // If no date, get the most recent date available by ordering DESC and limiting
    query = query.order("date", { ascending: false }).limit(1);
  }

  const { data, error } = await query;

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  // To build the "previous days" component, we also might want a list of recent dates
  // so we'll fetch just dates to power the sidebar/archives filter.
  // But we'll handle that via a separate query or right here.
  return Response.json({ data });
}

export async function POST(req: Request) {
  const body = await req.json();

  // Upsert allows us to overwrite existing dates if uploaded twice
  const { data, error } = await supabaseAdmin
    .from("daily_darshans")
    .upsert([body], { onConflict: "date" });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ data });
}
