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
      {/* 境界線 */}
      <div className={styles["margin-block"]} />
      {/* Accordion */}
      <CharacterListAccordion />
      <AlbumListAccordion />
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
    </>
  );
};

export default AsideContents;
