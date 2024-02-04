import { NextResponse } from "next/server";
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

export async function GET() {
  const accessToken: SpotifyAccessTokenResponse = await getSpotifyAccessToken();
  // 全曲プレイリストから全楽曲情報を取得
  const playlistId = process.env.SPOTIFY_PLAYLIST_ID;
  const allTracks: Track[] =
    (await fetchAllMillionTracksFromPlaylist(accessToken, playlistId)) ?? [];

  // 各楽曲の分析情報を取得
  const trackIds = Array.from(allTracks, (track: Track) => track.id);
  const allAudioFeatures: AudioFeatures[] =
    (await fetchAudioFeaturesByTrackIds(accessToken, trackIds, 100)) ?? [];

  // Artist情報を取得
  const artistIds: string[] = Array.from(
    new Set(
      allTracks.flatMap((data) => data.artists.map((artist) => artist.id))
    )
  );
  const allArtists: Artist[] =
    (await fetchAllMillionArtists(accessToken, artistIds, 50)) ?? [];

  // Album情報を取得
  const albumIds: string[] = Array.from(
    new Set(allTracks.flatMap((data) => data.album.id))
  );
  const allAlbums: Album[] =
    (await fetchAllMillionAlbums(accessToken, albumIds, 20)) ?? [];

  const result = await upsertSupabaseTables(
    allTracks,
    allArtists,
    allAlbums,
    allAudioFeatures
  );
  return NextResponse.json({
    status: 200,
  });
}
