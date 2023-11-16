// import { NextApiRequest, NextApiResponse } from "next";
// import getAllMillionTracksFromPlaylist from "@/utils/tracks";
// import getSpotifyAccessToken, {
//   SpotifyAccessTokenResponse,
// } from "@/utils/auth";
// import { Track } from "@/utils/spotify-response.type";

// export default async function handler(
//   request: NextApiRequest,
//   response: NextApiResponse
// ) {
//   const accessToken: SpotifyAccessTokenResponse = await getSpotifyAccessToken();
//   const allTracks: Track[] | undefined = await getAllMillionTracksFromPlaylist(accessToken);
//   console.log(allTracks);
// }
