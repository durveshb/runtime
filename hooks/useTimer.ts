import { useCallback, useEffect, useRef, useState } from "react";

export const useTimer = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed((time) => time + 1);
      }, 10);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  const play = useCallback(() => {
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const reset = useCallback(() => {
    setTimeElapsed(0);
  }, []);

  return {
    isPaused,
    timeElapsed,
    play,
    pause,
    reset,
  };
};
