import { BPM } from "./constants";

export type PhaseBlock = {
  speed: BPM;
  duration: number;
};

export type CompoundBlock = {
  phases: PhaseBlock[];
  repeater: number;
};

export type Runtime = {
  name: string;
  blocks: (PhaseBlock | CompoundBlock)[];
};
