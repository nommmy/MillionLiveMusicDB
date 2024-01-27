import styles from "./TrackCard.module.css";
import Image from "next/image";
import { FC } from "react";
import TrackArtists from "./TrackArtists";
import PlayTrackButton from "@/app/components/UI/icon-button/PlayTrackButton";
import type { CharacterType } from "@/utils/supabase";
import SubscribeSpeedDial from "@/app/components/UI/track/SubscribeSpeedDial";

type Props = {
  name: string;
  imageUrl: string;
  albumName: string;
  characters: CharacterType[];
  artistNameArray: string[];
  previewUrl: string;
};

const TrackCard: FC<Props> = ({
  name,
  imageUrl,
  albumName,
  characters,
  artistNameArray,
  previewUrl,
}) => {
  const artistName = artistNameArray.join(", ");
  return (
    <div className={styles["track-card-relative"]}>
      <div className={styles["track-card"]}>
        <TrackArtists characters={characters} />
        <Image
          width={160}
          height={160}
          alt={name}
          src={imageUrl}
          priority={true}
        />
        <div className={styles["track-card-right-content"]}>
          <div className={styles["track-names-container"]}>
            <p className={styles["track-title"]}>{name}</p>
            <p className={styles["track-sub-title"]}>{artistName}</p>
            <p className={styles["track-sub-title"]}>{albumName}</p>
          </div>
          <div className={styles["function-icon-list"]}>
            <PlayTrackButton
              title={name}
              src={previewUrl}
              artistName={artistName}
              albumImage={imageUrl}
              additionalClassName="track-card-play-button"
            />
            <SubscribeSpeedDial trackName={name} direction="right" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
