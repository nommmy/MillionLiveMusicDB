import { FC } from "react";
import List from "@mui/material/List";
import TrackListItem from "../track/TrackListItem";
import { TrackCardType } from "@/app/components/ranking/Ranking";
import { supabase } from "@/utils/supabase";

type Props = {
  listItems: TrackCardType[];
  startIndex: number;
};

type UnitsType = {
  unit_id: string
}
export type CharacterType = {
  artist_id: string;
  character_name: string;
  image_6th: string;
  image_favorite: string;
  image_uniform: string;
  color: string;
  mst_units: UnitsType[];
};

const TrackList: FC<Props> = async ({ listItems, startIndex }) => {
  const { data, error } = await supabase
    .from("mst_characters")
    .select(
      `artist_id, character_name, image_6th, image_favorite, image_uniform, color, mst_units (unit_id)`
    );
  // スケルトン的なダミーをかえす？
  if (error) return;

  return (
    <List
      sx={{
        maxHeight: 300,
        position: "relative",
        overflow: "auto",
      }}
    >
      {listItems.map((track, index) => (
        <TrackListItem
          key={track.track_id}
          track={track}
          characters={data}
          index={startIndex + index + 1}
        />
      ))}
    </List>
  );
};
export default TrackList;
