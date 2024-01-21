import { Suspense } from "react";
import Skeleton from "@/app/components/UI/skeleton/Skeleton";
import styles from "@/app/search/SearchPage.module.css";
import FeatureButtonPannel from "./_components/FeatureButtonPanel";
import TrackListByFeature from "./_components/TrackListByFeature";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

export default async function SearchTracksByFeaturePage() {
  return (
    <main className="main">
      <div className={styles["search-title-header"]}>
        <h2>
          曲調から楽曲を探す
        </h2>
        <div className="tooltip-top">
          <HelpRoundedIcon sx={{ marginTop: "4px", fontSize: 28 }} />
          <span>Spotifyの分析データに基づく分類</span>
        </div>
      </div>
      <FeatureButtonPannel />
      <Suspense
        fallback={
          <Skeleton additionalClass="list-skeleton-500-without-width skeleton-margin" />
        }
      >
        <TrackListByFeature />
      </Suspense>
    </main>
  );
}
