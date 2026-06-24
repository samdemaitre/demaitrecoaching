// Weekly Review — persistence (Phase 3 + go-live).
// Dual-mode: uses a hosted Postgres database when POSTGRES_URL is set (production
// on Vercel), and a local JSON file store otherwise (development on your machine).
// The public API is identical in both modes, so nothing else in the app changes.
// Server-only.

import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { sql } from "@vercel/postgres";
import type { ClientWeek, Goal, Lift, Narratives, Status } from "./types";
import { sampleClientWeek } from "./sample-data";

const USE_PG = !!process.env.POSTGRES_URL;

const DATA_DIR = path.join(process.cwd(), "data", "weekly-review");
const CLIENTS_FILE = path.join(DATA_DIR, "clients.json");
const WEEKS_FILE = path.join(DATA_DIR, "weeks.json");

export interface ClientConfig {
  id: string;
  name: string;
  goal: Goal;
  maintenanceKcal: number;
  stepTarget: number;
  habits: string[];
  phone?: string;
}

export interface WeekMetrics {
  workouts: { done: number; planned: number };
  cardio: { done: number; planned: number };
  nutrition: { adherencePct: number; daysLogged: number; loggedKcal: number };
  steps: { avgPerDay: number; weekdayAvg: number; weekendAvg: number };
  weighIns: { thisWeek: number; last4wk: number };
  bodyweight: { currentKg: number; changeKg: number };
  habitHits: Record<string, number>;
  habitsNote?: string;
  lifts: Lift[];
}

export interface CheckInData {
  gutRead: Status;
  goal: Goal;
  effort?: number;
  nutritionDialed?: number;
  energy?: number;
  sleep?: number;
  appetite?: number;
  hunger?: number;
  liftsMovedUp?: string;
  weekendNote?: string;
  submittedAt: string;
}

export interface WeekRecord {
  token: string;
  clientId: string;
  weekOf: string;
  createdAt: string;
  metrics: WeekMetrics;
  checkIn?: CheckInData;
  narratives?: Narratives;
}

export function newToken(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

// ---- file backend -------------------------------------------------------------

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, data: unknown): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

// ---- postgres backend ---------------------------------------------------------

let tableReady = false;
async function pgEnsureTable() {
  if (tableReady) return;
  await sql`CREATE TABLE IF NOT EXISTS wr_records (
    kind text NOT NULL,
    id text NOT NULL,
    data jsonb NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (kind, id)
  )`;
  tableReady = true;
}

// ---- collection accessors (branch by backend) --------------------------------

async function loadClients(): Promise<ClientConfig[]> {
  if (USE_PG) {
    await pgEnsureTable();
    const { rows } = await sql`SELECT data FROM wr_records WHERE kind = 'client' ORDER BY created_at ASC`;
    return rows.map((r) => r.data as ClientConfig);
  }
  return readJson<ClientConfig[]>(CLIENTS_FILE, []);
}

async function insertClient(c: ClientConfig): Promise<void> {
  if (USE_PG) {
    await pgEnsureTable();
    await sql`INSERT INTO wr_records (kind, id, data) VALUES ('client', ${c.id}, ${JSON.stringify(c)}::jsonb)
              ON CONFLICT (kind, id) DO UPDATE SET data = EXCLUDED.data`;
    return;
  }
  const clients = await readJson<ClientConfig[]>(CLIENTS_FILE, []);
  await writeJson(CLIENTS_FILE, [...clients.filter((x) => x.id !== c.id), c]);
}

