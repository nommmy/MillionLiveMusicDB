import { AlbumCardType } from "./AlbumCardGrid";
import { FC } from "react";
import Image from "next/image";
import styles from "./Album.module.css";

type Props = {
  album: AlbumCardType;
};

const AlbumCard: FC<Props> = ({ album }) => {
  return (
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
  );
};
export default AlbumCard;
