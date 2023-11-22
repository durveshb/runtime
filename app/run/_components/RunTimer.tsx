import React from "react";
import { useSession } from "../_hooks/useSession";
import Progress from "./Progress";
import Controls from "./Controls";
import { Runtime } from "@/lib/types";

const RunTimer = ({ runtime }: { runtime: Runtime }) => {
  const {
    phase,
    totalPhases,
    timeElapsed,
    phaseTarget,
    play,
    pause,
    isPaused,
    isComplete,
  } = useSession({
    session: runtime,
  });
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
