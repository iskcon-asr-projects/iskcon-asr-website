import { supabase } from "@/lib/supabase";

export async function GET() {
  // Fetch just the dates for the filter bar
  const { data, error } = await supabase
    .from("daily_darshans")
    .select("date")
    .order("date", { ascending: false })
    .limit(7);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ data });
}
