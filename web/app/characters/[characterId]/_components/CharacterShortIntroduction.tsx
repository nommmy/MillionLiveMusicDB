import styles from "../CharacterDetailPage.module.css";
import { Database } from "@/database.types";
import { FC } from "react";

type CharacterType = Database["public"]["Tables"]["mst_characters"]["Row"];
type Props = {
  character: CharacterType;
};

const CharacterShortIntroduction: FC<Props> = ({ character }) => {
  const r = parseInt(character.color.substring(1, 3), 16);
  const g = parseInt(character.color.substring(3, 5), 16);
  const b = parseInt(character.color.substring(5, 7), 16);
  return (
    <p
      className={styles["profile-description"]}
      style={{ background: `rgba(${r},${g},${b},0.2)` }}
    >
      <span className={styles["profile-description-decoration"]} />
      {character.description}
    </p>
  );
};

export default CharacterShortIntroduction;
