import { supabase } from "@/utils/supabase";
import AlbumCard from "./AlbumCard";
import styles from "./Album.module.css";
import List from "@mui/material/List";

export type AlbumCardType = {
  album_id: string;
  name: string;
  album_image_url: string;
};

export default async function AlbumCardGrid() {
  const { data, error } = await supabase
    .from("mst_albums")
    .select(`album_id, name, album_image_url`)
    .order("release_date", { ascending: true });
  // スケルトン的なダミーをかえす？
  if (error) return;

  return (
    <div className="main-contents-wrapper">
      <h2 className="title-h2">ALBUMS</h2>
      <List
        sx={{
          maxHeight: 500,
          position: "relative",
          overflow: "auto",
        }}
      >
        <div className={styles["album-card-grid"]}>
          {data.map((album) => (
            <AlbumCard key={album.album_id} album={album} />
          ))}
        </div>
      </List>
    </div>
  );
}
