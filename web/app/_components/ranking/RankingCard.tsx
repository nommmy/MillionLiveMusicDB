import Image from "next/image";
import styles from "./Ranking.module.css";
import type { RankingTrackType } from "./Ranking";
import { FC } from "react";
import Link from "next/link";
import PlayTrackButton from "@/app/components/UI/icon-button/PlayTrackButton";

type Props = {
  track: RankingTrackType;
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
    <Link href={`/tracks/${track.track_id}`}>
      <div className={styles["card"]}>
        {rank == 1 && (
          <Image
            width={80}
            height={80}
            src="/ml_initial_logo.webp"
            alt={`${rank}`}
            className={styles["rank-number"]}
            priority={true}
          />
        )}
        <Image
          width={400}
          height={400}
          alt={track.album_name}
          src={track.album_image_url}
          className={styles["card-img"]}
          priority={true}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
        <PlayTrackButton title={track.track_name} src={track.preview_url} artistName={artistName} albumImage={track.album_image_url} additionalClassName="ranking-track-button" />
        <p className={styles["card-name"]}>{track.track_name}</p>
        <p className={styles["card-description"]}>{artistName}</p>
      </div>
    </Link>
  );
};

export default RankingCard;
