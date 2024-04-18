"use client";

import styles from "./Aside.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import Suspending from "./Suspending";
import dynamic from "next/dynamic";

const AsideContentsWithDynamicImport = dynamic(
  () => import("./AsideContents"),
  {
    ssr: true,
  }
);

const SpAsideWithDynamicImport = dynamic(
  () => import("./SpAside"),
  {
    ssr: true,
  }
);

export default function Aside() {
  const [isReady, setIsReady] = useState(false);
  const matches = useMediaQuery("(min-width:835px)");

  useEffect(() => {
    setIsReady(true);
  }, [matches]);
  if (isReady === false) return <Suspending />;

  return (
    <>
      {matches ? (
        <div className={styles["aside-wrapper"]}>
          <AsideContentsWithDynamicImport />
        </div>
      ) : (
        <SpAsideWithDynamicImport />
      )}
    </>
  );
}
