"use client";

import React, { useCallback } from "react";
import { Button } from "../ui/button";
import {
  CompoundPhase,
  CompoundPhaseWithId,
  Phase,
  PhaseWithId,
  Runtime,
} from "@/lib/types";
import { useRouter } from "next/navigation";

const StartRunButton = ({
  runtimeBlocks,
}: {
  runtimeBlocks: (PhaseWithId | CompoundPhaseWithId)[];
}) => {
  const { push } = useRouter();
  const onStartRun = useCallback(() => {
    const runtime = JSON.stringify({
      name: "test runtime",
      blocks: runtimeBlocks.map((block) => {
        if ((block as CompoundPhase).repeater) {
          return {
            phases: (block as CompoundPhase).phases.map(
              ({ level, duration }) => ({
                level,
                duration,
              })
            ),
            repeater: (block as CompoundPhase).repeater,
          };
        } else {
          return {
            level: (block as Phase).level,
            duration: (block as Phase).duration,
          };
        }
      }),
    });
    const path = `/run?${new URLSearchParams({
      runtime,
    })}`;
    push(path);
  }, [runtimeBlocks, push]);
  return (
    <Button onClick={onStartRun} className="w-full rounded">
      <h1 className="uppercase text-md font-bold tracking-widest">Start Run</h1>
    </Button>
  );
};

export default StartRunButton;
