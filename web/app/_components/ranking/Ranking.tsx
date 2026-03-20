import { supabase } from "@/utils/supabase";
import RankingCard from "./RankingCard";
import styles from "./Ranking.module.css";
import RankingList from "./RankingList";
import type { CharacterType } from "@/utils/supabase";
import Skeleton from "@/app/components/UI/skeleton/Skeleton";
import RankingCardSkeleton from "./RankingCardSkeleton";
import { Suspense } from "react";
import { cacheLife } from "next/cache";

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

export default async function Ranking() {
  "use cache";
  cacheLife("days");

  const { data, error } = await supabase
    .rpc("get_daily_tracks", { limits: 30 })
    .returns<RankingTrackType[]>();

  if (error || !data || !Array.isArray(data)) return <></>;

  const cards: RankingTrackType[] = data.slice(0, HOT_DISPLAY_NUMBER);
  const listItems: RankingTrackType[] = data.slice(HOT_DISPLAY_NUMBER);

  return (
    <div className="main-contents-wrapper">
      <h2 className="title-h2">TODAY&apos;S <span className={styles["picks-number"]}>30</span> PICKS</h2>
      <Suspense fallback={<RankingCardSkeleton />}>
        <div className={styles["ranking-cards-container"]}>
          {cards.map((track) => (
            <RankingCard key={track.track_id} track={track} />
          ))}
        </div>
      </Suspense>
      <Suspense fallback={<Skeleton additionalClass="list-skeleton-300" />}>
        <RankingList listItems={listItems} startIndex={HOT_DISPLAY_NUMBER} />
      </Suspense>
    </div>
  );
}
