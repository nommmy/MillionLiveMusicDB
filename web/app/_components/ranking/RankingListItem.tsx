import type { RankingTrackType } from "./Ranking";
import React, { FC } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CharacterIconList from "../../components/UI/character/CharacterIconList";
import styles from "./Ranking.module.css";
import type { CharacterType } from "@/utils/supabase";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Link from "next/link";

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
          <PlayCircleIcon sx={{ fontSize: 30 }} />
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
