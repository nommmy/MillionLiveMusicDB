import { AlbumCardType } from "./AlbumCardGrid";
import { FC } from "react";
import Image from "next/image";
import styles from "./Album.module.css";
import Link from "next/link";

type Props = {
  album: AlbumCardType;
};

const AlbumCard: FC<Props> = ({ album }) => {
  return (
    <Link href={`/albums/${album.album_id}`}>
      <div className={styles["album-card"]}>
        <Image
          width={100}
          height={100}
          alt={album.name}
          src={album.album_image_url}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "4px",
          }}
        />
      </div>
    </Link>
  );
};
export default AlbumCard;
