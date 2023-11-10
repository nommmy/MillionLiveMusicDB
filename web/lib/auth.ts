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
      body: "grant_type=client_credentials",
    };

    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );
    const data = await response.json();

    if (response.ok) {
      console.log(data);
      return data.access_token;
    } else {
      console.error("Failed to fetch access token:", response.status, data);
      return null;
    }
  } catch (error) {
    console.error("Error during access token request:", error);
    return null;
  }
};

export default getSpotifyAccessToken;
