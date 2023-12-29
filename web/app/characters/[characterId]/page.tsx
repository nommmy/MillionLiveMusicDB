import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import { Database } from "@/database.types";
import CharacterProfile from "./_components/CharacterProfile";
import CharacterDetailHeader from "./_components/CharacterDetailHeader";
import ImageSlider from "./_components/ImageSlider";
import CharacterShortIntroduction from "./_components/CharacterShortIntroduction";

type CharacterType = Database["public"]["Tables"]["mst_characters"]["Row"];
type Props = {
  params: { characterId: string };
};

async function fetchCharacter(characterId: string) {
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
    .eq("artist_id", characterId)
    .returns<CharacterType[]>()
    .single();
  // スケルトン的なダミーをかえす？
  if (error) return;

  return data;
}

export default async function CharacterDetailPage({ params }: Props) {
  const character = await fetchCharacter(params.characterId);
  if (!character) return notFound();

  return (
    <main className="main">
      <CharacterDetailHeader character={character} />
      <CharacterShortIntroduction character={character} />
      <ImageSlider imgs={character.hero_images} />
      <CharacterProfile character={character} />
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
