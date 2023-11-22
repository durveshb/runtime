import { CompoundPhaseWithId, PhaseWithId } from "@/lib/types";
import React, { useCallback } from "react";
import PhaseInput from "./PhaseInput";
import { PlusCircle } from "lucide-react";
import RepeaterInput from "./RepeaterInput";
import DeleteButton from "./DeleteButton";

const CompoundPhaseInput = ({
  phase,
  updatePhase,
  addSubPhase,
  deletePhase,
}: {
  phase: CompoundPhaseWithId;
  updatePhase: (props: { updatedPhase: CompoundPhaseWithId }) => void;
  addSubPhase: (props: { compoundId: string }) => void;
  deletePhase: (props: { phaseId: string; compoundId?: string }) => void;
}) => {
  const { id, phases, repeater } = phase;

  const updateIndividualPhase = useCallback(
    ({ updatedPhase }: { updatedPhase: PhaseWithId }) => {
      updatePhase({
        updatedPhase: {
          ...phase,
          phases: phase.phases.map((phase) =>
            phase.id === updatedPhase.id ? updatedPhase : phase
          ),
        },
      });
    },
    [updatePhase, phase]
  );

  const updateRepeater = useCallback(
    ({ updatedRepeater }: { updatedRepeater: number }) => {
      updatePhase({
        updatedPhase: {
          ...phase,
          repeater: updatedRepeater,
        },
      });
    },
    [updatePhase, phase]
  );

  const addNewPhase = useCallback(() => {
    addSubPhase({
      compoundId: id,
    });
  }, [addSubPhase, id]);

  const onDeletePhase = useCallback(() => {
    deletePhase({ phaseId: id });
  }, [deletePhase, id]);

  const onDeleteSubPhase = useCallback(
    ({ phaseId }: { phaseId: string }) => {
      deletePhase({ phaseId, compoundId: id });
    },
    [deletePhase, id]
  );

  return (
    <div className="relative w-full flex justify-between flex-col items-center p-3 border border-foreground/30 rounded gap-y-2 group/compound">
      <DeleteButton
        onClick={onDeletePhase}
        className="absolute p-3 hidden group-hover/compound:block -right-4 -top-4"
      />
      <RepeaterInput repeater={repeater} updateRepeater={updateRepeater} />
      {phases.map((phase) => (
        <PhaseInput
          phase={phase}
          updatePhase={updateIndividualPhase}
          deletePhase={onDeleteSubPhase}
          className="!px-3"
        />
      ))}
      <button
        onClick={addNewPhase}
        className="w-full px-6 py-3 border border-dashed border-foreground/30 rounded flex  flex-col sm:flex-row items-center justify-center text-foreground/50"
      >
        <PlusCircle size={15} />
      </button>
    </div>
  );
};

export default CompoundPhaseInput;
