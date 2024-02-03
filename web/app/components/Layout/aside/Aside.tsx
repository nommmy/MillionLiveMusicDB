"use client";

import styles from "./Aside.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import AsideContents from "./AsideContents";
import Drawer from "@mui/material/Drawer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Aside() {
  const matches = useMediaQuery("(min-width:835px)");
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {matches ? (
        <div className={styles["aside-wrapper"]}>
          <AsideContents />
        </div>
      ) : (
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
              <AsideContents />
            </div>
          </Drawer>
        </>
      )}
    </>
  );
}
