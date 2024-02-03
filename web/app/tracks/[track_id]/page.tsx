import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "./TrackDetailPage.module.css";
import TrackCard from "@/app/tracks/[track_id]/_components/TrackCard";
import TrackAnalytics from "@/app/tracks/[track_id]/_components/TrackAnalytics";
import TrackRelation from "@/app/components/UI/track/TrackRelation";
import TrackSimilar from "@/app/tracks/[track_id]/_components/TrackSimilar";
import { Suspense } from "react";
import ListSkeleton from "@/app/components/UI/skeleton/ListSkeleton";
import type { CharacterType } from "@/utils/supabase";
import { Metadata } from "next";
import { siteName, openGraphMeta, twitterMeta } from "@/utils/shared-metadata";

type Props = {
  params: { track_id: string };
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
  tempo: number;
  mst_albums: AlbumType;
};

async function fetchTrack(track_id: string) {
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
        tempo,
        mst_albums (name, album_image_url)`
    )
    .eq("track_id", track_id)
    .returns<TrackType[]>()
    .single();
  if (error) return;

  return data;
}

export default async function TrackDetailPage({ params }: Props) {
  const track = await fetchTrack(params.track_id);
  if (!track) return notFound();

  // trackに紐づくartistIdsでcharacter情報を取得
  // artistIdsにユニットのIDが入っている場合があるためその場合キャラまで遡って検索
  // 同キャラの表記ユレもartistIdが異なれば取得するためキャラ重複あり
  const { data, error } = await supabase
    .rpc("get_artists_info", {
      artist_ids: track.artist_ids,
    })
    .returns<CharacterType[]>();
  if (error) return <></>;

  // キャラ名でUniqueなリストを取得
  const uniqueCharacters = data.filter((character) => character.unique_flg);

  // 歌唱メンバーのIDおよびUnitIdを取得
  // 表記ユレで同キャラ異IDも含まれる
  const characterIds = Array.from(
    new Set([
      ...data.map((character) => character.artist_id),
      ...track.artist_ids,
    ])
  );

  return (
    <main className="main">
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
          characters={uniqueCharacters}
          artistNameArray={track.artist_names}
          previewUrl={track.preview_url}
        />
      </div>
      <div className={styles["track-analytics-wrapper"]}>
        <TrackAnalytics track={track} />
      </div>
      <Suspense
        fallback={<ListSkeleton titleClass="normal-h2-skeleton" height={350} />}
      >
        <div className="main-contents-wrapper">
          <TrackRelation
            characterIds={characterIds}
            excludeTrackIds={[track.track_id]}
          />
        </div>
      </Suspense>
      <Suspense
        fallback={<ListSkeleton titleClass="normal-h2-skeleton" height={350} />}
      >
        <div className="main-contents-wrapper">
          <TrackSimilar
            excludeTrackId={track.track_id}
            acousticness={track.acousticness}
            danceability={track.danceability}
            energy={track.energy}
            valence={track.valence}
            tempo={track.tempo}
          />
        </div>
      </Suspense>
    </main>
  );
}
export async function generateStaticParams(): Promise<any[]> {
  const { data, error } = await supabase.from("mst_tracks").select(`track_id`);

  if (error) return [];

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const track = await fetchTrack(params.track_id);

  return {
    title: track?.track_name,
    openGraph: {
      ...openGraphMeta,
      title: `${track?.track_name} | ${siteName}`,
      images: track
        ? [track.mst_albums.album_image_url]
        : [
            "https://aupeferaibudquqmgdne.supabase.co/storage/v1/object/public/MillionLiveImageBucket/logo_large.webp",
          ],
    },
    twitter: {
      ...twitterMeta,
      title: `${track?.track_name} | ${siteName}`,
      card: "summary_large_image",
    },
  };
}
