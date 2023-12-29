import { FC } from "react";
import List from "@mui/material/List";
import RankingListItem from "./RankingListItem";
import { RankingCardType } from "@/app/_components/ranking/Ranking";
import { supabase } from "@/utils/supabase";

type Props = {
  listItems: RankingCardType[];
  startIndex: number;
};

const RankingList: FC<Props> = async ({ listItems, startIndex }) => {
  const { data, error } = await supabase
    .from("mst_characters")
    .select(
      `artist_id, character_name, image_6th, image_favorite, image_uniform, color, unique_flg, mst_units (unit_id)`
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
        <RankingListItem
          key={track.track_id}
          track={track}
          characters={data}
          index={startIndex + index + 1}
        />
      ))}
    </List>
  );
};
export default RankingList;
