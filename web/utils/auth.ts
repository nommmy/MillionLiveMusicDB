const getSpotifyAccessToken = async () => {
  try {
    const authOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
      },
      cache: "no-store" as RequestCache,
      body: "grant_type=client_credentials",
    };

    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );
    const data = await response.json();

    if (response.ok) {
      data["expiration_time"] = Date.now() + data.expires_in * 1000;
      console.log(data);
      return data;
    } else {
      console.error("Failed to fetch access token:", response.status, data);
      return;
    }
  } catch (error) {
    console.error("Error during access token request:", error);
    return;
  }
};

export const isAccessTokenExpired = (expirationTime: number) => {
  return Date.now() > expirationTime;
};

export type SpotifyAccessTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  expiration_time: number;
};

export default getSpotifyAccessToken;
