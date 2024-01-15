import { Suspense } from "react";
import CharacterButtonGrid from "./_components/CharacterButtonGrid";
import TrackListByCharacter from "./_components/TrackListByCharacter";
import CharacterButtonGridSkeleton from "./_components/CharacterButtonGridSkeleton";
import Skeleton from "@/app/components/UI/skeleton/Skeleton";
import styles from "./SearchTracksByCharacterPage.module.css";

export default function SearchTracksByCharacterPage() {
  return (
    <main className="main">
      <h2 className={styles["search-by-character-title"]}>
        キャラクターから楽曲を探す
      </h2>
      <Suspense fallback={<CharacterButtonGridSkeleton />}>
        <CharacterButtonGrid />
      </Suspense>
      <Suspense
        fallback={
          <Skeleton additionalClass="list-skeleton-500 skeleton-margin" />
        }
      >
        <TrackListByCharacter />
      </Suspense>
    </main>
  );
}
