import styles from "./page.module.css";
import { Suspense } from "react";
import Ranking from "./components/ranking/Ranking";
import Skeleton from "@mui/material/Skeleton";
import AlbumCardList from "./components/album/AlbumCardGrid";
import CharacterGrid from "./components/character/CharacterGrid";

export default async function Home() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<Skeleton animation="wave" />}>
        <Ranking />
      </Suspense>{" "}
      <Suspense fallback={<Skeleton animation="wave" />}>
        <CharacterGrid />
      </Suspense>
      <Suspense fallback={<Skeleton animation="wave" />}>
        <AlbumCardList />
      </Suspense>
    </main>
  );
}
