import { MetadataRoute } from "next";
import { url } from "../utils/shared-metadata";
import { supabase } from "@/utils/supabase";

async function fetchAllCharacterIds() {
  const { data, error } = await supabase
    .from("mst_characters")
    .select(`artist_id`)
    .eq("unique_flg", true);

  if (error) return [];

  return data;
}

async function fetchAllTrackIds() {
  const { data, error } = await supabase.from("mst_tracks").select(`track_id`);

  if (error) return [];

  return data;
}

async function fetchAllAlbumIds() {
  const { data, error } = await supabase.from("mst_albums").select(`album_id`);

  if (error) return [];

  return data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = url;
  const lastModified = new Date();

  const staticPaths = [
    {
      url: baseURL,
      lastModified,
    },
    {
      url: `${baseURL}/search/tracks-by-character`,
      lastModified,
    },
    {
      url: `${baseURL}/search/tracks-by-feature`,
      lastModified,
    },
  ];

  const characters = await fetchAllCharacterIds();
  const dynamicCharacterPaths = characters.map((character) => ({
    url: `${baseURL}/characters/${character.artist_id}`,
    lastModified,
  }));
  const tracks = await fetchAllTrackIds();
  const dynamicTrackPaths = tracks.map((track) => ({
    url: `${baseURL}/tracks/${track.track_id}`,
    lastModified,
  }));
  const albums = await fetchAllAlbumIds();
  const dynamicAlbumPaths = albums.map((album) => ({
    url: `${baseURL}/albums/${album.album_id}`,
    lastModified,
  }));

  return [
    ...staticPaths,
    ...dynamicCharacterPaths,
    ...dynamicTrackPaths,
    ...dynamicAlbumPaths,
  ];
}
