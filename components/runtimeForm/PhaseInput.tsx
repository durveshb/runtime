"use client";

import { PhaseWithId } from "@/lib/types";
import React, { useCallback, useEffect, useRef } from "react";
import BpmInput from "./BpmInput";
import DurationInput from "./DurationInput";
import { BPM } from "@/lib/constants";
import { ClassNameValue } from "tailwind-merge";
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
  const childrenRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const childHeight = childrenRef.current?.getBoundingClientRect();
    if (parentRef.current) {
      parentRef.current.style.cssText = `height:${childHeight?.height}px`;
    }
  }, []);

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
    if (parentRef.current) {
      parentRef.current.style.cssText = "height:0px";
      parentRef.current.ontransitionend = () => {
        deletePhase({ phaseId: id });
      };
    }
  }, [deletePhase, id]);

  return (
    <div className="relative w-full group">
      <DeleteButton
        onClick={onDeletePhase}
        className="absolute p-3 sm:hidden group-hover:block -right-6 -top-6 z-10"
      />
      <div
        ref={parentRef}
        className="relative w-full border border-foreground/30 rounded overflow-hidden h-0 transition-all "
      >
        <div
          ref={childrenRef}
          className={`${
            className ? className : ""
          } absolute w-full px-6 py-3 flex justify-between flex-col sm:flex-row items-center`}
        >
          <BpmInput level={level} updateLevel={updateLevel} />
          <DurationInput duration={duration} updateDuration={updateDuration} />
        </div>
      </div>
    </div>
  );
};

export default PhaseInput;
