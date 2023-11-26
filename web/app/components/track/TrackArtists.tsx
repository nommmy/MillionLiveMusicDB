import { supabase } from "@/utils/supabase";
import { FC } from "react";
import CharacterIconList from "../character/CharacterIconList";
import styles from "./TrackCard.module.css";
import type { CharacterType } from "../ranking/RankingList";

type Props = {
  characters: CharacterType[];
};

const TrackArtists: FC<Props> = async ({ characters }) => {
  return (
    <div className={styles["track-artist-icons"]}>
      <CharacterIconList
        artists={characters}
        imageColumn={"image_favorite"}
        size={50}
      />
    </div>
  );
};

export default TrackArtists;
