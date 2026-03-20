import { supabase } from "@/utils/supabase";
import TrackListClient from "./TrackListClient";
import styles from "@/app/search/SearchPage.module.css";
import { cacheLife } from "next/cache";

const TrackListByCharacter = async () => {
  "use cache";
  cacheLife("weeks");
  const { data, error } = await supabase.rpc("get_hot_tracks", {
    limits: 999,
  });

  if (error || !data) return <></>;

  return (
    <div className={styles["track-list-container"]}>
      <TrackListClient tracks={data} />
    </div>
  );
};

export default TrackListByCharacter;
