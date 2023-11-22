"use client";

import React, { useCallback, useMemo } from "react";
import CounterWithButtons from "./CounterWithButtons";

const RepeaterInput = ({
  repeater,
  updateRepeater,
}: {
  repeater: number;
  updateRepeater: (props: { updatedRepeater: number }) => void;
}) => {
  const increment = useCallback(() => {
    updateRepeater({
      updatedRepeater: repeater + 1,
    });
  }, [repeater, updateRepeater]);

  const decrement = useCallback(() => {
    if (repeater > 2) {
      updateRepeater({
        updatedRepeater: repeater - 1,
      });
    }
  }, [updateRepeater, repeater]);

  return (
    <div className="w-full px-3">
      <CounterWithButtons
        increment={increment}
        decrement={decrement}
        canDecrement={repeater > 2}
        canIncrement
      >
        <div className="w-full flex justify-center gap-x-2 text-sm">
          <span>{`${repeater} sets`}</span>
        </div>
      </CounterWithButtons>
    </div>
  );
};

export default RepeaterInput;
