import { Phase } from "./constants";

export type PhaseBlock = {
  phase: Phase;
  duration: number;
};

export type CompoundBlock = {
  phases: PhaseBlock[];
  repeater: number;
};

export type Session = {
  name: string;
  blocks: (PhaseBlock | CompoundBlock)[];
};
