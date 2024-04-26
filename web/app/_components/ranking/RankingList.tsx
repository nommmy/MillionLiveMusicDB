import { FC } from "react";
import RankingListItem from "./RankingListItem";
import type { RankingTrackType } from "./Ranking";
import List from "@/app/components/UI/list/List";

type Props = {
  listItems: RankingTrackType[];
  startIndex: number;
};

const RankingList: FC<Props> = async ({ listItems, startIndex }) => {
  return (
    <List maxHeight={300}>
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
