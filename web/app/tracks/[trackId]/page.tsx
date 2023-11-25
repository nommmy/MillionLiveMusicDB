import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "./TrackDetailPage.module.css";
import commonStyles from "@/app/page.module.css";
import TrackCard from "@/app/components/track/TrackCard";

type TrackIdResponseType = {
  track_id: string;
};
type Props = {
  params: { trackId: string };
};
type TrackType = {
  track_id: string;
  track_name: string;
  preview_url: string;
  artist_names: string[];
  artist_ids: string[];
  duration_ms: string;
  acousticness: string;
  danceability: string;
  energy: string;
  instrumentalness: string;
  key: string;
  liveness: string;
  loudness: string;
  mode: string;
  speechiness: string;
  tempo: string;
  valence: string;
  mst_albums: { name: string; album_image_url: string };
};

async function fetchTrack(trackId: string) {
  const { data, error } = await supabase
    .from("mst_tracks")
    .select(
      `track_id, 
        track_name, 
        preview_url,
        artist_names,
        artist_ids,
        duration_ms,
        acousticness,
        danceability,
        energy,
        instrumentalness,
        key,
        liveness,
        loudness,
        mode,
        speechiness,
        tempo,
        valence,
        mst_albums (name, album_image_url)`
    )
    .eq("track_id", trackId)
    .returns<TrackType[]>()
    .single();
  // スケルトン的なダミーをかえす？
  if (error) return;

  return data;
}

export default async function TrackDetailPage({ params }: Props) {
  const track = await fetchTrack(params.trackId);
  if (!track) return notFound();

  return (
    <main className={commonStyles.main}>
      <div className={styles["header-img-container"]}>
        <Image
          fill
          priority={true}
          alt={track.track_name}
          src={track.mst_albums.album_image_url}
          className={styles["header-img"]}
        />
      </div>
      <div className={styles["track-info-wrapper"]}>
        <TrackCard
          name={track.track_name}
          imageUrl={track.mst_albums.album_image_url}
          albumName={track.mst_albums.name}
          artistIdArray={track.artist_ids}
          artistNameArray={track.artist_names}
        />
      </div>
    </main>
  );
}
export async function generateStaticParams() {
  const { data, error } = await supabase
    .from("mst_tracks")
    .select(`track_id`)
    .returns<TrackIdResponseType[]>();
  // スケルトン的なダミーをかえす？
  if (error) return;

  return data;
}
