import { NextResponse } from "next/server";
import { saveCheckIn, saveNarratives, getClientWeekByToken, type CheckInData } from "@/lib/weekly-review/store";
import { computeWeek } from "@/lib/weekly-review/rules";
import { generateNarratives } from "@/lib/weekly-review/narratives";
import type { Goal, Status } from "@/lib/weekly-review/types";

const STATUSES: Status[] = ["green", "amber", "red"];
const GOALS: Goal[] = ["fatloss", "muscle", "leanbulk", "recomp"];
const numOrU = (v: unknown): number | undefined => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

// Phase 2/3: the client check-in posts its subjective answers here; we persist
// them onto the week record so the dashboard reflects the real submission.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const token = String(body.token ?? "");
  const gutRead = STATUSES.find((s) => s === body.gutRead);
  const goal = GOALS.find((g) => g === body.goal);
  if (!token || !gutRead || !goal) {
    return NextResponse.json({ ok: false, error: "missing token/gutRead/goal" }, { status: 400 });
  }

  const data: CheckInData = {
    gutRead,
    goal,
    effort: numOrU(body.effort),
    nutritionDialed: numOrU(body.nutritionDialed),
    energy: numOrU(body.energy),
    sleep: numOrU(body.sleep),
    appetite: numOrU(body.appetite),
    hunger: numOrU(body.hunger),
    liftsMovedUp: typeof body.liftsMovedUp === "string" ? body.liftsMovedUp : undefined,
    weekendNote: typeof body.weekendNote === "string" && body.weekendNote.trim() ? body.weekendNote.trim() : undefined,
    submittedAt: new Date().toISOString(),
  };

  const ok = await saveCheckIn(token, data);

  // With the check-in saved, generate the brand-voice dashboard copy from the
  // computed numbers and store it. Best-effort: on any failure the dashboard
  // falls back to the deterministic templates.
  if (ok) {
    try {
      const week = await getClientWeekByToken(token);
      if (week) {
        const narratives = await generateNarratives(week, computeWeek(week));
        if (narratives) await saveNarratives(token, narratives);
      }
    } catch {
      // non-fatal
    }
  }

  return NextResponse.json({ ok }, { status: ok ? 200 : 404 });
}
