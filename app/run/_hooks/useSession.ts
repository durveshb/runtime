import { useMetronome } from "@/hooks/useMetronome";
import { useTimer } from "@/hooks/useTimer";
import { Runtime } from "@/lib/types";
import { getPhaseSequence } from "@/lib/utils/session";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useSession = ({ session }: { session: Runtime }) => {
  const [phase, setPhase] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const {
    timeElapsed,
    play: playTimer,
    pause: pauseTimer,
    reset,
    isPaused,
  } = useTimer();

  const phaseSequence = useMemo(() => {
    return getPhaseSequence({ session });
  }, [session]);
  const phaseTarget = phaseSequence[phase].duration;
  const totalPhases = phaseSequence.length;

  const { play: playMetronome, pause: pauseMetronome } = useMetronome({
    bpm: phaseSequence[phase].level,
  });

  const startingNextPhase = useMemo(
    () => new Audio("/startingNextPhase.mp3"),
    []
  );

  useEffect(() => {
    if (phaseTarget - timeElapsed === 5) {
      startingNextPhase.volume = 1;
      startingNextPhase.play();
    }
    if (timeElapsed == phaseTarget) {
      if (phase === totalPhases - 1) {
        setIsComplete(true);
        pauseTimer();
        pauseMetronome();
      } else {
        setPhase((prev) => prev + 1);
        reset();
      }
    }
  }, [
    timeElapsed,
    phase,
    phaseTarget,
    totalPhases,
    pauseTimer,
    pauseMetronome,
    reset,
  ]);

  const pause = useCallback(() => {
    pauseMetronome();
    pauseTimer();
  }, [pauseMetronome, pauseTimer]);

  const play = useCallback(() => {
    playMetronome();
    playTimer();
    startingNextPhase.volume = 0;
    startingNextPhase.play();
  }, [playMetronome, playTimer]);

  return {
    phase: {
      level: phaseSequence[phase].level,
      count: phase + 1,
    },
    totalPhases,
    timeElapsed,
    phaseTarget,
    play,
    pause,
    isPaused,
    isComplete,
  };
};
