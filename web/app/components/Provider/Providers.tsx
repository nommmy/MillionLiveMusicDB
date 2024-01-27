"use client";

import { atom, Provider, useAtomValue, useSetAtom } from "jotai";
import { ReactNode, MutableRefObject } from "react";
import { splitAtom } from "jotai/utils";

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

const NUMBER_OF_CHARACTER = 54;
export const characterIdAtom = atom(new Array(NUMBER_OF_CHARACTER).fill(""));
export const characterIdAtomsInAtom = splitAtom(characterIdAtom);

export const featureList = [
  {
    name: "元気",
    feature: {
      acousticness: [0, 0.3],
      energy: [0.9, 1.0],
      valence: [0.7, 1.0],
    },
  },
  {
    name: "激しい",
    feature: {
      acousticness: [0, 0.3],
      energy: [0.9, 1.0],
      valence: [0.5, 0.8],
    },
  },
  {
    name: "しっとり",
    feature: {
      acousticness: [0.15, 1.0],
      energy: [0, 0.9],
      valence: [0, 0.8],
    },
  },
  {
    name: "心に迫る",
    feature: {
      acousticness: [0.2, 1.0],
      energy: [0, 0.7],
      valence: [0, 0.6],
    },
  },
  {
    name: "かっこいい",
    feature: {
      acousticness: [0, 0.3],
      energy: [0.9, 1.0],
      valence: [0, 0.8],
    },
  },
  {
    name: "ダンサブル",
    feature: {
      acousticness: [0, 0.3],
      danceability: [0.65, 1.0],
      energy: [0.7, 1.0],
    },
  },
  {
    name: "テンションUP",
    feature: {
      acousticness: [0, 0.3],
      energy: [0.7, 1.0],
      tempo: [160, 250],
    },
  },
  {
    name: "前向き",
    feature: {
      energy: [0, 0.6],
      valence: [0.2, 0.8],
    },
  },
  {
    name: "キーが高め",
    feature: {
      key: [7, 11],
    },
  },
  {
    name: "キーが低め",
    feature: {
      key: [-1, 4],
    },
  },
];
const NUMBER_OF_FEATURE = featureList.length;
export const featureKeyAtom = atom(new Array(NUMBER_OF_FEATURE).fill(""));
export const featureKeyAtomsInAtom = splitAtom(featureKeyAtom);
