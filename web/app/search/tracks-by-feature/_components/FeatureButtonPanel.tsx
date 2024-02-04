"use client";

import styles from "@/app/search/SearchPage.module.css";
import { useAtomValue } from "jotai";
import {
  featureList,
  featureKeyAtomsInAtom,
} from "@/app/components/Provider/Providers";
import FeatureButton from "./FeatureButton";

const FeatureButtonPannel = () => {
  const featureKeyAtoms = useAtomValue(featureKeyAtomsInAtom);

  return (
    <div className={styles["feature-button-grid"]}>
      {featureList.map((feature, index) => (
        <FeatureButton
          key={index}
          feature={feature.name}
          featureKeyAtom={featureKeyAtoms[index]}
        />
      ))}
    </div>
  );
};
export default FeatureButtonPannel;
