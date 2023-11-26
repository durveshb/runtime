import { BPM } from "@/lib/constants";
import { useCallback, useEffect, useRef } from "react";

export const useMetronome = ({ bpm }: { bpm: BPM }) => {
  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    audioRef.current = new Audio(`/audio/bpm/${bpm}.mp3`);
  }, [bpm]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.play();
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  return {
    play,
    pause,
  };
};
