"use client";

import React, { useCallback, useMemo } from "react";
import CounterWithButtons from "./CounterWithButtons";

const DurationInput = ({
  duration,
  updateDuration,
}: {
  duration: number;
  updateDuration: (props: { updatedDuration: number }) => void;
}) => {
  const increment = useCallback(() => {
    updateDuration({
      updatedDuration: duration + 30,
    });
  }, [updateDuration, duration]);

  const decrement = useCallback(() => {
    if (duration > 30) {
      updateDuration({
        updatedDuration: duration - 30,
      });
    }
  }, [updateDuration, duration]);

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <CounterWithButtons
      increment={increment}
      decrement={decrement}
      canDecrement={duration > 30}
      canIncrement
    >
      <div className="w-full flex justify-center gap-x-2 text-sm">
        <span>{`${minutes / 10 > 0 ? "" : "0"}${minutes} min`}</span>
        <span>{`${seconds / 10 > 0 ? "" : "0"}${seconds} sec`}</span>
      </div>
    </CounterWithButtons>
  );
};

export default DurationInput;
