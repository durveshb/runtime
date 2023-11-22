import { CompoundPhase, Phase, Runtime } from "../types";

export const getPhaseSequence = ({
  session,
}: {
  session: Runtime;
}): Phase[] => {
  const { blocks } = session;
  return blocks.reduce((acc, block) => {
    if ((block as CompoundPhase).phases) {
      const blockPhases = (block as CompoundPhase).phases;
      for (let i = 0; i < (block as CompoundPhase).repeater; i++) {
        acc = [...acc, ...blockPhases];
      }
      return [...acc];
    } else {
      return [...acc, block as Phase];
    }
  }, [] as unknown as Phase[]);
};
