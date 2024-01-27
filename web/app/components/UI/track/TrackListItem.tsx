import { FC } from "react";
import type { TrackItemType } from "@/utils/supabase";
import Image from "next/image";
import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import styles from "./TrackList.module.css";
import PlayTrackButton from "../icon-button/PlayTrackButton";
import SubscribeSpeedDial from "./SubscribeSpeedDial";

type Props = {
  track: TrackItemType;
};

const TrackListItem: FC<Props> = ({ track }) => {
  const artistName = track.artist_names
    .map((character) => {
      const match = character.match(/^(.*?)\s*(?:\([^)]*\)|$)/);
      return match ? match[1] : character;
    })
    .join(", ");

  return (
    <ListItem disablePadding>
      <ListItemButton className={styles["nested-links"]}>
        <Link
          href={`/tracks/${track.track_id}`}
          className={styles["stretched-link"]}
        >
          <PlayTrackButton
            title={track.track_name}
            src={track.preview_url}
            artistName={artistName}
            albumImage={track.mst_albums.album_image_url}
          />
          <Image
            width={50}
            height={50}
            alt={track.mst_albums.name}
            src={track.mst_albums.album_image_url}
          />
          <ListItemText primary={track.track_name} secondary={artistName} />
        </Link>
        <div className={styles["inner-link"]}>
          <SubscribeSpeedDial trackName={track.track_name} direction="left" />
        </div>
      </ListItemButton>
    </ListItem>
  );
};

export default TrackListItem;
