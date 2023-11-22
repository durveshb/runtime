"use client";

import React, { useCallback, useMemo } from "react";
import CounterWithButtons from "./CounterWithButtons";
import { BPM, BPM_OPTIONS } from "@/lib/constants";

const BpmInput = ({
  level,
  updateLevel,
}: {
  level: BPM;
  updateLevel: (props: { updatedLevel: BPM }) => void;
}) => {
  const maxLevels = BPM_OPTIONS.length - 1;
  const currentLevel = useMemo(() => BPM_OPTIONS.indexOf(level), [level]);

  const increment = useCallback(() => {
    if (currentLevel < maxLevels) {
      updateLevel({
        updatedLevel: BPM_OPTIONS[currentLevel + 1],
      });
    }
  }, [updateLevel, currentLevel, maxLevels]);

  const decrement = useCallback(() => {
    if (currentLevel > 0) {
      updateLevel({
        updatedLevel: BPM_OPTIONS[currentLevel - 1],
      });
    }
  }, [updateLevel, currentLevel]);

  return (
    <CounterWithButtons
      increment={increment}
      decrement={decrement}
      canDecrement={currentLevel > 0}
      canIncrement={currentLevel < maxLevels}
    >
      <div className="w-full flex justify-center gap-x-2 text-sm">
        <span className="text-foreground/80">{`Level ${
          currentLevel + 1
        }`}</span>{" "}
        <span className="font-bold">{`( ${level} BPM )`}</span>
      </div>
    </CounterWithButtons>
  );
};

export default BpmInput;
