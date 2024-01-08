import styles from "./Aside.module.css";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "@/app/components/UI/skeleton/Skeleton";
import dynamic from "next/dynamic";
import TrackSearch from "./TrackSearch";

const CharacterListWithDynamicImport = dynamic(
  () => import("./CharacterList"),
  {
    loading: () => <Skeleton additionalClass="list-skeleton-500" />,
    ssr: true,
  }
);

const AlbumListWithDynamicImport = dynamic(() => import("./AlbumList"), {
  loading: () => <Skeleton additionalClass="list-skeleton-500" />,
  ssr: true,
});

export default async function Aside() {
  return (
    <div className={styles["aside-wrapper"]}>
      <Link href="/">
        <div className={styles["aside-logo-container"]}>
          <Image
            width={50}
            height={50}
            src="/logo.webp"
            alt="logo"
            priority={true}
          />
          <p className={styles["aside-title"]}>MILLIONLIVE MUSIC DB</p>
        </div>
      </Link>
      <TrackSearch />
      <div className={styles["search-link-container"]}>
        <Link href="/search/tracks_by_character">
          キャラクターから楽曲を探す
        </Link>
        <Link href="/search/tracks_by_feature">音楽特徴から楽曲を探す</Link>
      </div>
      <div className={styles["margin-block"]} />
      <details>
        <summary>
          <h4 className="title-h4 summary-inner">
            Characters<span className="summary-icon"></span>
          </h4>
        </summary>
        <CharacterListWithDynamicImport />
      </details>
      <details>
        <summary>
          <h4 className="title-h4 summary-inner">
            Albums<span className="summary-icon"></span>
          </h4>
        </summary>
        <AlbumListWithDynamicImport />
      </details>
    </div>
  );
}
