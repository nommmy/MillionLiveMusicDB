import { supabase } from "@/utils/supabase";
import { cacheLife } from "next/cache";

async function fetchCharacters() {
  "use cache";
  cacheLife("weeks");
  const { data, error } = await supabase
    .from("mst_characters")
    .select(`artist_id, character_name, image_6th, image_uniform, color`)
    .eq("unique_flg", true)
    .order("character_name", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function GET() {
  try {
    const data = await fetchCharacters();
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
