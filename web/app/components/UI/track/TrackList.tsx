import { FC } from "react";
import List from "@mui/material/List";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import TrackListItem from "./TrackListItem";
import styles from "./TrackList.module.css";
import type { TrackItemType } from "@/utils/supabase";

type Props = {
  title: string;
  description: string;
  data: TrackItemType[];
};

const TrackList: FC<Props> = ({ title, description, data }) => {
  return (
    <>
      <div className={styles["track-relation-header"]}>
        <h2>{title}</h2>
        <div className="tooltip-top">
          <HelpRoundedIcon className="help-round-icon" />
          <span>{description}</span>
        </div>
      </div>
      <List
        sx={{
          maxHeight: 350,
          position: "relative",
          overflow: "auto",
        }}
      >
        {data.map((track, index) => (
          <TrackListItem key={index} track={track} />
        ))}
      </List>
    </>
  );
};
export default TrackList;
