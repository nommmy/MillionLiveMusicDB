import type { CharacterType } from "@/utils/supabase";
import { FC } from "react";
import styles from "./CharacterIcon.module.css";
import AvatarGroup from "@mui/material/AvatarGroup";
import CharacterIcon from "./CharacterIcon";

type Props = {
  artists: CharacterType[];
  imageColumn: string;
  size: number;
  innerLink?: string;
  maxLength?: number;
};

const CharacterIconList: FC<Props> = ({
  artists,
  imageColumn,
  size,
  innerLink = "",
  maxLength,
}) => {
  return (
    <div className={`${styles["character-icon-list"]} ${styles[innerLink]} icon-list-wrapper`}>
      {maxLength && artists.length >= maxLength ? (
        <AvatarGroup
          max={maxLength}
          className={styles["avator-group"]}
          sx={{
            "& .MuiAvatar-root": { width: 37, height: 37, zIndex: -1 },
          }}
        >
          {artists.map((artist) => (
            <CharacterIcon
              key={artist.artist_id}
              artist={artist}
              imageColumn={imageColumn}
              size={size}
            />
          ))}
        </AvatarGroup>
      ) : (
        <>
          {artists.map((artist) => (
            <CharacterIcon
              key={artist.artist_id}
              artist={artist}
              imageColumn={imageColumn}
              size={size}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CharacterIconList;
