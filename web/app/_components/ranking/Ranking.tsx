import { supabase } from "@/utils/supabase";
import RankingCard from "./RankingCard";
import styles from "./Ranking.module.css";
import RankingList from "./RankingList";
import type { TrackItemType } from "@/utils/supabase";

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
    .returns<TrackItemType[]>();
  // スケルトン的なダミーをかえす？
  if (error) return;

  const HOT_DISPLAY_NUMBER = 3;
  const cards: TrackItemType[] = data.slice(0, HOT_DISPLAY_NUMBER);
  const listItems: TrackItemType[] = data.slice(HOT_DISPLAY_NUMBER);

  return (
    <div className="main-contents-wrapper">
      <h2 className="title-h2">HOT CHARTS</h2>
      <div className={styles["ranking-cards-container"]}>
        {cards.map((track, index) => (
          <RankingCard key={track.track_id} track={track} rank={index + 1} />
        ))}
      </div>
      <RankingList listItems={listItems} startIndex={HOT_DISPLAY_NUMBER} />
    </div>
  );
}
