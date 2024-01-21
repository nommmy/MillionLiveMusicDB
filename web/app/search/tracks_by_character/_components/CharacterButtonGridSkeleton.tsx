import Skeleton from "@/app/components/UI/skeleton/Skeleton";
import styles from "@/app/search/SearchPage.module.css";

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
