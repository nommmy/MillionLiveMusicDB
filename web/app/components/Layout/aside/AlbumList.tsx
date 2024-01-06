import { supabase } from "@/utils/supabase";
import Link from "next/link";
import AsideListItem from "./AsideListItem";
import List from "@mui/material/List";

const AlbumList = async () => {
  const { data, error } = await supabase
    .from("mst_albums")
    .select(`album_id, name, album_image_url`)
    .order("release_date", { ascending: true });
  if (error) return <></>;

  return (
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
  );
};

export default AlbumList;
