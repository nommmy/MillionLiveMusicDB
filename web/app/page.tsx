import { Suspense } from "react";
import Ranking from "./_components/ranking/Ranking";
import Skeleton from "@mui/material/Skeleton";
import AlbumCardGrid from "./_components/album/AlbumCardGrid";
import CharacterGrid from "./_components/characters/CharacterGrid";

export default async function Home() {
  return (
    <main className="main">
      <Suspense fallback={<Skeleton animation="wave" />}>
        <Ranking />
      </Suspense>
      <Suspense fallback={<Skeleton animation="wave" />}>
        <CharacterGrid />
      </Suspense>
      <Suspense fallback={<Skeleton animation="wave" />}>
        <AlbumCardGrid />
      </Suspense>
    </main>
  );
}
