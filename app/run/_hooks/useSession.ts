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
    () => new Audio("audio/startingNextPhase.mp3"),
    []
  );
  const halfwayAudio = useMemo(() => new Audio("audio/halfwaythere.mp3"), []);

  useEffect(() => {
    if (timeElapsed * 2 === phaseTarget) {
      halfwayAudio.muted = false;
      halfwayAudio.play();
    }
    if (phaseTarget - timeElapsed === 5) {
      startingNextPhase.muted = false;
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
    startingNextPhase.muted = true;
    halfwayAudio.muted = true;
    startingNextPhase.play();
    halfwayAudio.play();
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
