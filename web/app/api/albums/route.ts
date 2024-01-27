import { supabase } from "@/utils/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("mst_albums")
      .select(`album_id, name, album_image_url`)
      .order("release_date", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
