import List from "@mui/material/List";
import AsideListItem from "./AsideListItem";
import { supabase } from "@/utils/supabase";
import Link from "next/link";

const CharacterList = async () => {
  const { data, error } = await supabase
    .from("mst_characters")
    .select(`artist_id, character_name, image_6th, image_uniform, color`)
    .eq("unique_flg", true)
    .order("character_name", { ascending: true });
  // スケルトン的なダミーをかえす？
  if (error) return;

  return (
    <div>
      <h4 className="title-h4 margin-left-little">Characters</h4>
      <List
        sx={{
          maxHeight: 500,
          overflow: "auto",
        }}
      >
        {data.map((character) => (
          <Link
            href={`/characters/${character.artist_id}`}
            key={character.character_name}
          >
            <AsideListItem
              name={character.character_name}
              img={character.image_6th ?? character.image_uniform}
            />
          </Link>
        ))}
      </List>
    </div>
  );
};

export default CharacterList;
