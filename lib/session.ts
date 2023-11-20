import { SESSION_PHASE, MAIN_PHASE } from "./constants";
import { Phase, Session } from "./types/session";

export const getPhaseTarget = ({
  phase,
  session,
}: {
  phase: Phase;
  session: Session;
}) => {
  if (phase.sessionPhase === SESSION_PHASE.WARM_UP) {
    return session.warmUpDuration;
  }
  if (phase.sessionPhase === SESSION_PHASE.WARM_DOWN) {
    return session.warmDownDuration;
  }
  if (phase.mainPhase === MAIN_PHASE.RUN) {
    return session.mainRunDuration;
  }
  return session.mainRestDuration;
};

export const getNextPhase = ({
  phase,
  session,
}: {
  phase: Phase;
  session: Session;
}): Phase => {
  if (phase.sessionPhase === SESSION_PHASE.WARM_UP) {
    return {
      sessionPhase: SESSION_PHASE.MAIN,
      mainPhase: MAIN_PHASE.RUN,
      currSet: 1,
    };
  }
  if (phase.sessionPhase === SESSION_PHASE.MAIN) {
    if (phase.mainPhase === MAIN_PHASE.RUN) {
      return {
        ...phase,
        mainPhase: MAIN_PHASE.REST,
      };
    }
    if (phase.currSet === session.sets) {
      return {
        sessionPhase: SESSION_PHASE.WARM_DOWN,
      };
    }
    return {
      sessionPhase: SESSION_PHASE.MAIN,
      mainPhase: MAIN_PHASE.RUN,
      currSet: phase.currSet! + 1,
    };
  }
  if (phase.sessionPhase === SESSION_PHASE.WARM_DOWN) {
    return {
      sessionPhase: SESSION_PHASE.COMPLETE,
    };
  }

  return phase;
};
