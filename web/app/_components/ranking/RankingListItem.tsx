import type { RankingTrackType } from "./Ranking";
import React, { FC } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CharacterIconList from "../../components/UI/character/CharacterIconList";
import styles from "./Ranking.module.css";
import Link from "next/link";
import PlayTrackButton from "@/app/components/UI/icon-button/PlayTrackButton";

type Props = {
  track: RankingTrackType;
  index: number;
};

const RankingListItem: FC<Props> = async ({ track, index = 1 }) => {
  const artistName = track.artist_names
    .map((character) => {
      const match = character.match(/^(.*?)\s*(?:\([^)]*\)|$)/);
      return match ? match[1] : character;
    })
    .join(", ");

  const SIZE = 35;

  return (
    <ListItem disablePadding>
      <ListItemButton className={styles["nested-links"]}>
        <Link
          href={`/tracks/${track.track_id}`}
          className={styles["stretched-link"]}
        >
          <span className={styles["list-index"]}>{index}</span>
          <PlayTrackButton
            title={track.track_name}
            src={track.preview_url}
            artistName={artistName}
            albumImage={track.album_image_url}
          />
          <ListItemText primary={track.track_name} secondary={artistName} />
        </Link>
        {track.artists && (
          <CharacterIconList
            artists={track.artists}
            imageColumn={"image_6th"}
            size={SIZE}
            innerLink="inner-link"
            maxLength={7}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default RankingListItem;
