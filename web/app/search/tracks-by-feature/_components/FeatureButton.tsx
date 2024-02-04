"use client";

import styles from "@/app/search/SearchPage.module.css";
import { PrimitiveAtom, useAtom } from "jotai";

type Props = {
  feature: string;
  featureKeyAtom: PrimitiveAtom<string>;
};

const FeatureButton = ({ feature, featureKeyAtom }: Props) => {
  const [featureKey, setFeatureKey] = useAtom(featureKeyAtom);
  const handleClick = () => {
    featureKey == "" ? setFeatureKey(feature) : setFeatureKey("");
  };

  return (
    <button
      className={`${styles["feature-button"]} ${
        featureKey == "" ? "" : styles["selected-feature-button"]
      }`}
      onClick={() => handleClick()}
    >
      {feature}
    </button>
  );
};

export default FeatureButton;
