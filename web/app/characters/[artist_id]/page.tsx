import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import { Database } from "@/database.types";
import CharacterProfile from "./_components/CharacterProfile";
import CharacterDetailHeader from "./_components/CharacterDetailHeader";
import ImageSlider from "./_components/ImageSlider";
import CharacterShortIntroduction from "./_components/CharacterShortIntroduction";
import ComicGallery from "./_components/ComicGallery";
import CharacterSongs from "./_components/CharacterSongs";
import { Suspense } from "react";
import Skeleton from "@mui/material/Skeleton";

type CharacterType = Database["public"]["Tables"]["mst_characters"]["Row"];
type Props = {
  params: { artist_id: string };
};

async function fetchCharacter(artist_id: string) {
  const { data, error } = await supabase
    .from("mst_characters")
    .select(
      `artist_id, 
        age, 
        birth_day,
        blood,
        character_name,
        character_voice,
        color,
        description,
        four_panel_comic_images,
        from,
        height,
        hero_icon,
        hero_images,
        hobby,
        like,
        sign,
        special,
        three_size,
        type,
        weight`
    )
    .eq("artist_id", artist_id)
    .returns<CharacterType[]>()
    .single();
  // スケルトン的なダミーをかえす？
  if (error) return;

  return data;
}

export default async function CharacterDetailPage({ params }: Props) {
  const character = await fetchCharacter(params.artist_id);
  if (!character) return notFound();

  return (
    <main className="main">
      <Suspense fallback={<Skeleton animation="wave" />}>
        <CharacterDetailHeader character={character} />
      </Suspense>
      <Suspense fallback={<Skeleton animation="wave" />}>
        <CharacterShortIntroduction character={character} />
      </Suspense>
      <Suspense fallback={<Skeleton animation="wave" />}>
        <ImageSlider imgs={character.hero_images} />
      </Suspense>
      <Suspense fallback={<Skeleton animation="wave" />}>
        <CharacterProfile character={character} />
      </Suspense>
      <Suspense fallback={<Skeleton animation="wave" />}>
        <CharacterSongs artistId={character.artist_id} />
      </Suspense>
      <Suspense fallback={<Skeleton animation="wave" />}>
        <ComicGallery imgs={character.four_panel_comic_images} />
      </Suspense>
    </main>
  );
}

export async function generateStaticParams(): Promise<any[]> {
  const { data, error } = await supabase
    .from("mst_characters")
    .select(`artist_id`)
    .eq("unique_flg", true);

  if (error) return [];

  return data;
}
