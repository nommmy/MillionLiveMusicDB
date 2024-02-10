"use client";

import Image from "next/image";
import Link from "next/link";
import TrackSearch from "./TrackSearch";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import CharacterListAccordion from "./Accordions/CharacterListAccordion";
import AlbumListAccordion from "./Accordions/AlbumListAccordion";
import styles from "./Aside.module.css";

const AsideContents = () => {
  return (
    <>
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
      {/* 検索 */}
      <TrackSearch />
      {/* サイト概要 */}
      <p className={styles["intro-message"]}>
        MILLIONLIVEのキャラクターと楽曲を知るための非公式ファンサイトです
      </p>
      {/* ページ内リンク */}
      <div className={styles["search-link-container"]}>
        <Link
          href="/search/tracks-by-character"
          className={styles["search-link"]}
        >
          <PersonSearchIcon />
          キャラクターから楽曲を探す
        </Link>
        <Link
          href="/search/tracks-by-feature"
          className={styles["search-link"]}
        >
          <GraphicEqIcon />
          曲調から楽曲を探す
        </Link>
      </div>
      {/* 境界線 */}
      <div className={styles["margin-block"]} />
      {/* Accordion */}
      <CharacterListAccordion />
      <AlbumListAccordion />

      {/* 帰属等 */}
      <div className={styles["aside-footer"]}>
        <div className={`tooltip-top ${styles["attribution-tooptip"]}`}>
          <p className={styles["attribution-comment"]}>attribution</p>
          <span>
            楽曲に関する情報（アーティスト/アルバム/トラック名、アルバムアートワーク、オーディオ再生等）はすべてSpotifyメタデータを使用しています
          </span>
        </div>
        <span className={styles["twitter-account"]}>
          Twitter:
          <a
            href="https://twitter.com/millionlive2"
            target="_blank"
            rel="noopener noreferrer"
          >
            りんごよーぐると
          </a>
        </span>
      </div>
    </>
  );
};

export default AsideContents;
