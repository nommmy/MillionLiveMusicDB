import { FC } from "react";
import commonStyles from "@/app/page.module.css";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import toolTipStyles from "@/app/components/character/CharacterIcon.module.css";
import List from "@mui/material/List";
import { supabase } from "@/utils/supabase";
import type { RankingCardType } from "../ranking/Ranking";
import TrackRelationListItem from "./TrackRelationListItem";
import styles from "./TrackRelation.module.css";

type Props = {
  characterIds: string[];
  excludeTrackId: string;
};

const TrackRelationList: FC<Props> = async ({
  characterIds,
  excludeTrackId,
}) => { 
  const { data, error } = await supabase
    .from("mst_tracks")
    .select(
      `track_id, 
        track_name, 
        preview_url,
        artist_names,
        artist_ids,
        mst_albums (name, album_image_url)`
    )
    .overlaps("artist_ids", characterIds)
    .neq("track_id", excludeTrackId)
    .order("popularity", { ascending: false })
    .returns<RankingCardType[]>();
  // スケルトン的なダミーをかえす？
  if (error) return;

  return (
    <div className={commonStyles["main-contents-wrapper"]}>
      <div className={styles["track-relation-header"]}>
        <h2>関連楽曲</h2>
        <div className={toolTipStyles["tooltip-top"]}>
          <HelpRoundedIcon sx={{ marginTop: "4px", fontSize: 28 }} />
          <span>メンバーが歌唱している他の楽曲</span>
        </div>
      </div>
      <List
        sx={{
          maxHeight: 350,
          position: "relative",
          overflow: "auto",
        }}
      >
        {data.map((track, index) => (
          <TrackRelationListItem key={index} track={track} />
        ))}
      </List>
    </div>
  );
};

export default TrackRelationList;
