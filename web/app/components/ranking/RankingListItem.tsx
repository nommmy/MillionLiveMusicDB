import { RankingCardType } from "@/app/components/ranking/Ranking";
import { FC } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CharacterIconList from "../character/CharacterIconList";
import styles from "./Ranking.module.css";
import { CharacterType } from "./RankingList";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Link from "next/link";

type Props = {
  track: RankingCardType;
  characters: CharacterType[];
  index: number;
};

const RankingListItem: FC<Props> = async ({ track, characters, index = 1 }) => {
  const artists = characters.filter(
    (character) =>
      track.artist_ids.includes(character.artist_id) ||
      character.mst_units
        .map((unit) => unit.unit_id)
        .includes(track.artist_ids[0])
  );

  const artistName = track.artist_names
    .map((character) => {
      const match = character.match(/^(.*?)\s*(?:\([^)]*\)|$)/);
      return match ? match[1] : character;
    })
    .join(", ");
  
  const SIZE = 35;

  return (
    <Link href="">
      <ListItem
        disablePadding
        secondaryAction={
          <CharacterIconList
            artists={artists}
            imageColumn={"image_6th"}
            size={SIZE}
          />
        }
      >
        <ListItemButton>
          <span className={styles["list-index"]}>{index}</span>
          <PlayCircleIcon />
          <ListItemText
            primary={track.track_name}
            secondary={artistName}
            sx={{
              maxWidth: `calc(100% - ${SIZE * artists.length + 25}px - ${
                0.5 * artists.length
              }rem)`,
            }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default RankingListItem;
