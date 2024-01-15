import { supabase } from "@/utils/supabase";
import TrackListClient from "./TrackListClient";
import styles from "../SearchTracksByCharacterPage.module.css";

const TrackListByCharacter = async () => {
  const { data, error } = await supabase.rpc("get_hot_tracks", {
    limits: 999,
  });

  if (error) return <></>;

  return (
    <div className={styles["track-list-container"]}>
      <TrackListClient tracks={data} />
    </div>
  );
};

export default TrackListByCharacter;
