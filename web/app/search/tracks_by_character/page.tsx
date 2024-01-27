import { Suspense } from "react";
import CharacterButtonPannel from "./_components/CharacterButtonPannel";
import TrackListByCharacter from "./_components/TrackListByCharacter";
import CharacterButtonGridSkeleton from "./_components/CharacterButtonGridSkeleton";
import Skeleton from "@/app/components/UI/skeleton/Skeleton";
import styles from "@/app/search/SearchPage.module.css";

export default function SearchTracksByCharacterPage() {
  return (
    <main className="main">
      <h2 className={styles["search-by-character-title"]}>
        キャラクターから楽曲を探す
      </h2>
      <Suspense fallback={<CharacterButtonGridSkeleton />}>
        <CharacterButtonPannel />
      </Suspense>
      <Suspense
        fallback={
          <Skeleton additionalClass="list-skeleton-500-without-width skeleton-margin" />
        }
      >
        <TrackListByCharacter />
      </Suspense>
    </main>
  );
}
