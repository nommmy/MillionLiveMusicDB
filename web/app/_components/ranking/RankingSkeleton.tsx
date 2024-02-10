import Skeleton from "@/app/components/UI/skeleton/Skeleton";
import SkeletonText from "@/app/components/UI/skeleton/SkeletonText";
import styles from "./Ranking.module.css";

const RankingSkeleton: React.FC = () => (
  <div className="main-contents-wrapper">
    <SkeletonText additionalClass="title-h2" />
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
    <Skeleton additionalClass="list-skeleton-300" />
  </div>
);

export default RankingSkeleton;
