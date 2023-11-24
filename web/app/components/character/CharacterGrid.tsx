import { supabase } from "@/utils/supabase";
import commonStyles from "@/app/page.module.css";
import styles from "./CharacterIcon.module.css";
import Image from "next/image";
import Link from "next/link";

export default async function CharacterGrid() {
  const { data, error } = await supabase
    .from("mst_characters")
    .select(`character_name, image_6th, image_favorite, image_uniform, color`)
    .order("character_name", { ascending: true });
  // スケルトン的なダミーをかえす？
  if (error) return;

  const characters = Array.from(
    new Map(data.map((item) => [item.character_name, item])).values()
  );

  return (
    <div className={commonStyles["main-contents-wrapper"]}>
      <h2 className={commonStyles["title-h2"]}>CHARACTERS</h2>
      <div className={styles["character-icon-grid"]}>
        {characters.map((character, index) => (
          <Link key={index} href="">
            <div className={styles["tooltip-top"]}>
              <Image
                width={60}
                height={60}
                alt={character.character_name}
                src={character.image_favorite ?? character.image_uniform}
                style={{
                  border: `3px solid ${character.color}`,
                  borderRadius: "10px",
                }}
              />
              <span
                style={{
                  background: character.color,
                }}
              >
                <span
                  style={{
                    color: character.color,
                    filter: "invert(100%) grayscale(100%) contrast(100)",
                  }}
                >
                  {character.character_name}
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
