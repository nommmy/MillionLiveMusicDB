import { supabase } from "@/utils/supabase";
import styles from "../SearchTracksByCharacterPage.module.css";
import CharacterButtonWrapper from "./CharacterButtonWrapper";
import type { CharacterType } from "@/utils/supabase";

const CharacterButtonPannel = async () => {
  const { data, error } = await supabase
    .from("mst_characters")
    .select(`artist_id, character_name, image_favorite, image_uniform, color`)
    .eq("unique_flg", true)
    .order("character_name", { ascending: true })
    .returns<CharacterType[]>();
  if (error) return <></>;

  return (
    <div className={styles["character-icon-grid"]}>
      <CharacterButtonWrapper characters={data} />
    </div>
  );
};

export default CharacterButtonPannel;
