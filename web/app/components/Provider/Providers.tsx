"use client";

import { atom, Provider, useAtomValue, useSetAtom } from "jotai";
import { ReactNode, MutableRefObject} from "react";

type SongType = {
  title: string;
  src: string;
  artistName: string;
  albumImage: string;
};

const currentSong = atom<SongType>({
  title: "Rat A Tat!!!",
  src: "https://p.scdn.co/mp3-preview/5fa66016da861aca447955bf0d2fb89c12273080?cid=51ff43f70512448b933be81c02d82268",
  artistName: "MILLIONSTARS",
  albumImage:
    "https://i.scdn.co/image/ab67616d0000b2732c9985149a40a817d9c4d8e6",
});

export const useGetCurrentSong = () => {
  const song = useAtomValue(currentSong);
  return song;
};
export const useSetCurrentSong = () => {
  const setCurrentSong = useSetAtom(currentSong);
  return setCurrentSong;
};

const audioRef = atom<MutableRefObject<HTMLAudioElement | null>>({
  current: null,
});

export const useGetAudioRef = () => {
  const ref = useAtomValue(audioRef);
  return ref;
};
export const useSetAudioRef = () => {
  const setAudioRef = useSetAtom(audioRef);
  return setAudioRef;
};

export default function Providers({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}
