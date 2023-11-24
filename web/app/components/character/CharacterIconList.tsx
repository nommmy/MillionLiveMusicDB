import Image from "next/image";
import { CharacterType } from "../track/TrackList";
import { FC } from "react";
import styles from "./CharacterIcon.module.css";

type Props = {
  artists: CharacterType[];
};

const CharacterIconList: FC<Props> = ({ artists }) => {
  return (
    <div className={styles["character-icon-list"]}>
      {artists.map((artist) => (
        <Image
          key={artist.artist_id}
          width={35}
          height={35}
          alt={artist.character_name}
          src={artist.image_6th ?? artist.image_uniform}
          style={{
            border: `3px solid ${artist.color}`,
            borderRadius: "5px",
          }}
        />
      ))}
    </div>
  );
};

export default CharacterIconList;
