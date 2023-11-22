import { useTimer } from "@/hooks/useTimer";
import { Runtime } from "@/lib/types";
import { getPhaseSequence } from "@/lib/utils/session";
import { useEffect, useMemo, useState } from "react";

export const useSession = ({ session }: { session: Runtime }) => {
  const [phase, setPhase] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const { timeElapsed, play, pause, reset, isPaused } = useTimer();

  const phaseSequence = useMemo(() => {
    return getPhaseSequence({ session });
  }, [session]);
  const phaseTarget = phaseSequence[phase].duration;
  const totalPhases = phaseSequence.length;

  useEffect(() => {
    if (timeElapsed == phaseTarget) {
      if (phase === totalPhases - 1) {
        setIsComplete(true);
        pause();
      } else {
        setPhase((prev) => prev + 1);
        reset();
      }
    }
  }, [timeElapsed, phase, phaseTarget, totalPhases, pause, reset]);

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
