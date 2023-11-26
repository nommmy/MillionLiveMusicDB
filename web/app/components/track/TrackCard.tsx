import styles from "./TrackCard.module.css";
import Image from "next/image";
import { FC } from "react";
import TrackArtists from "./TrackArtists";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { CharacterType } from "../ranking/RankingList";

type Props = {
  name: string;
  imageUrl: string;
  albumName: string;
  characters: CharacterType[];
  artistNameArray: string[];
};

const TrackCard: FC<Props> = ({
  name,
  imageUrl,
  albumName,
  characters,
  artistNameArray,
}) => {
  const artistName = artistNameArray.join(", ");
  return (
    <div className={styles["track-card-fixed"]}>
      <div className={styles["track-card"]}>
        <TrackArtists characters={characters} />
        <Image width={160} height={160} alt={name} src={imageUrl} />
        <div className={styles["track-card-right-content"]}>
          <div className={styles["track-names-container"]}>
            <p className={styles["track-title"]}>{name}</p>
            <p className={styles["track-sub-title"]}>{artistName}</p>
            <p className={styles["track-sub-title"]}>{albumName}</p>
          </div>
          <div className={styles["function-icon-list"]}>
            <PlayCircleIcon fontSize="large" />
            <FavoriteBorderIcon fontSize="large" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
