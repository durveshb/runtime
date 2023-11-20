import { useTimer } from "@/hooks/useTimer";
import { MAIN_PHASE, SESSION_PHASE } from "@/lib/constants";
import { getNextPhase, getPhaseTarget } from "@/lib/session";
import { Phase, Session } from "@/lib/types/session";
import { useEffect, useMemo, useState } from "react";

const InitialPhase: Phase = {
  sessionPhase: SESSION_PHASE.WARM_UP,
  mainPhase: MAIN_PHASE.RUN,
  currSet: 1,
};

export const useSession = ({ session }: { session: Session }) => {
  const [phase, setPhase] = useState<Phase>(InitialPhase);
  const { timeElapsed, play, pause, reset, isPaused } = useTimer();

  const phaseTarget = useMemo(() => {
    return getPhaseTarget({ phase, session });
  }, [phase, session]);

  useEffect(() => {
    if (
      phase.sessionPhase === SESSION_PHASE.MAIN &&
      phaseTarget - timeElapsed === 10 &&
      phase.mainPhase === MAIN_PHASE.RUN
    ) {
      const EndAudio = new Audio("/runPhaseEnding.mp3");
      EndAudio.play();
    }
    if (
      phaseTarget - timeElapsed === 3 &&
      ((phase.sessionPhase === SESSION_PHASE.MAIN &&
        phase.mainPhase === MAIN_PHASE.REST) ||
        phase.sessionPhase === SESSION_PHASE.WARM_UP)
    ) {
      const StartAudio = new Audio("/runPhaseStarting.mp3");
      StartAudio.play();
    }
    if (timeElapsed == phaseTarget) {
      const nextPhase = getNextPhase({ phase, session });
      if (nextPhase.sessionPhase === SESSION_PHASE.COMPLETE) {
        pause();
      }
      reset();
      setPhase(nextPhase);
    }
  }, [timeElapsed, phase, phaseTarget, pause, reset, session]);

  return { phase, timeElapsed, play, pause, phaseTarget, isPaused };
};
