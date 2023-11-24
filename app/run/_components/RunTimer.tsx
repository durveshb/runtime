import React, { use, useCallback } from "react";
import { useSession } from "../_hooks/useSession";
import Progress from "./Progress";
import Controls from "./Controls";
import { Runtime } from "@/lib/types";
import { useTrackRuntimeLocation } from "../_hooks/useTrackRuntimeLocation";
import { Divide } from "lucide-react";

const RunTimer = ({ runtime }: { runtime: Runtime }) => {
  const {
    phase,
    totalPhases,
    timeElapsed,
    phaseTarget,
    play: playSession,
    pause: pauseSession,
    isPaused,
    isComplete,
  } = useSession({
    session: runtime,
  });
  const { coords, startTracking, stopTracking } = useTrackRuntimeLocation();

  const play = useCallback(() => {
    playSession();
    startTracking();
  }, [playSession, startTracking]);

  const pause = useCallback(() => {
    pauseSession();
    stopTracking();
  }, [pauseSession, stopTracking]);

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <Progress
        phase={phase}
        totalSet={totalPhases}
        totalTime={phaseTarget}
        currentTime={timeElapsed}
      />
      <Controls isPaused={isPaused} play={play} pause={pause} />
    </div>
  );
};

export default RunTimer;
