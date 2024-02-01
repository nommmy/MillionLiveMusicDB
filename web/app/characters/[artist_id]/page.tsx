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
import ListSkeleton from "@/app/components/UI/skeleton/ListSkeleton";
import { Metadata } from "next";
import { siteName, openGraphMeta, twitterMeta } from "@/utils/shared-metadata";

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
  if (error) return;

  return data;
}

export default async function CharacterDetailPage({ params }: Props) {
  const character = await fetchCharacter(params.artist_id);
  if (!character) return notFound();

  return (
    <main className="main">
      <CharacterDetailHeader character={character} />
      <CharacterShortIntroduction character={character} />
      <ImageSlider imgs={character.hero_images} />
      <CharacterProfile character={character} />
      <Suspense
        fallback={<ListSkeleton titleClass="normal-h2-skeleton" height={350} />}
      >
        <CharacterSongs artistId={character.artist_id} />
      </Suspense>
      <ComicGallery imgs={character.four_panel_comic_images} />
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const character = await fetchCharacter(params.artist_id);

  return {
    title: character?.character_name,
    openGraph: {
      ...openGraphMeta,
      title: `${character?.character_name} | ${siteName}`,
      images: character
        ? [...character.hero_images]
        : [
            "https://aupeferaibudquqmgdne.supabase.co/storage/v1/object/public/MillionLiveImageBucket/logo_large.webp",
          ],
    },
    twitter: {
      ...twitterMeta,
      title: `${character?.character_name} | ${siteName}`,
      card: "summary_large_image",
    },
  };
}
