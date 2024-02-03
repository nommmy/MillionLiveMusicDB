import { Suspense } from "react";
import Ranking from "./_components/ranking/Ranking";
import AlbumCardGrid from "./_components/album/AlbumCardGrid";
import CharacterGrid from "./_components/characters/CharacterGrid";
import RankingSkeleton from "./_components/ranking/RankingSkeleton";
import CharacterGridSkeleton from "./_components/characters/CharacterGridSkeleton";
import ListSkeleton from "./components/UI/skeleton/ListSkeleton";

export default async function Home() {
  return (
    <main className="main">
      <Suspense fallback={<RankingSkeleton />}>
        <Ranking />
      </Suspense>
      <Suspense fallback={<CharacterGridSkeleton />}>
        <CharacterGrid />
      </Suspense>
      <Suspense fallback={<ListSkeleton titleClass="title-h2" height={500} />}>
        <AlbumCardGrid />
      </Suspense>
    </main>
  );
}
