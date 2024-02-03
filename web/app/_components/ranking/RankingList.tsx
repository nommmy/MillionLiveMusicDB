import { FC } from "react";
import List from "@mui/material/List";
import RankingListItem from "./RankingListItem";
import type { RankingTrackType } from "./Ranking";

type Props = {
  listItems: RankingTrackType[];
  startIndex: number;
};

const RankingList: FC<Props> = async ({ listItems, startIndex }) => {
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
          index={startIndex + index + 1}
        />
      ))}
    </List>
  );
};
export default RankingList;
