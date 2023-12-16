import styles from "./Aside.module.css";
import CharacterList from "./CharacterList";
import AlbumList from "./AlbumList";

export default async function Aside() {
  return (
    <div className={styles["aside-wrapper"]}>
      <CharacterList />
      <AlbumList/>
    </div>
  );
}
