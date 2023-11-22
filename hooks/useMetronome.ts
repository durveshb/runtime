import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const useMetronome = ({ bpm }: { bpm: number }) => {
  const click1 = useMemo(() => new Audio("/click1.mp3"), []);

  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        click1.currentTime = 0;
        click1.play();
      }, (60 / bpm) * 1000);
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, [isPlaying, bpm]);

  const play = useCallback(() => {
    click1.play();
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return {
    play,
    pause,
  };
};
