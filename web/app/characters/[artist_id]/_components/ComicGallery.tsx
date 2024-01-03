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
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "280px",
              minWidth: "220px",
              flex: 1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ComicGallery;
