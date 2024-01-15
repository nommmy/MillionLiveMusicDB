"use client";

import type { RankingTrackType } from "@/app/_components/ranking/Ranking";
import { characterIdAtom } from "@/app/components/Provider/Providers";
import { useAtomValue } from "jotai";
import List from "@mui/material/List";
import TrackListItemClient from "./TrackListItemClient";
import styles from "../SearchTracksByCharacterPage.module.css"
type Props = {
  tracks: RankingTrackType[];
};

const TrackListClient = ({ tracks }: Props) => {
  const characterIds = useAtomValue(characterIdAtom);
  const selectedCharacterIds = characterIds.filter((item) => item !== "");
  const filteredList = tracks.filter((track) => {
    return track.artist_ids.some((artistId) =>
      selectedCharacterIds.includes(artistId)
    );
  });

  return (
    <>
      {filteredList.length === 0 ? (
        <h3 className={styles["choose-character-title"]}>Choose Character!</h3>
      ) : (
        <List
          sx={{
            maxHeight: 500,
            position: "relative",
            overflow: "auto",
          }}
        >
          {filteredList.map((track, index) => (
            <TrackListItemClient key={index} track={track} />
          ))}
        </List>
      )}
    </>
  );
};

export default TrackListClient;
