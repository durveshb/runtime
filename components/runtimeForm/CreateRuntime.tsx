"use client";

import React from "react";
import CompoundPhaseInput from "./CompoundPhaseInput";
import PhaseInput from "./PhaseInput";
import { CompoundPhaseWithId, PhaseWithId } from "@/lib/types";
import { useCreateRuntime } from "./hooks/useCreateRuntime";
import NewPhaseButton from "./NewPhaseButton";
import StartRunButton from "./StartRunButton";

const CreateRuntime = () => {
  const { runtime, updatePhase, addSubPhase, deletePhase } = useCreateRuntime();

  return (
    <div className="container flex flex-col gap-y-2 items-center w-full max-w-2xl py-3">
      <h1 className="text-3xl font-bold mb-3 text-center">
        Create your personalised Runtime
      </h1>
      {runtime.map((phase) =>
        (phase as CompoundPhaseWithId).repeater ? (
          <CompoundPhaseInput
            key={phase.id}
            phase={phase as CompoundPhaseWithId}
            updatePhase={updatePhase}
            addSubPhase={addSubPhase}
            deletePhase={deletePhase}
          />
        ) : (
          <PhaseInput
            key={phase.id}
            phase={phase as PhaseWithId}
            updatePhase={updatePhase}
            deletePhase={deletePhase}
          />
        )
      )}
      <NewPhaseButton addNewPhase={addSubPhase} />
      <StartRunButton runtimeBlocks={runtime} />
    </div>
  );
};

export default CreateRuntime;
