// Weekly Review — sample data (the "Jordan" example from the reference deck).
// Used to seed the store on first run; thereafter data comes from the store
// (manual admin entry / the Trainerize API later).

import type { ClientWeek } from "./types";

export const sampleClientWeek: ClientWeek = {
  client: { name: "Jordan", goal: "leanbulk", maintenanceKcal: 2900 },
  weekOf: "Week of 16 June 2026",
  gutRead: "green",

  workouts: { done: 11, planned: 12, trend: [70, 78, 85, 92] },
  cardio: { done: 2, planned: 4, trend: [60, 40, 65, 50] },
  nutrition: { adherencePct: 82, daysLogged: 5.7, loggedKcal: 2780, trend: [72, 76, 80, 82] },
  habits: {
    overallPct: 48,
    note: "water and sleep slipping",
    trend: [62, 55, 50, 48],
    items: [
      { name: "3L water", hits: 6, outOf: 7 },
      { name: "Protein target", hits: 6, outOf: 7 },
      { name: "10k steps", hits: 3, outOf: 7 },
      { name: "7 hrs sleep", hits: 2, outOf: 7 },
      { name: "Creatine", hits: 7, outOf: 7 },
      { name: "No phone in bed", hits: 2, outOf: 7 },
    ],
  },
  steps: { avgPerDay: 8240, target: 10000, weekdayAvg: 9300, weekendAvg: 5100, trend: [8600, 7900, 8500, 8240] },
  weighIns: { thisWeek: 4.5, last4wk: 18, trend: [5, 4, 5, 4.5] },
  bodyweight: { currentKg: 84.2, changeKg: 0.3, series: [83.9, 83.95, 84.0, 84.05, 84.1, 84.15, 84.2] },
  lifts: [
    { name: "Flat Machine Chest Press", prev: "100kg x 8", curr: "105kg x 7" },
    { name: "Standing Rope Pushdown", prev: "77kg x 11", curr: "80kg x 13" },
  ],

  subjective: {
    effort: 8,
    nutritionDialed: 7,
    energy: 6,
    sleep: 5,
    appetite: 7,
    followUps: { weekendSteps: "Busy with family on weekends, a lot less walking than weekdays." },
  },
};
