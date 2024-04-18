"use client";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import styles from "./Aside.module.css";
import dynamic from "next/dynamic";

const AsideContentsWithDynamicImport = dynamic(
  () => import("./AsideContents"),
  {
    ssr: true,
  }
);

const SpAside = () => {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={styles["menu-button"]}
        sx={{ display: open ? "none" : undefined }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
        <div className={styles["sp-aside-container"]}>
          <IconButton
            onClick={handleDrawerClose}
            className={styles["close-menu-button"]}
          >
            <ChevronRightIcon />
          </IconButton>
          <AsideContentsWithDynamicImport />
        </div>
      </Drawer>
    </>
  );
};

export default SpAside;
