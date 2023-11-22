import { CompoundBlock, PhaseBlock, Runtime } from "../types";

export const getPhaseSequence = ({
  session,
}: {
  session: Runtime;
}): PhaseBlock[] => {
  const { blocks } = session;
  return blocks.reduce((acc, block) => {
    if ((block as CompoundBlock).phases) {
      const blockPhases = (block as CompoundBlock).phases;
      for (let i = 0; i < (block as CompoundBlock).repeater; i++) {
        acc = [...acc, ...blockPhases];
      }
      return [...acc];
    } else {
      return [...acc, block as PhaseBlock];
    }
  }, [] as unknown as PhaseBlock[]);
};
