import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import styles from "./TrackList.module.css";
import Image from "next/image";

type Props = {
  trackName: string;
  direction: "left" | "right";
};

export default function SubscribeSpeedDial({ trackName, direction }: Props) {
  const flexDirection =
    direction == "right"
      ? "MySpeed-dial-root-direction-right"
      : "MySpeed-dial-root-direction-left";

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
    <div className={`MySpeed-dial-root ${flexDirection}`} role="presentation">
      <button
        tabIndex={0}
        type="button"
        aria-label="Subscribe Icons"
        aria-controls="SubscribeIcons-actions"
        style={{
          transform: "none",
          transition: `transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
        }}
        className="MySpeed-dial-fab"
      >
        <QueueMusicIcon />
      </button>
      <div
        id="SubscribeIcons-actions"
        role="menu"
        aria-orientation="horizontal"
        className="MySpeed-dial-actions"
      >
        {actions.map((action, index) => (
          <button
            key={action.name}
            tabIndex={-1 as number}
            type="button"
            role="menuitem"
            style={{
              transitionDelay: `${(index + 1) * 30}ms`,
            }}
            aria-label={action.name}
            className="MySpeed-dial-action-fab"
          >
            {action.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
