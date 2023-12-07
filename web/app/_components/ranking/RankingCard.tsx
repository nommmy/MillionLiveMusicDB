import Image from "next/image";
import styles from "./Ranking.module.css";
import { RankingCardType } from "@/app/_components/ranking/Ranking";
import { FC } from "react";
import Link from "next/link";

type Props = {
  track: RankingCardType;
  rank: number;
};

const RankingCard: FC<Props> = ({ track, rank }) => {
  const artistName = track.artist_names
    .map((character) => {
      const match = character.match(/^(.*?)\s*(?:\([^)]*\)|$)/);
      return match ? match[1] : character;
    })
    .join(", ");
  return (
    <Link href="">
      <div className={styles["card"]}>
        <span className={styles["rank-number"]}>{rank}</span>
        <Image
          width={400}
          height={400}
          alt={track.mst_albums.name}
          src={track.mst_albums.album_image_url}
          className={styles["card-img"]}
          style={{
            width: "100%",
            height: "auto",
          }}
        />

        <p className={styles["card-name"]}>{track.track_name}</p>
        <p className={styles["card-description"]}>{artistName}</p>
      </div>
    </Link>
  );
};

export default RankingCard;
