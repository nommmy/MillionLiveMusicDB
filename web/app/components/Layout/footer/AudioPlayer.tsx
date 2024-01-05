"use client";

import { FC, useRef, useEffect, useState } from "react";
import VolumeInput from "./VolumeInput";
import AudioProgressBar from "./AudioProgressBar";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { useSetAudioRef } from "../../Provider/Providers";

type Props = {
  currentSong?: {
    title: string;
    src: string;
    artistName: string;
    albumImage: string;
  };
};

function formatDurationDisplay(duration: number) {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration - min * 60);
  const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":"); // format - mm:ss
  return formatted;
}

const AudioPlayer: FC<Props> = ({
  currentSong = {
    title: "Rat A Tat!!!",
    src: "https://p.scdn.co/mp3-preview/5fa66016da861aca447955bf0d2fb89c12273080?cid=51ff43f70512448b933be81c02d82268",
    artistName: "MILLIONSTARS",
    albumImage:
      "https://i.scdn.co/image/ab67616d0000b2732c9985149a40a817d9c4d8e6",
  },
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const setAudioRef = useSetAudioRef();
  useEffect(() => {
    setAudioRef(audioRef);
  }, []);

  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // play/pause
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  // volume
  const [volume, setVolume] = useState(0.2); // set to 0.2, max is 1.0
  const handleVolumeChange = (volumeValue: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = volumeValue;
    setVolume(volumeValue);
  };

  // mute
  const handleMuteUnmute = () => {
    if (!audioRef.current) return;
    if (audioRef.current.volume !== 0) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = 1;
    }
  };

  // progress
  const [currrentProgress, setCurrrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);

  // audio.bufferedでTimeRangesオブジェクトを取得できる
  // lengthはオブジェクト内の時間範囲の数。ユーザーの操作がなければ、通常は時間範囲は 1 つだが、ユーザーがシーク操作を行うと、複数の時間範囲が含まれるようになる。
  // start(index) は、指定されたインデックスの時間範囲の開始位置を返します。
  // 最後のバッファリング範囲を更新
  const handleBufferProgress: React.ReactEventHandler<HTMLAudioElement> = (
    e
  ) => {
    const audio = e.currentTarget;
    const dur = audio.duration;
    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (
          audio.buffered.start(audio.buffered.length - 1 - i) <
          audio.currentTime
        ) {
          const bufferedLength = audio.buffered.end(
            audio.buffered.length - 1 - i
          );
          setBuffered(bufferedLength);
          break;
        }
      }
    }
  };

  // time
  const durationDisplay = formatDurationDisplay(duration);
  const elapsedDisplay = formatDurationDisplay(currrentProgress);

  return (
    <div className="audio-player-wrapper">
      {currentSong && (
        <>
          <audio
            ref={audioRef}
            //オーディオのメタデータをプリロードします。これは、オーディオの長さや、現在の再生位置などの情報を取得できるようにします。
            preload="metadata"
            onDurationChange={(e) => setDuration(e.currentTarget.duration)}
            onCanPlay={(e) => {
              e.currentTarget.volume = volume;
              setIsReady(true);
            }}
            onPlaying={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
            onTimeUpdate={(e) => {
              setCurrrentProgress(e.currentTarget.currentTime);
              handleBufferProgress(e);
            }}
            onProgress={handleBufferProgress}
            onLoadedData={() => setIsPlaying(false)}
            src={currentSong.src}
          />
          <div className="song-info-container">
            <Image
              width={56}
              height={56}
              src={currentSong?.albumImage}
              alt={`${currentSong?.title} album image`}
            />
            <div className="song-title-container">
              <p className="song-title">
                {currentSong?.title ?? "Select a song"}
              </p>
              <p className="sub-text">
                {currentSong?.artistName ?? "Singer Name"}
              </p>
            </div>
          </div>
          <div className="player-control-container">
            <IconButton
              disabled={!isReady}
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="control-icon-button"
            >
              {!isReady && currentSong ? (
                <PlayCircleIcon className="control-icon disabled-icon" />
              ) : isPlaying ? (
                <PauseCircleIcon className="control-icon" />
              ) : (
                <PlayCircleIcon className="control-icon" />
              )}
            </IconButton>
            <div className="playback-bar-container">
              <span className="sub-text progress-time-elapsed">
                {elapsedDisplay}
              </span>
              <AudioProgressBar
                duration={duration}
                currentProgress={currrentProgress}
                buffered={buffered}
                onChange={(e) => {
                  if (!audioRef.current) return;
                  audioRef.current.currentTime = e.currentTarget.valueAsNumber;
                  setCurrrentProgress(e.currentTarget.valueAsNumber);
                }}
              />
              <span className="sub-text progress-time-duration">
                {durationDisplay}
              </span>
            </div>
          </div>

          <div className="volume-control-container">
            <IconButton
              onClick={handleMuteUnmute}
              aria-label={volume === 0 ? "unmute" : "mute"}
              className="control-icon-button"
            >
              {volume === 0 ? (
                <VolumeOffIcon className="control-icon volume-icon" />
              ) : (
                <VolumeUpIcon className="control-icon volume-icon" />
              )}
            </IconButton>
            <VolumeInput volume={volume} onVolumeChange={handleVolumeChange} />
          </div>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
