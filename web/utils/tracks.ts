import getSpotifyAccessToken, {
  SpotifyAccessTokenResponse,
  isAccessTokenExpired,
} from "@/utils/auth";
import {
  Item,
  Track,
  AudioFeatures,
  Artist,
  Album,
} from "@/utils/spotify-response.type";

export const fetchAllMillionArtists = async (
  accessToken: SpotifyAccessTokenResponse,
  artistIds: string[],
  chunkSize = 50
) => {
  try {
    const chunks = Array.from(
      { length: Math.ceil(artistIds.length / chunkSize) },
      (_, index) => artistIds.slice(index * chunkSize, (index + 1) * chunkSize)
    );

    const allArtists: Artist[] = (
      await Promise.all(
        chunks.map(async (chunk) => {
          const endpoint =
            "https://api.spotify.com/v1/artists?ids=" + chunk.join(",");

          const response = await fetch(endpoint, {
            headers: { Authorization: "Bearer " + accessToken.access_token },
          });
          const data = await response.json();

          return data["artists"];
        })
      )
    ).flat();

    return allArtists;
  } catch (error) {
    console.error("Error while requesting artists:", error);
    return;
  }
};

export const fetchAudioFeaturesByTrackIds = async (
  accessToken: SpotifyAccessTokenResponse,
  trackIds: string[],
  chunkSize = 100
) => {
  try {
    const chunks = Array.from(
      { length: Math.ceil(trackIds.length / chunkSize) },
      (_, index) => trackIds.slice(index * chunkSize, (index + 1) * chunkSize)
    );

    const allAudioFeatures: AudioFeatures[] = (
      await Promise.all(
        chunks.map(async (chunk) => {
          const endpoint =
            "https://api.spotify.com/v1/audio-features?ids=" + chunk.join(",");

          const response = await fetch(endpoint, {
            headers: { Authorization: "Bearer " + accessToken.access_token },
          });
          const data = await response.json();

          return data["audio_features"];
        })
      )
    ).flat();

    return allAudioFeatures;
  } catch (error) {
    console.error("Error while requesting track features:", error);
    return;
  }
};

export const fetchAllMillionTracksFromPlaylist = async (
  accessToken: SpotifyAccessTokenResponse,
  playlistId: string | undefined
) => {
  try {
    if (!accessToken || isAccessTokenExpired(accessToken.expiration_time)) {
      accessToken = await getSpotifyAccessToken();
    }

    const allTracks: Track[] = [];
    let next =
      "https://api.spotify.com/v1/playlists/" +
      playlistId +
      "/tracks?limit=100";

    while (next) {
      const response = await fetch(next, {
        headers: {
          Authorization: "Bearer " + accessToken.access_token,
        },
      });

      const data = await response.json();
      const tracksInfo = Array.from(data.items, (item: Item) => item.track);
      allTracks.push(...tracksInfo);
      next = data.next;
    }

    return allTracks;
  } catch (error) {
    console.error("Error during playlist tracks request:", error);
    return;
  }
};

export const fetchAllMillionAlbums = async (
  accessToken: SpotifyAccessTokenResponse,
  albumIds: string[],
  chunkSize = 20
) => {
  try {
    const chunks = Array.from(
      { length: Math.ceil(albumIds.length / chunkSize) },
      (_, index) => albumIds.slice(index * chunkSize, (index + 1) * chunkSize)
    );

    const allAlbums: Album[] = (
      await Promise.all(
        chunks.map(async (chunk) => {
          const endpoint =
            "https://api.spotify.com/v1/albums?ids=" + chunk.join(",");

          const response = await fetch(endpoint, {
            headers: { Authorization: "Bearer " + accessToken.access_token },
          });
          const data = await response.json();

          return data['albums'];
        })
      )
    ).flat();

    return allAlbums;
  } catch (error) {
    console.error("Error while requesting albums:", error);
    return;
  }
};
