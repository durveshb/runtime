import { MAIN_PHASE, SESSION_PHASE } from "../constants";

export type Session = {
  warmUpDuration: number;
  mainRunDuration: number;
  mainRestDuration: number;
  sets: number;
  warmDownDuration: number;
};

export type SessionPhase = ValuesOf<typeof SESSION_PHASE>;
export type MainPhase = ValuesOf<typeof MAIN_PHASE>;

export type Phase = {
  sessionPhase: SessionPhase;
  mainPhase?: MainPhase;
  currSet?: number;
};
