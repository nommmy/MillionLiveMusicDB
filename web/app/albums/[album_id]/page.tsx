import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import type { CharacterType } from "@/utils/supabase";
import { Database } from "@/database.types";
import AlbumDetailHeader from "./_components/AlbumDetailHeader";
import styles from "./AlbumDetail.module.css";
import ColorThief from "colorthief";
import AlbumDetailContents from "./_components/AlbumDetailContents";
import { Metadata } from "next";
import { siteName, openGraphMeta, twitterMeta } from "@/utils/shared-metadata";

type AlbumType = Database["public"]["Tables"]["mst_albums"]["Row"];

type Props = {
  params: { album_id: string };
};

const getDominantColor = async (imgPath: string) => {
  try {
    const color = await ColorThief.getColor(imgPath);
    return color;
  } catch (error) {
    return [255, 195, 11];
  }
};

async function fetchAlbum(album_id: string) {
  const { data, error } = await supabase
    .from("mst_albums")
    .select(
      `album_id, 
        name, 
        album_image_url,
        release_date,
        artist_ids,
        artist_names`
    )
    .eq("album_id", album_id)
    .returns<AlbumType[]>()
    .single();
  if (error) return;

  return data;
}

export default async function AlbumDetailPage({ params }: Props) {
  const album = await fetchAlbum(params.album_id);
  if (!album) return notFound();

  // trackに紐づくartistIdsでcharacter情報を取得
  // artistIdsにユニットのIDが入っている場合があるためその場合キャラまで遡って検索
  // 同キャラの表記ユレもartistIdが異なれば取得するためキャラ重複あり
  const { data, error } = await supabase
    .rpc("get_artists_info", {
      artist_ids: album.artist_ids,
    })
    .returns<CharacterType[]>();
  if (error) return <></>;

  // CDメンバーのartistIdを取得
  // 表記ユレで同キャラ異IDも含まれる
  const characterIds = data.map((character) => character.artist_id);

  // キャラ名でUniqueなリストを取得
  const characters = data.filter((character) => character.unique_flg);

  // ジャケ写のドミナントカラーを取得
  const color = await getDominantColor(album.album_image_url);

  return (
    <main
      className="main"
      style={{
        background: `linear-gradient(-20deg, rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5) 0%, white 100%)`,
      }}
    >
      <div className={styles["album-detail-page-wrapper"]}>
        <p
          className={styles["album-logo"]}
          style={{ color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.8)` }}
        >
          ALBUM
        </p>
        <AlbumDetailHeader
          name={album.name}
          imageUrl={album.album_image_url}
          characters={characters}
          artistNameArray={album.artist_names}
          releaseDate={album.release_date}
        />
        <AlbumDetailContents
          characterIds={characterIds}
          albumId={album.album_id}
        />
      </div>
    </main>
  );
}

export async function generateStaticParams(): Promise<any[]> {
  const { data, error } = await supabase.from("mst_albums").select(`album_id`);

  if (error) return [];

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = await fetchAlbum(params.album_id);

  return {
    title: album?.name,
    openGraph: {
      ...openGraphMeta,
      title: `${album?.name} | ${siteName}`,
      images: album
        ? [album.album_image_url]
        : [
            "https://aupeferaibudquqmgdne.supabase.co/storage/v1/object/public/MillionLiveImageBucket/opengraph-image.png",
          ],
    },
    twitter: {
      ...twitterMeta,
      title: `${album?.name} | ${siteName}`,
      card: "summary_large_image",
    },
  };
}
