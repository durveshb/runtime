import { MainPhase, Phase, Session, SessionPhase } from "@/lib/types/session";
import React from "react";
import ProgressBar from "../../../components/ProgressBar";
import {
  MAIN_PHASE_VS_LABEL,
  SESSION_PHASE,
  SESSION_PHASE_VS_LABEL,
} from "@/lib/constants";

const Progress = ({
  phase,
  totalSet,
  totalTime,
  currentTime,
}: {
  phase: Phase;
  totalSet: number;
  totalTime: number;
  currentTime: number;
}) => {
  const progressPercentage = (currentTime / totalTime) * 100;
  const secondsRemaining = (totalTime - currentTime) % 60;
  const minutesRemaining = Math.floor((totalTime - currentTime) / 60);
  const progressLabel = `${minutesRemaining} : ${secondsRemaining}`;
  return (
    <div className="flex items-center justify-center">
      <ProgressBar radius={150} progress={progressPercentage}>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-xs uppercase font-semibold text-foreground/60">
            {SESSION_PHASE_VS_LABEL[phase.sessionPhase]}
          </p>
          <h1 className="text-5xl font-bold text-foreground/80">
            {progressLabel}
          </h1>
          {phase.sessionPhase === SESSION_PHASE.MAIN && (
            <div className="flex items-center justify-center gap-3 text-xs uppercase font-semibold text-foreground/60">
              <p>{`${phase.currSet!} / ${totalSet}`}</p>
              <p className="text-sm">{MAIN_PHASE_VS_LABEL[phase.mainPhase!]}</p>
            </div>
          )}
        </div>
      </ProgressBar>
    </div>
  );
};

export default Progress;
