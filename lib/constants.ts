export const SESSION_PHASE = {
  WARM_UP: "WARM_UP",
  MAIN: "MAIN",
  WARM_DOWN: "WARM_DOWN",
  COMPLETE: "COMPLETE",
} as const;

export const MAIN_PHASE = {
  RUN: "RUN",
  REST: "REST",
} as const;

export const SESSION_PHASE_VS_LABEL = {
  [SESSION_PHASE.WARM_UP]: "Warm Up",
  [SESSION_PHASE.MAIN]: "Main Routine",
  [SESSION_PHASE.WARM_DOWN]: "Warm Down",
  [SESSION_PHASE.COMPLETE]: "Complete",
};

export const MAIN_PHASE_VS_LABEL = {
  [MAIN_PHASE.REST]: "Walk",
  [MAIN_PHASE.RUN]: "Jog",
};
