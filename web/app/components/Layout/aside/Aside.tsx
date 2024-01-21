import styles from "./Aside.module.css";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "@/app/components/UI/skeleton/Skeleton";
import dynamic from "next/dynamic";
import TrackSearch from "./TrackSearch";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

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
      <p className={styles["intro-message"]}>
        MILLIONLIVEのキャラクターと楽曲を知るための非公式ファンサイトです
      </p>
      <div className={styles["search-link-container"]}>
        <Link
          href="/search/tracks_by_character"
          className={styles["search-link"]}
        >
          <PersonSearchIcon />
          キャラクターから楽曲を探す
        </Link>
        <Link
          href="/search/tracks_by_feature"
          className={styles["search-link"]}
        >
          <GraphicEqIcon />
          曲調から楽曲を探す
        </Link>
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
