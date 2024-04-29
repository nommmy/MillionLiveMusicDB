"use client";

import List from "@/app/components/UI/list/List";
import {
  featureKeyAtom,
  featureList,
} from "@/app/components/Provider/Providers";
import { useAtomValue } from "jotai";
import styles from "@/app/search/SearchPage.module.css";
import TrackListItemClient from "@/app/search/_components/TrackListItemClient";
import type { TrackFeaturesType } from "@/utils/supabase";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

type Props = {
  tracks: TrackFeaturesType[];
};

const TrackListClient = ({ tracks }: Props) => {
  const featureKeys = useAtomValue(featureKeyAtom);
  // 選択された特徴のみを抽出
  const selectedFeatureKeys = featureKeys.filter((item) => item !== "");
  const selectedFeatures = featureList.filter((feature) =>
    selectedFeatureKeys.includes(feature.name)
  );
  // 選択された特徴の範囲を取得（And条件）
  let rangeSearched: { [key: string]: number[] } = {};
  selectedFeatures.forEach((featureItem) => {
    Object.entries(featureItem.feature).forEach(([key, range]) => {
      if (!rangeSearched[key]) {
        rangeSearched[key] = [...range];
      } else {
        rangeSearched[key] = [
          Math.max(rangeSearched[key][0], range[0]),
          Math.min(rangeSearched[key][1], range[1]),
        ];
      }
    });
  });

  // 選択された特徴の範囲内の曲のみを抽出
  const filteredList = Object.keys(rangeSearched).length
    ? tracks.filter((track) => {
        return Object.entries(rangeSearched).every(([feature, [min, max]]) => {
          return (
            (track[feature] as number) >= min &&
            (track[feature] as number) <= max
          );
        });
      })
    : [];

  return (
    <>
      {filteredList.length === 0 ? (
        <h3 className={styles["choose-character-title"]}>
          {selectedFeatures.length ? "No Results..." : "Choose Features!"}
        </h3>
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
                albumImageUrl={track.mst_albums.album_image_url}
                albumName={track.mst_albums.name}
              />
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default TrackListClient;
