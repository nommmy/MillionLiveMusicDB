"use client";

import type { CharacterType } from "@/utils/supabase";
import { characterIdAtomsInAtom } from "@/app/components/Provider/Providers";
import { useAtomValue} from "jotai";
import CharacterButton from "./CharacterButton";

type Props = {
  characters: CharacterType[];
};

const CharacterButtonWrapper = ({ characters }: Props) => {
  const characterIds = useAtomValue(characterIdAtomsInAtom);

  return (
    <>
      {characters.map((character, index) => (
        <div className="tooltip-top" key={index}>
          <CharacterButton
            character={character}
            characterIdAtom={characterIds[index]}
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
      ))}
    </>
  );
};

export default CharacterButtonWrapper;
