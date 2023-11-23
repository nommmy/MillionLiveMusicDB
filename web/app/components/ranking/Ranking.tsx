import { supabase } from "@/utils/supabase";
import TrackCard from "../track/TrackCard";
import styles from "./Ranking.module.css";
import TrackList from "../track/TrackList";
import commonStyles from "@/app/page.module.css";

export type TrackCardType = {
  track_id: string;
  track_name: string;
  preview_url: string;
  artist_names: string[];
  artist_ids: string[];
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
        artist_ids,
        mst_albums (name, album_image_url)`
    )
    .order("popularity", { ascending: false })
    .limit(200)
    .returns<TrackCardType[]>();
  // スケルトン的なダミーをかえす？
  if (error) return;

  const HOT_DISPLAY_NUMBER = 3;
  const cards: TrackCardType[] = data.slice(0, HOT_DISPLAY_NUMBER);
  const listItems: TrackCardType[] = data.slice(HOT_DISPLAY_NUMBER);

  return (
    <div className={commonStyles["main-contents-wrapper"]}>
      <h2 className={commonStyles["title-h2"]}>HOT CHARTS</h2>
      <div className={styles["ranking-cards-container"]}>
        {cards.map((track, index) => (
          <TrackCard key={track.track_id} track={track} rank={index + 1} />
        ))}
      </div>
      <TrackList listItems={listItems} startIndex={HOT_DISPLAY_NUMBER} />
    </div>
  );
}
