"use client";

import type { RankingTrackType } from "@/app/_components/ranking/Ranking";
import { characterIdAtom } from "@/app/components/Provider/Providers";
import { useAtomValue } from "jotai";
import List from "@/app/components/UI/list/List";
import TrackListItemClient from "../../_components/TrackListItemClient";
import styles from "@/app/search/SearchPage.module.css";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

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
        <>
          <p className={styles["number-of-tracks-label"]}>
            <LibraryMusicIcon />
            {filteredList.length}曲
          </p>
          <List maxHeight={500}>
            {filteredList.map((track, index) => (
              <TrackListItemClient
                key={index}
                track={track}
                albumImageUrl={track.album_image_url}
                albumName={track.album_name}
              />
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default TrackListClient;
