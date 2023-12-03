import { FC } from "react";
import { supabase } from "@/utils/supabase";
import TrackList from "./TrackList";
import type { RankingCardType } from "../ranking/Ranking";
import { sortSimilarityTop100, normalizeTempo } from "@/utils/calc_similarity";

type Props = {
  excludeTrackId: string;
  acousticness: number;
  danceability: number;
  energy: number;
  valence: number;
  tempo: number;
};

export type TrackType = RankingCardType & {
  acousticness: number;
  danceability: number;
  energy: number;
  valence: number;
  tempo: number;
};

const TrackSimilar: FC<Props> = async ({
  excludeTrackId,
  acousticness,
  danceability,
  energy,
  valence,
  tempo,
}) => {
  // 楽曲分析に基づく類似楽曲を取得
  const { data, error } = await supabase
    .from("mst_tracks")
    .select(
      `track_id, 
        track_name, 
        preview_url,
        artist_names,
        artist_ids,
        acousticness,
        danceability,
        energy,
        valence,
        tempo,
        mst_albums (name, album_image_url)`
    )
    .gte("acousticness", acousticness - 0.3)
    .lte("acousticness", acousticness + 0.3)
    .gte("danceability", danceability - 0.3)
    .lte("danceability", danceability + 0.3)
    .gte("energy", energy - 0.15)
    .lte("energy", energy + 0.15)
    .gte("valence", valence - 0.2)
    .lte("valence", valence + 0.2)
    .neq("track_id", excludeTrackId)
    .returns<TrackType[]>();
  // スケルトン的なダミーをかえす？
  if (error) return;

  const [normalizedData, normalizedTempo] = normalizeTempo(data, tempo);

  const sortedSimilarTracks = sortSimilarityTop100(normalizedData, [
    acousticness,
    danceability,
    energy,
    valence,
    normalizedTempo
  ]);
  
  return (
    <>
      <TrackList
        title="類似楽曲"
        description="音楽的分析に基づく類似楽曲"
        data={sortedSimilarTracks}
      />
    </>
  );
};
export default TrackSimilar;





