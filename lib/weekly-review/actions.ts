"use server";

// Weekly Review — server actions for the coach admin (Phase 3).

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Goal } from "./types";
import { addClient, createWeek, getClient, type WeekMetrics } from "./store";

const GOALS: Goal[] = ["fatloss", "muscle", "leanbulk", "recomp"];
const num = (v: FormDataEntryValue | null, fallback = 0): number => {
  const n = parseFloat(String(v ?? ""));
  return Number.isFinite(n) ? n : fallback;
};
const str = (v: FormDataEntryValue | null): string => String(v ?? "").trim();

export async function addClientAction(formData: FormData) {
  const name = str(formData.get("name"));
  if (!name) return;
  const goal = (GOALS.find((g) => g === formData.get("goal")) ?? "leanbulk") as Goal;
  const habits = str(formData.get("habits"))
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean);

  const client = await addClient({
    name,
    goal,
    maintenanceKcal: num(formData.get("maintenanceKcal"), 2500),
    stepTarget: num(formData.get("stepTarget"), 10000),
    habits: habits.length ? habits : ["3L water", "Protein target", "10k steps", "7 hrs sleep"],
    phone: str(formData.get("phone")),
  });

  revalidatePath("/admin");
  redirect(`/admin/client/${client.id}`);
}

export async function createWeekAction(formData: FormData) {
  const clientId = str(formData.get("clientId"));
  const client = await getClient(clientId);
  if (!client) return;

  const habitHits: Record<string, number> = {};
  for (const h of client.habits) habitHits[h] = num(formData.get(`habit__${h}`));

  const lifts = [1, 2, 3]
    .map((i) => ({
      name: str(formData.get(`lift${i}name`)),
      prev: str(formData.get(`lift${i}prev`)),
      curr: str(formData.get(`lift${i}curr`)),
    }))
    .filter((l) => l.name);

  const metrics: WeekMetrics = {
    workouts: { done: num(formData.get("workoutsDone")), planned: num(formData.get("workoutsPlanned")) },
    cardio: { done: num(formData.get("cardioDone")), planned: num(formData.get("cardioPlanned")) },
    nutrition: {
      adherencePct: num(formData.get("nutritionAdherence")),
      daysLogged: num(formData.get("nutritionDays")),
      loggedKcal: num(formData.get("loggedKcal")),
    },
    steps: {
      avgPerDay: num(formData.get("stepsAvg")),
      weekdayAvg: num(formData.get("stepsWeekday")),
      weekendAvg: num(formData.get("stepsWeekend")),
    },
    weighIns: { thisWeek: num(formData.get("weighInsThisWeek")), last4wk: num(formData.get("weighInsLast4")) },
    bodyweight: { currentKg: num(formData.get("bwCurrent")), changeKg: num(formData.get("bwChange")) },
    habitHits,
    habitsNote: str(formData.get("habitsNote")) || undefined,
    lifts,
  };

  const weekOf = str(formData.get("weekOf")) || `Week of ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`;
  await createWeek(clientId, weekOf, metrics);

  revalidatePath(`/admin/client/${clientId}`);
  revalidatePath("/admin");
  redirect(`/admin/client/${clientId}`);
}
