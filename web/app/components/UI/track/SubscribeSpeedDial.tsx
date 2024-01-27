import SpeedDial from "@mui/material/SpeedDial";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import styles from "./TrackList.module.css";
import Image from "next/image";

type Props = {
  trackName: string;
};

export default function SubscribeSpeedDial({ trackName }: Props) {
  const actions = [
    {
      icon: (
        <a
          href={`https://music.apple.com/jp/search?term=${trackName}%20idolm%40ster`}
          className={styles["subscribe-icon"]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={40}
            height={40}
            src="/subscribe-icons/icon_applemusic.webp"
            alt="apple music icon"
          />
        </a>
      ),
      name: "Apple Music",
    },
    {
      icon: (
        <a
          href={`https://open.spotify.com/search/${trackName}%20idolm%40ster`}
          className={styles["subscribe-icon"]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={40}
            height={40}
            src="/subscribe-icons/icon_spotify.webp"
            alt="spotify icon"
          />
        </a>
      ),
      name: "Spotify",
    },
    {
      icon: (
        <a
          href={`https://music.amazon.co.jp/search/${trackName}%20idolm%40ster`}
          className={styles["subscribe-icon"]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={40}
            height={40}
            src="/subscribe-icons/icon_amazonmusic.webp"
            alt="amazon music icon"
          />
        </a>
      ),
      name: "Amazon Music",
    },
    {
      icon: (
        <a
          href={`https://music.youtube.com/search?q=${trackName}%20idolm%40ster`}
          className={styles["subscribe-icon"]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={40}
            height={40}
            src="/subscribe-icons/icon_youtubemusic.webp"
            alt="youtube music icon"
          />
        </a>
      ),
      name: "Youtube Music",
    },
    {
      icon: (
        <a
          href={`https://music.line.me/webapp/search?query=${trackName}%20idolm%40ster`}
          className={`${styles["subscribe-icon"]} ${styles["line-music-icon"]}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={34}
            height={20}
            src="/subscribe-icons/icon_linemusic.webp"
            alt="line music icon"
          />
        </a>
      ),
      name: "Line Music",
    },
  ];

  return (
    <div className={styles["inner-link"]}>
      <SpeedDial
        ariaLabel="Subscribe Icons"
        direction="left"
        icon={<QueueMusicIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
