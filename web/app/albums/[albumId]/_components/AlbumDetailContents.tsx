import { FC } from "react";
import { supabase } from "@/utils/supabase";
import type { RankingCardType } from "@/app/components/ranking/Ranking";
import TrackList from "@/app/components/track/TrackList";
import { Suspense } from "react";
import Skeleton from "@mui/material/Skeleton";
import TrackRelation from "@/app/components/track/TrackRelation";
import styles from "../AlbumDetail.module.css";

type Props = {
  characterIds: string[];
  albumId: string;
};

const AlbumDetailContents: FC<Props> = async ({ characterIds, albumId }) => {
  // Album収録曲を取得
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

    .eq("album_id", albumId)
    .order("track_number", { ascending: true })
    .returns<RankingCardType[]>();
  // スケルトン的なダミーをかえす？
  if (error) return;

  // Album収録曲は関連楽曲から省く
  const excludeTrackIds = data.map((track) => track.track_id);

  return (
    <>
      <Suspense fallback={<Skeleton animation="wave" />}>
        <div className={styles["main-contents-wrapper"]}>
          {!!data.length && (
            <TrackList
              title="CD収録曲"
              description="CDに収録されている楽曲"
              data={data}
            />
          )}
        </div>
      </Suspense>
      <Suspense fallback={<Skeleton animation="wave" />}>
        <div className={styles["main-contents-wrapper"]}>
          <TrackRelation
            characterIds={characterIds}
            excludeTrackIds={excludeTrackIds}
          />
        </div>
      </Suspense>
    </>
  );
};

export default AlbumDetailContents;
