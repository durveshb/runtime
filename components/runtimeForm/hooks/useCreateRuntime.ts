import { v4 as uuidv4 } from "uuid";

import { BPM } from "@/lib/constants";
import { CompoundPhaseWithId, PhaseWithId } from "@/lib/types";
import { useCallback, useState } from "react";

const InitialState = [{ id: uuidv4(), level: BPM.LEVEL_10, duration: 30 }] as (
  | PhaseWithId
  | CompoundPhaseWithId
)[];

export const useCreateRuntime = (): {
  runtime: (PhaseWithId | CompoundPhaseWithId)[];
  updatePhase: (props: {
    updatedPhase: PhaseWithId | CompoundPhaseWithId;
  }) => void;
  addSubPhase: (props?: { isCompound?: boolean; compoundId?: string }) => void;
  deletePhase: (props: { phaseId: string; compoundId?: string }) => void;
} => {
  const [runtime, setRuntime] = useState(InitialState);

  const updatePhase = useCallback(
    ({ updatedPhase }: { updatedPhase: PhaseWithId | CompoundPhaseWithId }) => {
      setRuntime((prevRuntime) =>
        prevRuntime.map((phase) =>
          phase.id === updatedPhase.id ? updatedPhase : phase
        )
      );
    },
    []
  );

  const addSubPhase = useCallback(
    (props?: { isCompound?: boolean; compoundId?: string }) => {
      const newPhase = {
        id: uuidv4(),
        level: BPM.LEVEL_1,
        duration: 30,
      };
      if (props?.isCompound) {
        const compoundPhase = {
          id: uuidv4(),
          phases: [newPhase],
          repeater: 2,
        };
        setRuntime((prevRuntime) => [...prevRuntime, compoundPhase]);
      } else {
        if (props?.compoundId) {
          setRuntime((prevRuntime) =>
            prevRuntime.map((phase) =>
              phase.id === props.compoundId
                ? {
                    ...phase,
                    phases: [
                      ...(phase as CompoundPhaseWithId).phases,
                      newPhase,
                    ],
                  }
                : phase
            )
          );
        } else {
          setRuntime((prevRuntime) => [...prevRuntime, newPhase]);
        }
      }
    },
    []
  );

  const deletePhase = useCallback(
    ({ phaseId, compoundId }: { phaseId: string; compoundId?: string }) => {
      if (compoundId) {
        setRuntime((prevRuntime) =>
          prevRuntime.map((phase) =>
            phase.id === compoundId
              ? {
                  ...phase,
                  phases: (phase as CompoundPhaseWithId).phases.filter(
                    (p) => p.id !== phaseId
                  ),
                }
              : phase
          )
        );
      } else {
        setRuntime((prevRuntime) =>
          prevRuntime.filter((phase) => phase.id !== phaseId)
        );
      }
    },
    []
  );

  return {
    runtime,
    updatePhase,
    addSubPhase,
    deletePhase,
  };
};
