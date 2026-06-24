# De Maître — Weekly Review System (build-ready spec)

A weekly "check-in → instant feedback dashboard" for coaching clients, modeled on the
Trainerize-style system in the reference screenshots, rebuilt in the De Maître brand.

Two halves:
1. **Conversational check-in** — a multi-step form that feels like a chat and captures the
   client's subjective read of the week.
2. **Feedback Dashboard** — generated on submit, showing the client their week back to them
   (data + self-report reconciled), with flags surfaced to the coach.

A live branded prototype of the dashboard was shown in chat (the `demaitre_weekly_feedback_dashboard` widget).

---

## Locked decisions (2026-06-23)

| # | Decision | Choice |
|---|----------|--------|
| Plan | Trainerize plan | Pro/Grow — **no API**. Data layer = manual bridge, API-swappable later. |
| 1 | Habit list | Example set: 3L water, Protein target, 10k steps, 7 hrs sleep, Creatine, No phone in bed |
| 2 | Targets/thresholds | Use defaults below |
| 3 | TDEE | Coach sets an estimated maintenance per client |
| 4 | Tracked metrics | Example set: workouts, cardio, nutrition log, steps, weigh-ins, calories, key lifts |
| 5 | Delivery | WhatsApp link |
| 6 | Language | English |
| 7 | Narrative copy | Dynamic (Claude API writes copy; numbers always computed in code) |

---

## Architecture

Build on the existing stack: Next.js 14 + Tailwind + Framer Motion + react-hook-form (this repo).

Four modules:

1. **Check-in flow** — multi-step form, one question per screen, Framer Motion transitions.
2. **Data layer** — single `getClientWeek(clientId, week)` returning a normalized `ClientWeek`
   object. Today filled by a manual admin form (~12 fields, pre-filled from last week).
   Later swappable to the Trainerize API (Studio/Enterprise) with no downstream change.
3. **Rules engine** — computes green/amber/red per metric, detects trends, fires threshold
   follow-ups, reconciles gut-read vs data, generates coach flags. All math deterministic.
4. **Dashboard renderer** — branded page (cream/ink/gold) with sparkline cards, habit bars,
   dark bodyweight chart, energy-balance block, reconciliation card.

Delivery: each client gets a tokenized weekly link sent via WhatsApp; coach gets a flag summary.

### Brand tokens (from tailwind.config.ts)
cream `#F7F2E8` · cream2 `#EDE5D4` · gold `#B8953E` · gold-pale `#F0E8D0` · ink `#1A1510` ·
text-soft `#6B5F50` · text-muted `#A8998A` · border `#D8CEBC`.
Status colors mapped to brand: **on track = sage `#6E8B5A`**, **watch = gold `#B8953E`**,
**off track = terracotta `#9B4E3A`**. Fonts: Cormorant (display serif), Montserrat (UI).

---

## Data contract — `ClientWeek`

```ts
type Status = 'green' | 'amber' | 'red';
type Goal = 'fatloss' | 'muscle' | 'leanbulk' | 'recomp';

interface ClientWeek {
  client:   { name: string; goal: Goal; maintenanceKcal: number };  // maintenance = coach-set TDEE
  gutRead:  Status;                  // from check-in, captured before any data shown
  workouts: { done: number; planned: number };
  cardio:   { done: number; planned: number };
  nutrition:{ daysLogged: number; loggedKcal: number };
  steps:    { avgPerDay: number; target: number; weekdayAvg: number; weekendAvg: number };
  weighIns: { thisWeek: number; last4wk: number };
  bodyweight:{ currentKg: number; changeKg: number; series: number[] };
  habits:   { name: string; hits: number; outOf: number }[];
  lifts:    { name: string; prev: string; curr: string }[];
  // subjective answers captured by the check-in flow
  subjective:{ effort: number; nutritionDialed: number; energy: number; sleep: number;
               appetite?: number; followUps: Record<string,string> };
}
```

Every block degrades gracefully: if a field is missing (client didn't log steps/calories
that week), show "not tracked this week" instead of a fabricated number.

