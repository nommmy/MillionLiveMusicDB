import List from "@mui/material/List";
import AsideListItem from "./AsideListItem";
import { supabase } from "@/utils/supabase";
import Link from "next/link";

const CharacterList = async () => {
  const { data, error } = await supabase
    .from("mst_characters")
    .select(`character_name, image_6th, image_uniform, color`)
    .order("character_name", { ascending: true });
  // スケルトン的なダミーをかえす？
  if (error) return;

  // キャラ名でUniqueなリストを取得
  const characters = Array.from(
    new Map(data.map((item) => [item.character_name, item])).values()
  );

  return (
    <div>
      <h3 className="title-h3 margin-left-little">Characters</h3>
      <List
        sx={{
          maxHeight: 500,
          overflow: "auto",
        }}
      >
        {characters.map((character) => (
          <Link
            href={`/characters/${character.character_name.replaceAll(
              /\s+/g,
              ""
            )}`}
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
