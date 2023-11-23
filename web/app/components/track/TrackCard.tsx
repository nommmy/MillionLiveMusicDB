import Image from "next/image";
import styles from "./TrackCard.module.css";
import { TrackCardType } from "@/app/components/ranking/Ranking";
import { FC } from "react";

type Props = {
  track: TrackCardType;
  rank: number;
};

const TrackCard: FC<Props> = ({ track, rank }) => {
  const artistName = track.artist_names.join(",");
  return (
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
  );
};

export default TrackCard;
