import { supabase } from "@/utils/supabase";
import styles from "../SearchTracksByCharacterPage.module.css";
import CharacterButton from "./CharacterButton";
import type { CharacterType } from "@/utils/supabase";

const CharacterButtonGrid = async () => {
  const { data, error } = await supabase
    .from("mst_characters")
    .select(`artist_id, character_name, image_favorite, image_uniform, color`)
    .eq("unique_flg", true)
    .order("character_name", { ascending: true })
    .returns<CharacterType[]>();
  if (error) return <></>;

  return (
    <div className={styles["character-icon-grid"]}>
      <CharacterButton characters={data} />
    </div>
  );
};

export default CharacterButtonGrid;
