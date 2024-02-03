import { FC } from "react";
import CharacterIconList from "@/app/components/UI/character/CharacterIconList";
import styles from "./TrackCard.module.css";
import type { CharacterType } from "@/utils/supabase";

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
        maxLength={11}
      />
    </div>
  );
};

export default TrackArtists;
