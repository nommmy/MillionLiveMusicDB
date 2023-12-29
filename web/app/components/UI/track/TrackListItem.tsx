import { FC } from "react";
import type { TrackItemType } from "@/utils/supabase";
import Image from "next/image";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./TrackList.module.css";

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
    <Link href={`/tracks/${track.track_id}`}>
      <ListItem disablePadding secondaryAction={<FavoriteBorderIcon />}>
        <ListItemButton className={styles["list-item-button"]}>
          <PlayCircleIcon sx={{ fontSize: 30 }} />
          <Image
            width={50}
            height={50}
            alt={track.mst_albums.name}
            src={track.mst_albums.album_image_url}
          />
          <ListItemText primary={track.track_name} secondary={artistName} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default TrackListItem;
