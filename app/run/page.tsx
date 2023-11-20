"use client";

import { Session } from "@/lib/types/session";
import React from "react";
import { useSession } from "./_hooks/useSession";
import Progress from "./_components/Progress";
import Controls from "./_components/Controls";

const MOCK_SESSION: Session = {
  warmDownDuration: 30,
  warmUpDuration: 30,
  sets: 2,
  mainRunDuration: 60,
  mainRestDuration: 60,
};

const page = () => {
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

export default page;
