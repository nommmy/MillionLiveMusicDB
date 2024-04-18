import { supabase } from "@/utils/supabase";
import styles from "./CharacterGrid.module.css";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import CharacterGridSkeleton from "./CharacterGridSkeleton";

export default async function CharacterGrid() {
  const { data, error } = await supabase
    .from("mst_characters")
    .select(`artist_id, character_name, image_favorite, image_uniform, color`)
    .eq("unique_flg", true)
    .order("character_name", { ascending: true });
  if (error) return <></>;

  return (
    <div className="main-contents-wrapper">
      <h2 className="title-h2">CHARACTERS</h2>
      <Suspense fallback={<CharacterGridSkeleton />}>
        <div className={styles["character-icon-grid"]}>
          {data.map((character, index) => (
            <Link key={index} href={`/characters/${character.artist_id}`}>
              <div className="tooltip-top">
                <Image
                  width={60}
                  height={60}
                  alt={character.character_name}
                  className="character-icon"
                  src={character.image_favorite ?? character.image_uniform}
                  style={{
                    border: `3px solid ${character.color}`,
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
      </Suspense>
    </div>
  );
}
