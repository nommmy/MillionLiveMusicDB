import styles from "./TrackCard.module.css";
import Image from "next/image";
import { FC } from "react";
import TrackArtists from "./TrackArtists";
import PlayTrackButton from "@/app/components/UI/icon-button/PlayTrackButton";
import type { CharacterType } from "@/utils/supabase";
import SubscribeSpeedDial from "@/app/components/UI/track/SubscribeSpeedDial";
import Link from "next/link";

type Props = {
  name: string;
  imageUrl: string;
  albumId: string;
  albumName: string;
  characters: CharacterType[];
  artistNameArray: string[];
  previewUrl: string;
};

const TrackCard: FC<Props> = ({
  name,
  imageUrl,
  albumId,
  albumName,
  characters,
  artistNameArray,
  previewUrl,
}) => {
  const artistName = artistNameArray
    .map((character) => {
      const match = character.match(/^(.*?)\s*(?:\([^)]*\)|$)/);
      return match ? match[1] : character;
    })
    .join(", ");

  return (
    <div className={styles["track-card-relative"]}>
      <div className={styles["track-card"]}>
        <div className={styles["track-card-header"]}>
          <Link
            href={`/albums/${albumId}`}
            className={styles["track-album-img-link"]}
          >
            <Image
              width={160}
              height={160}
              alt={name}
              src={imageUrl}
              className={styles["track-album-img"]}
              priority={true}
            />
          </Link>
          <TrackArtists characters={characters} />
        </div>
        <div className={styles["track-card-right-content"]}>
          <div className={styles["track-names-container"]}>
            <p className={styles["track-title"]}>{name}</p>
            <p className={styles["track-sub-title"]}>{artistName}</p>
            <Link href={`/albums/${albumId}`}>
              <p className={styles["track-sub-title"]}>{albumName}</p>
            </Link>
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
