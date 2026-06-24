// Weekly Review — deterministic rules engine.
// Every number on the dashboard is computed here. The narrative strings are
// templated for Phase 1; in Phase 4 these same functions become the seam where
// the Claude API rewrites the copy in De Maître brand voice (numbers stay computed
// in code — the LLM only ever phrases, never calculates).

import type { ClientWeek, Goal, HabitItem, Status } from "./types";

export const STATUS_COLOR: Record<Status, string> = {
  green: "#6E8B5A", // sage   — on track
  amber: "#B8953E", // gold   — watch
  red: "#9B4E3A", // terracotta — off track
};

// Thresholds are the single source of truth — tune here. [greenMin, amberMin].
const T = {
  workouts: [85, 60],
  cardio: [80, 40],
  nutrition: [80, 50],
  habits: [80, 40],
  steps: [90, 60],
  weighIns: [6, 3],
  habitEach: [6, 3],
} as const;

function band(value: number, greenMin: number, amberMin: number): Status {
  if (value >= greenMin) return "green";
  if (value >= amberMin) return "amber";
  return "red";
}

function pct(done: number, planned: number): number {
  return planned > 0 ? Math.round((done / planned) * 100) : 0;
}

/** Weekly bodyweight pace, read against the client's goal. */
export function paceStatus(changeKg: number, currentKg: number, goal: Goal): Status {
  const p = currentKg > 0 ? (changeKg / currentKg) * 100 : 0; // weekly %
  if (goal === "leanbulk" || goal === "muscle") {
    if (p >= 0.2 && p <= 0.5) return "green";
    if (p >= 0 && p < 0.2) return "amber";
    if (p > 0.5) return "amber";
    return "red"; // losing while trying to gain
  }
  if (goal === "fatloss") {
    if (p <= -0.5 && p >= -1.0) return "green";
    if (p < 0 && p > -0.5) return "amber";
    if (p < -1.0) return "amber";
    return "red"; // gaining / flat while trying to lose
  }
  // recomp / maintenance
  if (Math.abs(p) <= 0.2) return "green";
  if (Math.abs(p) <= 0.5) return "amber";
  return "red";
}

/** The energy-balance maths — fully deterministic. 7700 kcal per kg of bodyweight. */
export function energyBalance(changeKg: number, maintenanceKcal: number, loggedKcal: number) {
  const dailySurplus = Math.round((changeKg * 7700) / 7);
  const realIntake = maintenanceKcal + dailySurplus;
  const underLog = realIntake - loggedKcal;
  return { dailySurplus, realIntake, underLog, flagged: underLog > 250 };
}

