import React, { useCallback } from "react";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

const NewPhaseButton = ({
  addNewPhase,
}: {
  addNewPhase: (props?: { isCompound?: boolean }) => void;
}) => {
  const addSinglePhase = useCallback(() => {
    addNewPhase();
  }, [addNewPhase]);
  const addCompoundPhase = useCallback(() => {
    addNewPhase({
      isCompound: true,
    });
  }, [addNewPhase]);

  return (
    <div className="w-full p-3 border border-dashed border-foreground/30 rounded flex  flex-col sm:flex-row items-center justify-center gap-2 text-foreground/50">
      <Button
        onClick={addSinglePhase}
        className="w-full py-1 flex gap-2 rounded"
        variant="outline"
      >
        <PlusCircle size={15} />
        <h1>Single Block</h1>
      </Button>
      <Button
        onClick={addCompoundPhase}
        className="w-full py-1 flex gap-2 rounded"
        variant="outline"
      >
        <PlusCircle size={15} />
        <h1>Compound Block</h1>
      </Button>
    </div>
  );
};

export default NewPhaseButton;
