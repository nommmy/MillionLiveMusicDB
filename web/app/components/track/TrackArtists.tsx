import { supabase } from "@/utils/supabase";
import { FC } from "react";
import CharacterIconList from "../character/CharacterIconList";
import styles from "./TrackCard.module.css";

type Props = {
  artistIds: string[];
};

const TrackArtists: FC<Props> = async ({ artistIds }) => {
  const { data, error } = await supabase.rpc("get_track_artists", {
    artist_ids: artistIds,
  });

  // スケルトン的なダミーをかえす？
  if (error) return;

  return (
    <div className={styles["track-artist-icons"]}>
      <CharacterIconList
        artists={data}
        imageColumn={"image_favorite"}
        size={50}
      />
    </div>
  );
};

export default TrackArtists;
