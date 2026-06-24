// Weekly Review — core data contract.
// The whole system reads from a single `ClientWeek` object. In Phase 1 this is
// filled by sample data / a manual admin form; later it can be filled by the
// Trainerize API with no change to the rules engine or the dashboard.

export type Status = "green" | "amber" | "red";
export type Goal = "fatloss" | "muscle" | "leanbulk" | "recomp";

/** Brand-voice narrative copy. Written by Claude from the computed numbers
 *  (the LLM only phrases — it never computes a figure). Falls back to the
 *  deterministic templates in rules.ts when absent. */
export interface Narratives {
  bodyweight: string;
  energy: string;
  reconcileTitle: string;
  reconcileBody: string;
}

export interface HabitItem {
  name: string;
  hits: number;
  outOf: number;
}

export interface Lift {
  name: string;
  prev: string;
  curr: string;
}

export interface ClientWeek {
  client: {
    name: string;
    goal: Goal;
    /** Coach-set estimated maintenance (TDEE), kcal/day. Powers the energy-balance maths. */
    maintenanceKcal: number;
  };
  weekOf: string;
  /** Client's subjective read of the week, captured before any data is shown. */
  gutRead: Status;

  workouts: { done: number; planned: number; trend?: number[] };
  cardio: { done: number; planned: number; trend?: number[] };
  nutrition: { adherencePct: number; daysLogged: number; loggedKcal: number; trend?: number[] };
  habits: { overallPct: number; note?: string; trend?: number[]; items: HabitItem[] };
  steps: { avgPerDay: number; target: number; weekdayAvg: number; weekendAvg: number; trend?: number[] };
  weighIns: { thisWeek: number; last4wk: number; trend?: number[] };
  bodyweight: { currentKg: number; changeKg: number; series: number[] };
  lifts: Lift[];

  // Subjective answers from the check-in flow (used in Phase 2+; carried here so the
  // dashboard can reconcile self-report against the data).
  subjective: {
    effort: number;
    nutritionDialed: number;
    energy: number;
    sleep: number;
    appetite?: number;
    followUps?: Record<string, string>;
  };

  /** Claude-written dashboard copy, when available. */
  narratives?: Narratives;
}