/** number[] -> SVG polyline points within a 100 x `height` viewBox. */
export function sparkPoints(series: number[], width = 100, height = 24, pad = 3): string {
  if (!series || series.length < 2) return "";
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const step = width / (series.length - 1);
  return series
    .map((v, i) => {
      const x = i * step;
      const y = pad + (height - pad * 2) * (1 - (v - min) / range);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

const GOAL_LABEL: Record<Goal, string> = {
  fatloss: "Fat loss",
  muscle: "Muscle",
  leanbulk: "Lean bulk",
  recomp: "Recomp",
};

const GUT_LABEL: Record<Status, string> = { green: "Green", amber: "Amber", red: "Red" };

function humanList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function changeText(changeKg: number): string {
  if (changeKg > 0) return `up ${changeKg}kg`;
  if (changeKg < 0) return `down ${Math.abs(changeKg)}kg`;
  return "flat";
}

// ---- Narratives (Phase 1 templates; Claude-replaceable later) -----------------

function bodyweightNarrative(w: ClientWeek, pace: Status): string {
  const goal = GOAL_LABEL[w.client.goal].toLowerCase();
  const dir = changeText(w.bodyweight.changeKg);
  if (pace === "green") {
    return `${capitalize(dir)} this week — textbook ${goal} pace. Weight is tracking right where we want it.`;
  }
  if (pace === "amber") {
    return `${capitalize(dir)} this week — a touch off the ideal ${goal} pace. Worth keeping an eye on.`;
  }
  return `${capitalize(dir)} this week — off pace for ${goal}. Flagged for your coach.`;
}

function energyNarrative(
  w: ClientWeek,
  eb: ReturnType<typeof energyBalance>
): string {
  const logged = w.nutrition.loggedKcal.toLocaleString("en-US");
  const burned = w.client.maintenanceKcal.toLocaleString("en-US");
  const real = (Math.round(eb.realIntake / 10) * 10).toLocaleString("en-US");
  const goal = GOAL_LABEL[w.client.goal].toLowerCase();
  if (!eb.flagged) {
    return `You logged ${logged} a day, with ~${burned} burned and weight ${changeText(
      w.bodyweight.changeKg
    )}. Your logging lines up well with the scale — no hidden calories.`;
  }
  return `You logged ${logged} a day, but with ~${burned} burned and weight ${changeText(
    w.bodyweight.changeKg
  )}, your real intake is closer to ${real}. That is ~${eb.underLog} kcal uncounted — fine while ${goal} bulking, but worth knowing your true number.`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ---- Top-level compute --------------------------------------------------------

export interface ConsistencyCard {
  label: string;
  display: string;
  sub: string;
  status: Status;
  trend?: number[];
}

export interface ComputedHabit extends HabitItem {
  status: Status;
  pct: number;
}

export interface ComputedWeek {
  goalLabel: string;
  gutLabel: string;
  cards: ConsistencyCard[];
  habitItems: ComputedHabit[];
  pace: Status;
  energy: ReturnType<typeof energyBalance>;
  energyFlagText: string;
  bodyweightNarrative: string;
  energyNarrative: string;
  reconcile: { title: string; body: string; accent: string };
}

export function computeWeek(w: ClientWeek): ComputedWeek {
  const workoutsPct = pct(w.workouts.done, w.workouts.planned);
  const cardioPct = pct(w.cardio.done, w.cardio.planned);
  const stepsPct = Math.round((w.steps.avgPerDay / w.steps.target) * 100);

  const wStatus = band(workoutsPct, ...T.workouts);
  const cStatus = band(cardioPct, ...T.cardio);
  const nStatus = band(w.nutrition.adherencePct, ...T.nutrition);
  const hStatus = band(w.habits.overallPct, ...T.habits);
  const sStatus = band(stepsPct, ...T.steps);
  const wiStatus = band(w.weighIns.thisWeek, ...T.weighIns);

  const cards: ConsistencyCard[] = [
    { label: "Workouts", display: `${workoutsPct}%`, sub: `${w.workouts.done} of ${w.workouts.planned} sessions`, status: wStatus, trend: w.workouts.trend },
    { label: "Cardio", display: `${cardioPct}%`, sub: `${w.cardio.done} of ${w.cardio.planned} sessions`, status: cStatus, trend: w.cardio.trend },
    { label: "Nutrition log", display: `${w.nutrition.adherencePct}%`, sub: `${w.nutrition.daysLogged} days a week`, status: nStatus, trend: w.nutrition.trend },
    { label: "Habits", display: `${w.habits.overallPct}%`, sub: w.habits.note ?? "", status: hStatus, trend: w.habits.trend },
    { label: "Steps", display: w.steps.avgPerDay.toLocaleString("en-US"), sub: `avg a day, ${w.steps.target / 1000}k target`, status: sStatus, trend: w.steps.trend },
    { label: "Weigh-ins", display: `${w.weighIns.thisWeek}/wk`, sub: `${w.weighIns.last4wk} in last 4 weeks`, status: wiStatus, trend: w.weighIns.trend },
  ];

  const habitItems: ComputedHabit[] = w.habits.items.map((h) => ({
    ...h,
    pct: h.outOf > 0 ? h.hits / h.outOf : 0,
    status: band(h.hits, ...T.habitEach),
  }));

  const pace = paceStatus(w.bodyweight.changeKg, w.bodyweight.currentKg, w.client.goal);
  const energy = energyBalance(w.bodyweight.changeKg, w.client.maintenanceKcal, w.nutrition.loggedKcal);

  const weekendDrop = w.steps.weekendAvg < 0.6 * w.steps.weekdayAvg;
  const energyFlagText = energy.flagged
    ? `Flag for your coach: likely under-logging ~${energy.underLog} kcal${weekendDrop ? " on weekends" : ""}.`
    : "";

  // Claude-written copy when available (stored on the week); else deterministic templates.
  const recon = reconcile(w, wStatus, pace, cards);
  const n = w.narratives;

  return {
    goalLabel: GOAL_LABEL[w.client.goal],
    gutLabel: GUT_LABEL[w.gutRead],
    cards,
    habitItems,
    pace,
    energy,
    energyFlagText,
    bodyweightNarrative: n?.bodyweight ?? bodyweightNarrative(w, pace),
    energyNarrative: n?.energy ?? energyNarrative(w, energy),
    reconcile: n ? { ...recon, title: n.reconcileTitle, body: n.reconcileBody } : recon,
  };
}

/** Gut-read vs data — never overrides the client, only flags for the coach. */
function reconcile(
  w: ClientWeek,
  workoutsStatus: Status,
  pace: Status,
  cards: ConsistencyCard[]
): { title: string; body: string; accent: string } {
  const anchorsGreen = workoutsStatus === "green" && pace === "green";
  const off = cards.filter((c) => c.status !== "green").map((c) => c.label.toLowerCase());
  const offList = humanList(off);
  const name = w.client.name;
  const gut = w.gutRead;

  if (gut === "green") {
    if (anchorsGreen) {
      return {
        title: `Reading the week: mostly Green`,
        body: `${name} called it Green. Training and weight back that up.${
          off.length ? ` ${capitalize(offList)} are flagged amber for your coach — not changed.` : ""
        }`,
        accent: STATUS_COLOR.green,
      };
    }
    return {
      title: `Your read looks a little optimistic`,
      body: `${name} called it Green, but ${offList} are off. Flagged for your coach to look at — your call stands.`,
      accent: STATUS_COLOR.amber,
    };
  }

  if (gut === "red" && anchorsGreen) {
    return {
      title: `Tougher than the data looks`,
      body: `${name} called it Red, yet training and weight held up. That gap is worth a conversation — flagged for your coach.`,
      accent: STATUS_COLOR.amber,
    };
  }

  return {
    title: `Reading the week: ${GUT_LABEL[gut]}`,
    body: off.length
      ? `${capitalize(offList)} are off this week. Flagged for your coach.`
      : `The data lines up with how ${name} felt.`,
    accent: gut === "red" ? STATUS_COLOR.red : STATUS_COLOR.amber,
  };
}
