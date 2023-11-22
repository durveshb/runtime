"use client";

import React from "react";
import { useSession } from "./_hooks/useSession";
import Progress from "./_components/Progress";
import Controls from "./_components/Controls";
import { Session } from "@/lib/types";
import { BPM } from "@/lib/constants";

const MOCK_SESSION: Session = {
  name: "Mock Session",
  blocks: [
    { speed: BPM.LEVEL_3, duration: 300 },
    {
      phases: [
        { speed: BPM.LEVEL_5, duration: 300 },
        { speed: BPM.LEVEL_3, duration: 180 },
      ],
      repeater: 3,
    },
    {
      phases: [
        { speed: BPM.LEVEL_6, duration: 120 },
        { speed: BPM.LEVEL_3, duration: 120 },
      ],
      repeater: 2,
    },
  ],
};

const RunPage = () => {
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
    session: MOCK_SESSION,
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

export default RunPage;
