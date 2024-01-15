import Skeleton from "@/app/components/UI/skeleton/Skeleton";
import styles from "../SearchTracksByCharacterPage.module.css";

const CharacterButtonGridSkeleton = () => (
  <div className={styles["character-icon-grid"]}>
    {[...Array(54)].map((_, index) => (
      <Skeleton
        additionalClass={styles["character-icon-skeleton"]}
        key={index}
      />
    ))}
  </div>
);

export default CharacterButtonGridSkeleton;
