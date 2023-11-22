import React from "react";
import ProgressBar from "../../../components/ProgressBar";
import { BPM } from "@/lib/constants";

const Progress = ({
  phase,
  totalSet,
  totalTime,
  currentTime,
}: {
  phase: {
    speed: BPM;
    count: number;
  };
  totalSet: number;
  totalTime: number;
  currentTime: number;
}) => {
  const progressPercentage = (currentTime / totalTime) * 100;
  const secondsRemaining = (totalTime - currentTime) % 60;
  const minutesRemaining = Math.floor((totalTime - currentTime) / 60);
  const progressLabel = `${
    minutesRemaining / 10 < 1 ? "0" : ""
  }${minutesRemaining} : ${
    secondsRemaining / 10 < 1 ? "0" : ""
  }${secondsRemaining}`;
  return (
    <div className="flex items-center justify-center">
      <ProgressBar radius={150} progress={progressPercentage}>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-xs uppercase font-semibold text-foreground/60">
            {`${phase.speed} BPM`}
          </p>
          <h1 className="text-5xl font-bold text-foreground/80">
            {progressLabel}
          </h1>
          <div className="flex items-center justify-center gap-3 text-xs uppercase font-semibold text-foreground/60">
            <p>{`${phase.count} / ${totalSet}`}</p>
          </div>
        </div>
      </ProgressBar>
    </div>
  );
};

export default Progress;
