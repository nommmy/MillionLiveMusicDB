import { createClient } from "@supabase/supabase-js";
import {
  Track,
  AudioFeatures,
  Artist,
  Album,
} from "@/utils/spotify-response.type";
import { Database } from "@/database.types";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
export const supabase = createClient(
  supabaseUrl as string,
  supabaseKey as string
);

type UnitsType = {
  unit_id: string;
};

export type CharacterType = {
  [key: string]: string | boolean | UnitsType[];
  artist_id: string;
  character_name: string;
  image_6th: string;
  image_favorite: string;
  image_uniform: string;
  color: string;
  unique_flg: boolean;
  mst_units: UnitsType[];
};

type AlbumType = {
  name: string;
  album_image_url: string;
};

export type TrackItemType = {
  track_id: string;
  track_name: string;
  preview_url: string;
  artist_names: string[];
  artist_ids: string[];
  mst_albums: AlbumType;
};

export type TrackFeaturesType = {
  [key: string]: string | string[] | number | AlbumType;
  track_id: string;
  track_name: string;
  preview_url: string;
  artist_names: string[];
  artist_ids: string[];
  duration_ms: number;
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  speechiness: number;
  key: number;
  loudness: number;
  valence: number;
  tempo: number;
  mst_albums: AlbumType;
};

export const upsertSupabaseTables = async (
  allTracks: Track[],
  allArtists: Artist[],
  allAlbums: Album[],
  allAudioFeatures: AudioFeatures[]
) => {
  console.log("upsert albums...")
  const albumData = await upsertAlbums(allAlbums);
  console.log("upsert artists...")
  const artistData = await upsertArtists(allArtists);
  console.log("upsert tracks...")
  const trackData = await upsertTracks(allTracks, allAudioFeatures);

  return !!(albumData && artistData && trackData);
};

const upsertTracks = async (
  allTracks: Track[],
  allAudioFeatures: AudioFeatures[]
) => {
  type TrackSupabase = Database["public"]["Tables"]["mst_tracks"]["Insert"];
  const trackData: TrackSupabase[] = allTracks.map((track, index) => {
    const audioFeature: AudioFeatures = allAudioFeatures[index];
    return {
      acousticness: audioFeature["acousticness"],
      album_id: track["album"]["id"],
      analysis_url: audioFeature["analysis_url"],
      artist_ids: track["artists"].map((artist) => artist.id),
      artist_names: track["artists"].map((artist) => artist.name),
      danceability: audioFeature["danceability"],
      disc_number: track["disc_number"],
      duration_ms: track["duration_ms"],
      energy: audioFeature["energy"],
      instrumentalness: audioFeature["instrumentalness"],
      key: audioFeature["key"],
      liveness: audioFeature["liveness"],
      loudness: audioFeature["loudness"],
      mode: audioFeature["mode"],
      popularity: track["popularity"],
      preview_url: track["preview_url"],
      speechiness: audioFeature["speechiness"],
      tempo: audioFeature["tempo"],
      time_signature: audioFeature["time_signature"],
      track_href: audioFeature["track_href"],
      track_id: track["id"],
      track_name: track["name"],
      track_number: track["track_number"],
      valence: audioFeature["valence"],
    };
  });

  const { data, error } = await supabase
    .from("mst_tracks")
    .upsert(trackData);
  if (error) console.error(error);

  return data;
};

const upsertArtists = async (allArtists: Artist[]) => {
  type ArtistSupabase = Database["public"]["Tables"]["mst_artists"]["Insert"];
  const artistData: ArtistSupabase[] = allArtists.map((artist) => ({
    artist_id: artist["id"],
    artist_name: artist["name"],
    popularity: artist["popularity"],
    spotify_api_endpoint: artist["href"],
    spotify_external_url: artist["external_urls"]["spotify"],
    total_followers: artist["followers"]["total"],
  }));

  const { data, error } = await supabase
    .from("mst_artists")
    .upsert(artistData);
  
  if (error) console.error(error);

  return data;
};

const upsertAlbums = async (allAlbums: Album[]) => {
  type AlbumSupabase = Database["public"]["Tables"]["mst_albums"]["Insert"];
  const albumData: AlbumSupabase[] = allAlbums.map((album) => ({
    album_id: album["id"],
    album_image_url: album["images"][0]["url"],
    album_type: album["album_type"],
    artist_ids: [
      ...new Set(
        album["tracks"]["items"].flatMap((track: Track) =>
          track.artists.flatMap((artist) => artist.id)
        )
      ),
    ],
    artist_names: [
      ...new Set(
        album["tracks"]["items"].flatMap((track: Track) =>
          track.artists.flatMap((artist) => artist.name)
        )
      ),
    ],
    name: album["name"],
    release_date: album["release_date"],
    spotify_api_endpoint: album["href"],
    spotify_external_url: album["external_urls"]["spotify"],
    total_tracks: album["total_tracks"],
  }));

  const { data, error } = await supabase
    .from("mst_albums")
    .upsert(albumData);
  if (error) console.error(error);

  return data;
};
