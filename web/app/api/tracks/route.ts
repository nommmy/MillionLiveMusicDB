import { supabase } from "@/utils/supabase";
import { cacheLife } from "next/cache";

async function fetchTracks() {
  "use cache";
  cacheLife("weeks");
  const { data, error } = await supabase
    .from("mst_tracks")
    .select("track_id, track_name");

  if (error) throw new Error(error.message);
  return data;
}

export async function GET() {
  try {
    const data = await fetchTracks();
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