### Manual entry sources (Pro plan)
workouts/cardio → client calendar · nutrition days + kcal → nutrition tab · steps → connected
tracker · weigh-ins/bodyweight → body stats · habits → habit tracker · lifts → workout history ·
maintenanceKcal → coach estimate.

---

## Rules engine

### Consistency thresholds (defaults, tunable)
| Metric | Green | Amber | Red |
|--------|-------|-------|-----|
| Workouts % | ≥85 | 60–84 | <60 |
| Cardio % | ≥80 | 40–79 | <40 |
| Nutrition log days/wk | ≥6 | 4–5 | <4 |
| Steps vs target | ≥90% | 60–89% | <60% |
| Weigh-ins/wk | ≥4 | 2–3 | <2 |
| Habit (each, x/7) | 6–7 | 3–5 | <3 |

### Bodyweight pace (goal-dependent, weekly %)
- Lean bulk: green +0.2 to +0.5% · amber 0 to +0.2 or >+0.5 · red losing
- Fat loss: green −0.5 to −1.0% · amber −0.2 to −0.5 or >−1.0 · red gaining/flat
- Recomp/maintenance: green ±0.2% · amber ±0.2–0.5% · red beyond

### Energy balance "real maths" (deterministic — never let AI compute)
```
dailySurplus = (changeKg * 7700) / 7            // 7700 kcal per kg
realIntake   = maintenanceKcal + dailySurplus
underLog     = realIntake - loggedKcal
if (underLog > 250) flag(`likely under-logging ~${round(underLog)} kcal`)
```
Worked example: change +0.3kg → surplus ≈ +330/day → real ≈ 2,900 + 330 ≈ 3,230 → logged 2,780 → ~450 under-logged → "real intake closer to 3,100".

### Reconciliation (gut-read vs data) — never overrides client, only flags coach
- Said Green but data majority amber/red → optimism flag
- Said Red but data majority green → confidence/mood flag
- Otherwise → "agrees", no flag

### Coach flags (rule-driven)
under-logging (>250 kcal gap) · weekend drop-off (weekendAvg < 60% weekdayAvg) ·
sleep red · weight off-pace for goal · gut-read mismatch · missing data.

---

## Check-in flow

```
1. Warm open        → name + goal shown (from client record)
2. Gut read         → Green / Amber / Red          [ROUTES everything below]
3. Goal confirm     → Fat Loss / Muscle / Lean Bulk / Recomp   [BRANCHES questions]
4. "Loading metrics" → builds the ClientWeek object
5. Training         → effort 1–10  (+ shows real sessions / RPE / lifts)
6. Nutrition        → dialed 1–10  (+ shows avg kcal / off-target days)
7. Steps            → shown avg; if weekendAvg < 60% weekdayAvg → follow-up text
8. Recovery         → energy + sleep 1–10
9. Goal-specific    → leanbulk/muscle: "Did the lifts move up?" + appetite 1–10
                       fatloss: "Hunger manageable?" + "Weekend control?"
                       recomp: both, lighter
10. Done            → dashboard link
```
Follow-ups are threshold-triggered (see rules engine). Copy is generated dynamically by Claude
from the computed status object — numbers in code, phrasing by the LLM, in De Maître brand voice.

---

## Phasing
- **Phase 1** — Feedback Dashboard as a branded template fed by sample numbers. *(Prototype shown.)*
- **Phase 2** — conversational check-in flow capturing subjective answers + storing submissions.
- **Phase 3** — admin form for fast weekly data entry; tokenized WhatsApp links; coach flag inbox.
- **Phase 4** — goal-based branching, threshold follow-ups, Claude narratives, multi-client admin.
  (API auto-pull drops in here cleanly if the Trainerize plan is ever upgraded.)

---

## Disclaimers (required, in footer)
- "Results referenced are from individual clients and are not a guarantee of future results."
- "Data shown is from your Trainerize account. Not affiliated with or endorsed by Trainerize."
