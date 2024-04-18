import Skeleton from "@/app/components/UI/skeleton/Skeleton";
import styles from "./CharacterGrid.module.css";

const CharacterGridSkeleton = () => (
  <div className={styles["character-icon-grid"]}>
    {[...Array(54)].map((_, index) => (
      <Skeleton
        additionalClass={styles["character-icon-skeleton"]}
        key={index}
      />
    ))}
  </div>
);

export default CharacterGridSkeleton;
