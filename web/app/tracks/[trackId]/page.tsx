import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "./TrackDetailPage.module.css";
import commonStyles from "@/app/page.module.css";
import TrackCard from "@/app/components/track/TrackCard";
import TrackAnalytics from "@/app/components/track/TrackAnalytics";

type TrackIdResponseType = {
  track_id: string;
};
type Props = {
  params: { trackId: string };
};

type AlbumType = {
  name: string;
  album_image_url: string;
};

export type TrackType = {
  [key: string]: string | string[] | number | AlbumType;
  track_id: string;
  track_name: string;
  preview_url: string;
  artist_names: string[];
  artist_ids: string[];
  duration_ms: number;
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  speechiness: number;
  valence: number;
  mst_albums: AlbumType;
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
        speechiness,
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
      <div className={styles["header-img-wrapper"]}>
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
      <div className={styles["track-analytics-wrapper"]}>
        <TrackAnalytics track={track} />
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