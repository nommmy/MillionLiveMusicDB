import { supabase } from "@/utils/supabase";
import TrackCard from "../track/TrackCard";
import styles from "../track/TrackCard.module.css";

export type TrackCardType = {
  track_id: string;
  track_name: string;
  preview_url: string;
  artist_names: string[];
  mst_albums: {
    name: string;
    album_image_url: string;
  };
};

export default async function Ranking() {
  const { data, error } = await supabase
    .from("mst_tracks")
    .select(
      `track_id, 
        track_name, 
        preview_url,
        artist_names,
        mst_albums (name, album_image_url)`
    )
    .order("popularity", { ascending: false })
    .limit(100)
    .returns<TrackCardType[]>();
  // スケルトン的なダミーをかえす？
  if (error) return;

  const cards: TrackCardType[] = data.slice(0, 3);
  const listItems: TrackCardType[] = data.slice(3);

  return (
    <div>
      <div className={styles["cards-container"]}>
        {cards.map((track) => (
          <TrackCard key={track.track_id} track={track} />
        ))}
      </div>

    </div>
  );
}
