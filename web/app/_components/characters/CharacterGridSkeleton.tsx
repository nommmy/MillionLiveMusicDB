import Skeleton from "@/app/components/UI/skeleton/Skeleton";
import SkeletonText from "@/app/components/UI/skeleton/SkeletonText";
import styles from "./CharacterGrid.module.css";

const CharacterGridSkeleton = () => (
  <div className="main-contents-wrapper">
    <SkeletonText additionalClass="title-h2" />
    <div className={styles["character-icon-grid"]}>
      {[...Array(54)].map((_, index) => (
        <Skeleton
          additionalClass={styles["character-icon-skeleton"]}
          key={index}
        />
      ))}
    </div>
  </div>
);

export default CharacterGridSkeleton;
