import styles from "./TrackAnalytics.module.css";

const MIN = 0;
const MAX = 1;
type Props = {
  value: number;
};

const Slider = ({ value }: Props) => {
  const width = `${((value - MIN) / (MAX - MIN)) * 100}%`;

  return (
    <span className={styles["audio-feature-slider-wrapper"]}>
      <span className={styles["audio-feature-slider-background"]}></span>
      <span
        className={styles["audio-feature-slider-values"]}
        style={{ width: width }}
      ></span>
    </span>
  );
};

export default Slider;
