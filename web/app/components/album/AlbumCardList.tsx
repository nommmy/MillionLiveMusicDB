import { supabase } from "@/utils/supabase";
import AlbumCard from "./AlbumCard";
import styles from "./Album.module.css";
import commonStyles from "@/app/page.module.css"

export type AlbumCardType = {
  album_id: string;
  name: string;
  album_image_url: string;
};

export default async function AlbumCardList() {
  const { data, error } = await supabase
    .from("mst_albums")
    .select(`album_id, name, album_image_url`)
    .order("release_date", { ascending: true });
  // スケルトン的なダミーをかえす？
  if (error) return;

  return (
    <div className={commonStyles["main-contents-wrapper"]}>
      <h2 className={commonStyles["title-h2"]}>ALBUMS</h2>
      <div className={styles["album-card-grid"]}>
        {data.map((album) => (
          <AlbumCard key={album.album_id} album={album} />
        ))}
      </div>
    </div>
  );
}
