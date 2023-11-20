"use client";

import { Session } from "@/lib/types/session";
import React from "react";
import { useSession } from "./_hooks/useSession";
import Progress from "./_components/Progress";
import Controls from "./_components/Controls";

const MOCK_SESSION: Session = {
  warmDownDuration: 300,
  warmUpDuration: 300,
  sets: 5,
  mainRunDuration: 120,
  mainRestDuration: 120,
};

const RunPage = () => {
  const { phase, timeElapsed, phaseTarget, play, pause, isPaused } = useSession(
    {
      session: MOCK_SESSION,
    }
  );
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <Progress
        phase={phase}
        totalSet={MOCK_SESSION.sets}
        totalTime={phaseTarget}
        currentTime={timeElapsed}
      />
      <Controls isPaused={isPaused} play={play} pause={pause} />
    </div>
  );
};

export default RunPage;
