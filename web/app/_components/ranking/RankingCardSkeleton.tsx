import Skeleton from "@/app/components/UI/skeleton/Skeleton";
import SkeletonText from "@/app/components/UI/skeleton/SkeletonText";
import styles from "./Ranking.module.css";

const RankingCardSkeleton: React.FC = () => (
    <div className={styles["ranking-cards-container-skeleton"]}>
      {[...Array(3)].map((_, index) => (
        <div className={styles["card"]} key={index}>
          <Skeleton
            additionalClass={`${styles["card-skeleton"]} ${styles["card-img"]}`}
          />
          <SkeletonText additionalClass={styles["card-name"]} />
          <SkeletonText additionalClass={styles["card-description"]} />
        </div>
      ))}
    </div>
);

export default RankingCardSkeleton;
