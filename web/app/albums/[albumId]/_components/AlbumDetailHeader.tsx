import Image from "next/image";
import { FC } from "react";
import type { CharacterType } from "@/utils/supabase"; 
import styles from "../AlbumDetail.module.css";
import cardStyles from "@/app/components/track/TrackCard.module.css";

type Props = {
  name: string;
  imageUrl: string;
  characters: CharacterType[];
  artistNameArray: string[];
  releaseDate: string;
};

const AlbumDetailHeader: FC<Props> = ({
  name,
  imageUrl,
  characters,
  artistNameArray,
  releaseDate,
}) => {
  const artistName = artistNameArray.join(", ");

  return (
    <div className={styles["album-header-wrapper"]}>
      <Image width={200} height={200} alt={name} src={imageUrl} />
      <div className={cardStyles["track-card-right-content"]}>
        <p className={`${cardStyles["track-title"]} ${styles["flex-1"]}`}>{name}</p>
        <>
          <p className={cardStyles["track-sub-title"]}>{artistName}</p>
          <p className={cardStyles["track-sub-title"]}>{releaseDate}</p>
        </>
      </div>
    </div>
  );
};

export default AlbumDetailHeader;