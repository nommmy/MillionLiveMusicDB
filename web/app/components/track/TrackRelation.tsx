import { FC } from "react";
import { supabase } from "@/utils/supabase";
import type { RankingCardType } from "../ranking/Ranking";
import TrackList from "./TrackList";

type Props = {
  characterIds: string[];
  excludeTrackId: string;
};

const TrackRelation: FC<Props> = async ({ characterIds, excludeTrackId }) => {
  // 歌唱メンバーの他楽曲を取得
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
    <>
      {!!data.length && (
        <TrackList
          title="関連楽曲"
          description="メンバーが歌唱している他の楽曲"
          data={data}
        />
      )}
    </>
  );
};

export default TrackRelation;
