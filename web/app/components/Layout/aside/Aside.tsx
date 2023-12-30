import styles from "./Aside.module.css";
import CharacterList from "./CharacterList";
import AlbumList from "./AlbumList";
import Image from "next/image";
import Link from "next/link";

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
      <CharacterList />
      <AlbumList />
    </div>
  );
}