async function loadWeeks(): Promise<WeekRecord[]> {
  if (USE_PG) {
    await pgEnsureTable();
    const { rows } = await sql`SELECT data FROM wr_records WHERE kind = 'week' ORDER BY created_at DESC`;
    return rows.map((r) => r.data as WeekRecord);
  }
  const weeks = await readJson<WeekRecord[]>(WEEKS_FILE, []);
  return weeks.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

async function loadWeek(token: string): Promise<WeekRecord | undefined> {
  if (USE_PG) {
    await pgEnsureTable();
    const { rows } = await sql`SELECT data FROM wr_records WHERE kind = 'week' AND id = ${token} LIMIT 1`;
    return rows[0]?.data as WeekRecord | undefined;
  }
  return (await loadWeeks()).find((w) => w.token === token);
}

async function insertWeek(w: WeekRecord): Promise<void> {
  if (USE_PG) {
    await pgEnsureTable();
    await sql`INSERT INTO wr_records (kind, id, data, created_at) VALUES ('week', ${w.token}, ${JSON.stringify(w)}::jsonb, ${w.createdAt})
              ON CONFLICT (kind, id) DO UPDATE SET data = EXCLUDED.data`;
    return;
  }
  const weeks = await readJson<WeekRecord[]>(WEEKS_FILE, []);
  await writeJson(WEEKS_FILE, [...weeks.filter((x) => x.token !== w.token), w]);
}

async function patchCheckIn(token: string, ci: CheckInData): Promise<boolean> {
  if (USE_PG) {
    await pgEnsureTable();
    const { rowCount } = await sql`UPDATE wr_records SET data = jsonb_set(data, '{checkIn}', ${JSON.stringify(ci)}::jsonb, true)
                                   WHERE kind = 'week' AND id = ${token}`;
    return (rowCount ?? 0) > 0;
  }
  const weeks = await readJson<WeekRecord[]>(WEEKS_FILE, []);
  const idx = weeks.findIndex((w) => w.token === token);
  if (idx === -1) return false;
  weeks[idx] = { ...weeks[idx], checkIn: ci };
  await writeJson(WEEKS_FILE, weeks);
  return true;
}

async function patchNarratives(token: string, n: Narratives): Promise<boolean> {
  if (USE_PG) {
    await pgEnsureTable();
    const { rowCount } = await sql`UPDATE wr_records SET data = jsonb_set(data, '{narratives}', ${JSON.stringify(n)}::jsonb, true)
                                   WHERE kind = 'week' AND id = ${token}`;
    return (rowCount ?? 0) > 0;
  }
  const weeks = await readJson<WeekRecord[]>(WEEKS_FILE, []);
  const idx = weeks.findIndex((w) => w.token === token);
  if (idx === -1) return false;
  weeks[idx] = { ...weeks[idx], narratives: n };
  await writeJson(WEEKS_FILE, weeks);
  return true;
}

// ---- seed ---------------------------------------------------------------------

let seeded = false;
async function ensureSeed() {
  if (seeded) return;
  const clients = await loadClients();
  if (clients.length === 0) {
    const s = sampleClientWeek;
    const jordan: ClientConfig = {
      id: "jordan",
      name: s.client.name,
      goal: s.client.goal,
      maintenanceKcal: s.client.maintenanceKcal,
      stepTarget: s.steps.target,
      habits: s.habits.items.map((h) => h.name),
      phone: "",
    };
    await insertClient(jordan);

    const habitHits: Record<string, number> = {};
    s.habits.items.forEach((h) => (habitHits[h.name] = h.hits));
    const demoWeek: WeekRecord = {
      token: "demo",
      clientId: "jordan",
      weekOf: s.weekOf,
      createdAt: new Date().toISOString(),
      metrics: {
        workouts: s.workouts,
        cardio: s.cardio,
        nutrition: { adherencePct: s.nutrition.adherencePct, daysLogged: s.nutrition.daysLogged, loggedKcal: s.nutrition.loggedKcal },
        steps: { avgPerDay: s.steps.avgPerDay, weekdayAvg: s.steps.weekdayAvg, weekendAvg: s.steps.weekendAvg },
        weighIns: s.weighIns,
        bodyweight: { currentKg: s.bodyweight.currentKg, changeKg: s.bodyweight.changeKg },
        habitHits,
        habitsNote: s.habits.note,
        lifts: s.lifts,
      },
      checkIn: {
        gutRead: s.gutRead,
        goal: s.client.goal,
        effort: s.subjective.effort,
        nutritionDialed: s.subjective.nutritionDialed,
        energy: s.subjective.energy,
        sleep: s.subjective.sleep,
        appetite: s.subjective.appetite,
        submittedAt: new Date().toISOString(),
      },
    };
    await insertWeek(demoWeek);
  }
  seeded = true;
}

// ---- public API ---------------------------------------------------------------

export async function listClients(): Promise<ClientConfig[]> {
  await ensureSeed();
  return loadClients();
}

export async function getClient(id: string): Promise<ClientConfig | undefined> {
  return (await listClients()).find((c) => c.id === id);
}

export async function addClient(input: Omit<ClientConfig, "id">): Promise<ClientConfig> {
  const clients = await listClients();
  const base = input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "client";
  let id = base;
  let n = 2;
  while (clients.some((c) => c.id === id)) id = `${base}-${n++}`;
  const client: ClientConfig = { ...input, id };
  await insertClient(client);
  return client;
}

export async function listWeeks(): Promise<WeekRecord[]> {
  await ensureSeed();
  return loadWeeks();
}

export async function listWeeksForClient(clientId: string): Promise<WeekRecord[]> {
  return (await listWeeks()).filter((w) => w.clientId === clientId);
}

export async function getWeekByToken(token: string): Promise<WeekRecord | undefined> {
  await ensureSeed();
  return loadWeek(token);
}

export async function createWeek(clientId: string, weekOf: string, metrics: WeekMetrics): Promise<WeekRecord> {
  const record: WeekRecord = { token: newToken(), clientId, weekOf, createdAt: new Date().toISOString(), metrics };
  await insertWeek(record);
  return record;
}

export async function saveCheckIn(token: string, data: CheckInData): Promise<boolean> {
  return patchCheckIn(token, data);
}

export async function saveNarratives(token: string, narratives: Narratives): Promise<boolean> {
  return patchNarratives(token, narratives);
}

// ---- assembly: WeekRecord -> ClientWeek (what the dashboard/engine consume) ----

function pct(done: number, planned: number): number {
  return planned > 0 ? Math.round((done / planned) * 100) : 0;
}

function buildTrends(history: WeekRecord[]) {
  const asc = [...history].sort((a, b) => a.createdAt.localeCompare(b.createdAt)).slice(-4);
  if (asc.length < 2) return {} as Record<string, number[]>;
  const habitsOverall = (m: WeekMetrics) => {
    const vals = Object.values(m.habitHits);
    if (!vals.length) return 0;
    return Math.round((vals.reduce((s, v) => s + v / 7, 0) / vals.length) * 100);
  };
  return {
    workouts: asc.map((w) => pct(w.metrics.workouts.done, w.metrics.workouts.planned)),
    cardio: asc.map((w) => pct(w.metrics.cardio.done, w.metrics.cardio.planned)),
    nutrition: asc.map((w) => w.metrics.nutrition.adherencePct),
    habits: asc.map((w) => habitsOverall(w.metrics)),
    steps: asc.map((w) => w.metrics.steps.avgPerDay),
    weighIns: asc.map((w) => w.metrics.weighIns.thisWeek),
  } as Record<string, number[]>;
}

export function assembleClientWeek(client: ClientConfig, record: WeekRecord, history: WeekRecord[] = []): ClientWeek {
  const m = record.metrics;
  const ci = record.checkIn;

  const habitVals = Object.values(m.habitHits);
  const overallPct = habitVals.length
    ? Math.round((habitVals.reduce((s, v) => s + v / 7, 0) / habitVals.length) * 100)
    : 0;

  const series = Array.from({ length: 7 }, (_, i) =>
    Math.round((m.bodyweight.currentKg - m.bodyweight.changeKg * (1 - i / 6)) * 10) / 10
  );

  const trends = buildTrends(history);

  return {
    client: { name: client.name, goal: ci?.goal ?? client.goal, maintenanceKcal: client.maintenanceKcal },
    weekOf: record.weekOf,
    gutRead: ci?.gutRead ?? "amber",
    workouts: { ...m.workouts, trend: trends.workouts },
    cardio: { ...m.cardio, trend: trends.cardio },
    nutrition: { ...m.nutrition, trend: trends.nutrition },
    habits: {
      overallPct,
      note: m.habitsNote,
      trend: trends.habits,
      items: client.habits.map((name) => ({ name, hits: m.habitHits[name] ?? 0, outOf: 7 })),
    },
    steps: {
      avgPerDay: m.steps.avgPerDay,
      target: client.stepTarget,
      weekdayAvg: m.steps.weekdayAvg,
      weekendAvg: m.steps.weekendAvg,
      trend: trends.steps,
    },
    weighIns: { ...m.weighIns, trend: trends.weighIns },
    bodyweight: { currentKg: m.bodyweight.currentKg, changeKg: m.bodyweight.changeKg, series },
    lifts: m.lifts,
    subjective: {
      effort: ci?.effort ?? 0,
      nutritionDialed: ci?.nutritionDialed ?? 0,
      energy: ci?.energy ?? 0,
      sleep: ci?.sleep ?? 0,
      appetite: ci?.appetite,
      followUps: ci?.weekendNote ? { weekendSteps: ci.weekendNote } : undefined,
    },
    narratives: record.narratives,
  };
}

export async function getClientWeekByToken(token: string): Promise<ClientWeek | undefined> {
  const record = await getWeekByToken(token);
  if (!record) return undefined;
  const client = await getClient(record.clientId);
  if (!client) return undefined;
  const history = await listWeeksForClient(record.clientId);
  return assembleClientWeek(client, record, history);
}
