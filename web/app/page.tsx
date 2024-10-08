import Ranking from "./_components/ranking/Ranking";
import AlbumCardGrid from "./_components/album/AlbumCardGrid";
import CharacterGrid from "./_components/characters/CharacterGrid";

export default async function Home() {
  return (
    <main className="main">
      <Ranking />
      <CharacterGrid />
      <AlbumCardGrid />
    </main>
  );
}
