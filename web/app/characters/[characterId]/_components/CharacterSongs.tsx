import { FC } from "react";
import { supabase } from "@/utils/supabase";
import type { CharacterType } from "@/utils/supabase";
import TrackRelation from "@/app/components/UI/track/TrackRelation";
import styles from "../CharacterDetailPage.module.css";

type Props = {
  artistId: string;
};

const CharacterSongs: FC<Props> = async ({ artistId }) => {
  const { data, error } = await supabase
    .rpc("get_artists_info", {
      artist_ids: [artistId],
    })
    .returns<CharacterType[]>();
  // スケルトン的なダミーをかえす？
  if (error) return;
  const characterIds = data.map((character) => character.artist_id);

  return (
    <div className={styles["tracks-wrapper"]}>
      <TrackRelation characterIds={characterIds} excludeTrackIds={[]} />
    </div>
  );
};

export default CharacterSongs;
