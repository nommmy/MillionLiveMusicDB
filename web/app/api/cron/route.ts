import { NextResponse, NextRequest } from "next/server";
import {
  fetchAllMillionArtists,
  fetchAllMillionTracksFromPlaylist,
  fetchAudioFeaturesByTrackIds,
  fetchAllMillionAlbums,
} from "@/utils/tracks";
import getSpotifyAccessToken, {
  SpotifyAccessTokenResponse,
} from "@/utils/auth";
import {
  Track,
  AudioFeatures,
  Artist,
  Album,
} from "@/utils/spotify-response.type";
import { upsertSupabaseTables } from "@/utils/supabase";

export const revalidate = 0;
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  // authorization ヘッダーには “Bearer ” がプレフィクスにつくことに注意
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(`Unauthorized ${authHeader}`, {
      status: 401,
    });
  }

  console.log("get spotify access token...");
  const accessToken: SpotifyAccessTokenResponse = await getSpotifyAccessToken();

  console.log("fetch all tracks in playlist...");
  console.log("playlist id: ", process.env.SPOTIFY_PLAYLIST_ID);
  // 全曲プレイリストから全楽曲情報を取得
  const playlistId = process.env.SPOTIFY_PLAYLIST_ID;
  const allTracks: Track[] =
    (await fetchAllMillionTracksFromPlaylist(accessToken, playlistId)) ?? [];
  console.log("results: ", allTracks.length, "tracks.");
  console.log("example track: ", allTracks[0]);

  console.log("fetch audio features...");
  // 各楽曲の分析情報を取得
  const trackIds = Array.from(allTracks, (track: Track) => track.id);
  const allAudioFeatures: AudioFeatures[] =
    (await fetchAudioFeaturesByTrackIds(accessToken, trackIds, 100)) ?? [];
  console.log("results: ", allAudioFeatures.length, "audio features.");
  console.log("example audio feature: ", allAudioFeatures[0]);

  console.log("fetch all artists...");
  // Artist情報を取得
  const artistIds: string[] = Array.from(
    new Set(
      allTracks.flatMap((data) => data.artists.map((artist) => artist.id))
    )
  );
  const allArtists: Artist[] =
    (await fetchAllMillionArtists(accessToken, artistIds, 50)) ?? [];
  console.log("results: ", allArtists.length, "artists.");
  console.log("example artist: ", allArtists[0]);

  console.log("fetch all albums...");
  // Album情報を取得
  const albumIds: string[] = Array.from(
    new Set(allTracks.flatMap((data) => data.album.id))
  );
  const allAlbums: Album[] =
    (await fetchAllMillionAlbums(accessToken, albumIds, 20)) ?? [];
  console.log("results: ", allAlbums.length, "albums.");
  console.log("example album: ", allAlbums[0]);

  await upsertSupabaseTables(
    allTracks,
    allArtists,
    allAlbums,
    allAudioFeatures
  );

  console.log("revalidate top page...");
  await fetch("/api/revalidate?path=/");

  console.log("finished successfully");
  return NextResponse.json({
    status: 200,
  });
}
