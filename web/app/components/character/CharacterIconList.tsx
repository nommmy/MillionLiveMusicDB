import Image from "next/image";
import { CharacterType } from "../ranking/RankingList";
import { FC } from "react";
import styles from "./CharacterIcon.module.css";
import Link from "next/link";

type Props = {
  artists: CharacterType[];
  imageColumn: string;
  size: number;
};

const CharacterIconList: FC<Props> = ({ artists, imageColumn, size }) => {
  return (
    <div className={styles["character-icon-list"]}>
      {artists.map((artist) => (
        <Link key={artist.artist_id} href="">
          <Image
            width={size}
            height={size}
            alt={artist.character_name}
            src={(artist[imageColumn] as string) ?? artist.image_uniform}
            style={{
              border: `3px solid ${artist.color}`,
              borderRadius: "10px",
            }}
          />
        </Link>
      ))}
    </div>
  );
};

export default CharacterIconList;
