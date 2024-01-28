import { FC } from "react";
import styles from "../CharacterDetailPage.module.css";
import Image from "next/image";

type Props = {
  imgs: string[];
};

const ComicGallery: FC<Props> = ({ imgs }) => {
  return (
    <div className={styles["comics-wrapper"]}>
      <h2>Comics</h2>
      <div className={styles["comic-imgs-container"]}>
        {imgs.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="comic"
            width={512}
            height={1611}
            className={styles["comic-img"]}
          />
        ))}
      </div>
    </div>
  );
};

export default ComicGallery;
