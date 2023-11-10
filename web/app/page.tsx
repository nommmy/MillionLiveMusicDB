import styles from "./page.module.css";
import getSpotifyAccessToken from "@/lib/auth";

export default async function Home() {
  const accessToken = await getSpotifyAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb",
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  const data = await response.json();
  console.log(data);
  return <main className={styles.main}></main>;
}
