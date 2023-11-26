import { FC } from "react";
import type { RankingCardType } from "../ranking/Ranking";
import Image from "next/image";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./TrackRelation.module.css";

type Props = {
  track: RankingCardType;
};

const TrackRelationListItem: FC<Props> = ({ track }) => {
  const artistName = track.artist_names
    .map((character) => {
      const match = character.match(/^(.*?)\s*(?:\([^)]*\)|$)/);
      return match ? match[1] : character;
    })
    .join(", ");
  return (
    <Link href="">
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

export default TrackRelationListItem;
