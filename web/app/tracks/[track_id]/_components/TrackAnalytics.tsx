import { FC } from "react";
import Slider from "@mui/material/Slider";
import styles from "./TrackAnalytics.module.css";
import type { TrackType } from "@/app/tracks/[track_id]/page";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

type Props = {
  track: TrackType;
};

type featureType = {
  [key: string]: string;
  acousticness: string;
  danceability: string;
  energy: string;
  speechiness: string;
  valence: string;
};

const TrackAnalytics: FC<Props> = ({ track }) => {
  const audioFeatures: featureType = {
    acousticness: "アコースティック感・バラード感",
    danceability: "規則性に基づく踊りやすさ",
    energy: "激しさ・ラウドさ",
    speechiness: "ボーカルが話している感じの強さ",
    valence: "ポジティブさ（幸せ、陽気、多幸感）",
  };

  return (
    <div>
      {Object.keys(audioFeatures).map((feature, index) => (
        <div key={index} className={styles["track-analytics-container"]}>
          <div className={styles["audio-feature-label-container"]}>
            <p>{feature.charAt(0).toUpperCase() + feature.slice(1)}</p>
            <div className="tooltip-top">
              <HelpRoundedIcon />
              <span>{audioFeatures[feature]}</span>
            </div>
          </div>
          <Slider
            disabled
            defaultValue={track[`${feature}`] as number}
            aria-label={feature}
            min={0}
            max={1}
            valueLabelDisplay="auto"
            className={styles["audio-feature-slider"]}
          />
        </div>
      ))}
    </div>
  );
};

export default TrackAnalytics;
