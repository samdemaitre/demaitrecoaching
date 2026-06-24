// Weekly Review — dynamic, Claude-written dashboard copy.
// Numbers are ALWAYS computed in code (rules.ts); Claude only phrases them in the
// De Maître brand voice. Runs once when the client submits their check-in; the
// result is stored on the week, so dashboards render instantly. If there is no
// API key, or the call fails/times out, the caller falls back to the deterministic
// templates in rules.ts. Server-only.

import Anthropic from "@anthropic-ai/sdk";
import type { ClientWeek, Narratives } from "./types";
import type { ComputedWeek } from "./rules";

// Haiku 4.5: fast + capable for short brand-voice phrasing. This runs synchronously
// inside the check-in request, so latency matters; override with WEEKLY_REVIEW_MODEL.
const MODEL = process.env.WEEKLY_REVIEW_MODEL || "claude-haiku-4-5";

const SYSTEM = `You are the voice of De Maître Coaching writing a client's weekly review dashboard.

Voice: warm but direct, honest, encouraging without flattery — a coach who respects the client. Plain British English. Second person ("you"). No emoji, no hashtags, no exclamation marks, no clichés ("crushing it", "smashed it"). Concise.

Hard rules:
- Use ONLY the numbers given to you in the facts. Never invent, round differently, or alter a figure.
- Do not contradict a metric's status (green = on track, amber = watch, red = off track).
- The reconciliation must respect the client's own gut read: never overrule it — if the data disagrees, note it as something flagged for the coach, not changed.
- bodyweight: 1–2 sentences reading the weekly weight change against the goal.
- energy: 1–2 sentences on logged vs burned calories and what the real intake implies; mention the flag plainly if one is given.
- reconcileTitle: a short heading, 3–6 words, no full stop.
- reconcileBody: 1–2 sentences reconciling the gut read with the data.

Return your answer by calling the emit_narratives tool.`;

const TOOL: Anthropic.Tool = {
  name: "emit_narratives",
  description: "Return the four brand-voice narrative strings for the weekly dashboard.",
  input_schema: {
    type: "object",
    properties: {
      bodyweight: { type: "string" },
      energy: { type: "string" },
      reconcileTitle: { type: "string" },
      reconcileBody: { type: "string" },
    },
    required: ["bodyweight", "energy", "reconcileTitle", "reconcileBody"],
  },
};

function buildFacts(week: ClientWeek, c: ComputedWeek) {
  return {
    client: { name: week.client.name, goal: c.goalLabel },
    gutRead: c.gutLabel,
    consistency: c.cards.map((card) => ({ metric: card.label, value: card.display, status: card.status, detail: card.sub })),
    bodyweight: {
      currentKg: week.bodyweight.currentKg,
      changeThisWeekKg: week.bodyweight.changeKg,
      paceStatus: c.pace,
    },
    energyBalance: {
      loggedKcalPerDay: week.nutrition.loggedKcal,
      burnedKcalPerDay: week.client.maintenanceKcal,
      estimatedRealIntakeKcal: c.energy.realIntake,
      underLoggingKcal: c.energy.flagged ? c.energy.underLog : 0,
      coachFlag: c.energyFlagText || null,
    },
    subjectiveOutOf10: {
      effort: week.subjective.effort || null,
      nutrition: week.subjective.nutritionDialed || null,
      energy: week.subjective.energy || null,
      sleep: week.subjective.sleep || null,
    },
    offTrackMetrics: c.cards.filter((card) => card.status !== "green").map((card) => card.label),
  };
}

export async function generateNarratives(week: ClientWeek, computed: ComputedWeek): Promise<Narratives | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null;

  try {
    const client = new Anthropic({ timeout: 12000, maxRetries: 0 });
    const facts = buildFacts(week, computed);

    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM,
      tools: [TOOL],
      tool_choice: { type: "tool", name: "emit_narratives" },
      messages: [
        {
          role: "user",
          content: `Write this week's dashboard copy from these facts:\n\n${JSON.stringify(facts, null, 2)}`,
        },
      ],
    });

    const block = message.content.find((b) => b.type === "tool_use");
    if (!block || block.type !== "tool_use") return null;
    const out = block.input as Partial<Narratives>;
    if (!out.bodyweight || !out.energy || !out.reconcileTitle || !out.reconcileBody) return null;

    return {
      bodyweight: out.bodyweight,
      energy: out.energy,
      reconcileTitle: out.reconcileTitle,
      reconcileBody: out.reconcileBody,
    };
  } catch {
    // Best-effort: dashboard falls back to deterministic templates.
    return null;
  }
}
