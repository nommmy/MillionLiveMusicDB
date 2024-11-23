import { supabase } from "@/utils/supabase";
import styles from "@/app/search/SearchPage.module.css";
import TrackListClient from "./TrackListClient";
import type { TrackFeaturesType } from "@/utils/supabase";

export const revalidate = 86400;
const TrackListByFeature = async () => {
  const { data, error } = await supabase
    .from("mst_tracks")
    .select(
      `track_id, 
        track_name, 
        preview_url,
        artist_names,
        artist_ids,
        duration_ms,
        acousticness,
        danceability,
        energy,
        instrumentalness,
        speechiness,
        key,
        valence,
        tempo,
        mst_albums (name, album_image_url)`
    )
    .order("popularity", { ascending: false })
    .returns<TrackFeaturesType[]>();

  if (error) return <></>;

  return (
    <div className={styles["track-list-container"]}>
      <TrackListClient tracks={data} />
    </div>
  );
};

export default TrackListByFeature;
