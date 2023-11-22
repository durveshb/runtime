import { BPM } from "./constants";

export type Phase = {
  level: BPM;
  duration: number;
};

export type PhaseWithId = Phase & {
  id: string;
};

export type CompoundPhase = {
  phases: Phase[];
  repeater: number;
};

export type CompoundPhaseWithId = {
  phases: PhaseWithId[];
  repeater: number;
  id: string;
};

export type Runtime = {
  name: string;
  blocks: (Phase | CompoundPhase)[];
};
