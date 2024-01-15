"use client";

import type { RankingTrackType } from "@/app/_components/ranking/Ranking";
import Image from "next/image";
import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import styles from "@/app/components/UI/track/TrackList.module.css";
import PlayTrackButton from "@/app/components/UI/icon-button/PlayTrackButton";

type Props = {
  track: RankingTrackType;
};

const TrackListItemClient = ({ track }:Props) => {
  const artistName = track.artist_names
    .map((character) => {
      const match = character.match(/^(.*?)\s*(?:\([^)]*\)|$)/);
      return match ? match[1] : character;
    })
    .join(", ");

  return (
    <Link href={`/tracks/${track.track_id}`}>
      <ListItem disablePadding>
        <ListItemButton className={styles["list-item-button"]}>
          <PlayTrackButton
            title={track.track_name}
            src={track.preview_url}
            artistName={artistName}
            albumImage={track.album_image_url}
          />
          <Image
            width={50}
            height={50}
            alt={track.album_name}
            src={track.album_image_url}
          />
          <ListItemText primary={track.track_name} secondary={artistName} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default TrackListItemClient;
