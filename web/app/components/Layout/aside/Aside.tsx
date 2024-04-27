"use client";

import SPAsideContentsWrapper from "./SPAsideContentsWrapper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import Suspending from "./Suspending";
import styles from "./Aside.module.css";

type Props = {
  children: React.ReactNode;
};

export default function Aside({ children }: Props) {
  const [isReady, setIsReady] = useState(false);
  const matches = useMediaQuery("(min-width:835px)");

  useEffect(() => {
    setIsReady(true);
  }, [matches]);
  if (isReady === false) return <Suspending />;

  return (
    <>
      {matches ? (
        <div className={styles["aside-wrapper"]}>{children}</div>
      ) : (
        <SPAsideContentsWrapper>{children}</SPAsideContentsWrapper>
      )}
    </>
  );
}
