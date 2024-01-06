"use client";

import dynamic from "next/dynamic";
import { useGetCurrentSong } from "../../Provider/Providers";

const AudioPlayerWithDynamicImport = dynamic(() => import("./AudioPlayer"), {
  ssr: false,
});

const Footer = () => {
  const song = useGetCurrentSong();
  return (
    <footer className="footer">
      <AudioPlayerWithDynamicImport currentSong={song} />
    </footer>
  );
};

export default Footer;
