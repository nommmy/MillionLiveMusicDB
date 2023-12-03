import { FC } from "react";
import List from "@mui/material/List";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import TrackListItem from "./TrackListItem";
import toolTipStyles from "@/app/components/character/CharacterIcon.module.css";
import styles from "./TrackList.module.css";
import type { RankingCardType } from "../ranking/Ranking";

type Props = {
  title: string;
  description: string;
  data: RankingCardType[];
};

const TrackList: FC<Props> = ({ title, description, data }) => {
  return (
    <>
      <div className={styles["track-relation-header"]}>
        <h2>{title}</h2>
        <div className={toolTipStyles["tooltip-top"]}>
          <HelpRoundedIcon sx={{ marginTop: "4px", fontSize: 28 }} />
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
