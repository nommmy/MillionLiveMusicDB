import { supabase } from "@/utils/supabase";
import RankingCard from "./RankingCard";
import styles from "./Ranking.module.css";
import RankingList from "./RankingList";
import type { CharacterType } from "@/utils/supabase";
import Skeleton from "@/app/components/UI/skeleton/Skeleton";
import RankingCardSkeleton from "./RankingCardSkeleton";
import { Suspense } from "react";

export type RankingTrackType = {
  track_id: string;
  track_name: string;
  preview_url: string;
  artist_names: string[];
  artist_ids: string[];
  album_name: string;
  album_image_url: string;
  artists: CharacterType[] | null;
};

const HOT_DISPLAY_NUMBER = 3;

export const revalidate = 86400;
export default async function Ranking() {
  const { data, error } = await supabase
    .rpc("get_hot_tracks", {
      limits: 99,
    })
    .returns<RankingTrackType[]>();

  if (error) return <></>;

  const cards: RankingTrackType[] = data.slice(0, HOT_DISPLAY_NUMBER);
  const listItems: RankingTrackType[] = data.slice(HOT_DISPLAY_NUMBER);

  return (
    <div className="main-contents-wrapper">
      <h2 className="title-h2">HOT CHARTS</h2>
      <Suspense fallback={<RankingCardSkeleton />}>
        <div className={styles["ranking-cards-container"]}>
          {cards.map((track, index) => (
            <RankingCard key={track.track_id} track={track} rank={index + 1} />
          ))}
        </div>
      </Suspense>
      <Suspense fallback={<Skeleton additionalClass="list-skeleton-300" />}>
        <RankingList listItems={listItems} startIndex={HOT_DISPLAY_NUMBER} />
      </Suspense>
    </div>
  );
}
