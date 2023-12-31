import Image from "next/image";
import type { CharacterType } from "@/utils/supabase";
import { FC } from "react";
import Link from "next/link";

type Props = {
  artist: CharacterType;
  imageColumn: string;
  size: number;
};

const CharacterIcon: FC<Props> = ({ artist, imageColumn, size }) => (
  <Link key={artist.artist_id} href={`/characters/${artist.artist_id}`}>
    <Image
      width={size}
      height={size}
      alt={artist.character_name}
      src={(artist[imageColumn] as string) ?? artist.image_uniform}
      style={{
        border: `3px solid ${artist.color}`,
        borderRadius: "10px",
      }}
    />
  </Link>
);

export default CharacterIcon;
