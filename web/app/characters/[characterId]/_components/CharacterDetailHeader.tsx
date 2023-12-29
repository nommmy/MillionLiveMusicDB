import styles from "../CharacterDetailPage.module.css";
import { Database } from "@/database.types";
import { FC } from "react";
import Image from "next/image";

type CharacterType = Database["public"]["Tables"]["mst_characters"]["Row"];
type Props = {
  character: CharacterType;
};

const CharacterDetailHeader: FC<Props> = ({ character }) => {
  const typeImgPath =
    character.type === "Fairy"
      ? "/logo_fairy.webp"
      : character.type === "Princess"
      ? "/logo_princess.webp"
      : character.type === "Angel"
      ? "/logo_angel.webp"
      : "/logo_ex.webp";
  return (
    <>
      <div
        style={{
          background: `linear-gradient(to bottom, ${character.color} 0%, white 100%)`,
          height: "250px",
        }}
      />
      <div className={styles["character-detail-header"]}>
        <Image
          width={200}
          height={200}
          alt={character.character_name}
          src={character.hero_icon}
          style={{
            border: `8px solid ${character.color}`,
            borderRadius: "50%",
          }}
        />
        <div className={styles["character-name-container"]}>
          <h2 className={styles["character-name"]}>
            {character.character_name}
          </h2>
          <p className={styles["cv-name"]}>cv. {character.character_voice}</p>
        </div>
        <Image width={80} height={80} alt="type" src={typeImgPath} />
      </div>
    </>
  );
};
export default CharacterDetailHeader;
