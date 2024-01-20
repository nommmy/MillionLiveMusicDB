"use client";

import { PrimitiveAtom, useAtom } from "jotai";
import Image from "next/image";
import type { CharacterType } from "@/utils/supabase";

type Props = {
  character: CharacterType;
  characterIdAtom: PrimitiveAtom<string>;
};

const CharacterButton = ({ character, characterIdAtom }: Props) => {
  const [characterId, setCharacterId] = useAtom(characterIdAtom);

  const handleClick = () => {
    characterId == ""
      ? setCharacterId(character.artist_id)
      : setCharacterId("");
  };

  return (
    <Image
      width={65}
      height={65}
      alt={character.character_name}
      className="character-icon"
      src={character.image_favorite ?? character.image_uniform}
      style={{
        border: `3px solid ${character.color}`,
        opacity: characterId == "" ? 1 : 0.5,
      }}
      onClick={() => handleClick()}
    />
  );
};

export default CharacterButton;
