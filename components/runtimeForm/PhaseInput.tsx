"use client";

import { PhaseWithId } from "@/lib/types";
import React, { useCallback } from "react";
import BpmInput from "./BpmInput";
import DurationInput from "./DurationInput";
import { BPM } from "@/lib/constants";
import { ClassNameValue } from "tailwind-merge";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import DeleteButton from "./DeleteButton";

const PhaseInput = ({
  phase,
  updatePhase,
  deletePhase,
  className,
}: {
  phase: PhaseWithId;
  updatePhase: (props: { updatedPhase: PhaseWithId }) => void;
  deletePhase: (props: { phaseId: string }) => void;
  className?: ClassNameValue;
}) => {
  const { id, level, duration } = phase;

  const updateLevel = useCallback(
    ({ updatedLevel }: { updatedLevel: BPM }) => {
      updatePhase({
        updatedPhase: {
          ...phase,
          level: updatedLevel,
        },
      });
    },
    [updatePhase, phase]
  );

  const updateDuration = useCallback(
    ({ updatedDuration }: { updatedDuration: number }) => {
      updatePhase({
        updatedPhase: {
          ...phase,
          duration: updatedDuration,
        },
      });
    },
    [updatePhase, phase]
  );

  const onDeletePhase = useCallback(() => {
    deletePhase({ phaseId: id });
  }, [deletePhase, id]);

  return (
    <div
      className={`${className} relative w-full px-6 py-3 border border-foreground/30 rounded flex justify-between flex-col sm:flex-row items-center group`}
    >
      <DeleteButton
        onClick={onDeletePhase}
        className="absolute p-3 hidden group-hover:block -right-6 -top-6"
      />
      <BpmInput level={level} updateLevel={updateLevel} />
      <DurationInput duration={duration} updateDuration={updateDuration} />
    </div>
  );
};

export default PhaseInput;
