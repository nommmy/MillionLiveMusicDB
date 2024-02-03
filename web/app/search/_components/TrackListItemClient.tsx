"use client";

import type { RankingTrackType } from "@/app/_components/ranking/Ranking";
import type { TrackFeaturesType } from "@/utils/supabase";
import Image from "next/image";
import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import styles from "@/app/components/UI/track/TrackList.module.css";
import PlayTrackButton from "@/app/components/UI/icon-button/PlayTrackButton";
import SubscribeSpeedDial from "@/app/components/UI/track/SubscribeSpeedDial";

type Props = {
  track: RankingTrackType | TrackFeaturesType;
  albumImageUrl: string;
  albumName: string;
};

const TrackListItemClient = ({ track, albumImageUrl, albumName }: Props) => {
  const artistName = track.artist_names
    .map((character) => {
      const match = character.match(/^(.*?)\s*(?:\([^)]*\)|$)/);
      return match ? match[1] : character;
    })
    .join(", ");

  return (
    <ListItem disablePadding>
      <ListItemButton
        className={`${styles["nested-links"]} simple-track-list-item`}
      >
        <Link
          href={`/tracks/${track.track_id}`}
          className={styles["stretched-link"]}
        >
          <PlayTrackButton
            title={track.track_name}
            src={track.preview_url}
            artistName={artistName}
            albumImage={albumImageUrl}
          />
          <Image width={50} height={50} alt={albumName} src={albumImageUrl} />
          <ListItemText primary={track.track_name} secondary={artistName} />
        </Link>
        <div className={styles["inner-link"]}>
          <SubscribeSpeedDial trackName={track.track_name} direction="left" />
        </div>
      </ListItemButton>
    </ListItem>
  );
};

export default TrackListItemClient;
