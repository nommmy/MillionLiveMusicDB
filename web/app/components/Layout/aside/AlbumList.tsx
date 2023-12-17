import { supabase } from "@/utils/supabase";
import Link from "next/link";
import AsideListItem from "./AsideListItem";
import List from "@mui/material/List";

const AlbumList = async () => {
  const { data, error } = await supabase
    .from("mst_albums")
    .select(`album_id, name, album_image_url`)
    .order("release_date", { ascending: true });
  // スケルトン的なダミーをかえす？
  if (error) return;

  return (
    <div>
      <h3 className="title-h3 margin-left-little">Albums</h3>
      <List
        sx={{
          maxHeight: 500,
          overflow: "auto",
        }}
      >
        {data.map((album) => (
          <Link href={`/albums/${album.album_id}`} key={album.album_id}>
            <AsideListItem name={album.name} img={album.album_image_url} />
          </Link>
        ))}
      </List>
    </div>
  );
};

export default AlbumList;
