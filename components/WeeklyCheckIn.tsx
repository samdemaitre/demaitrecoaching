"use client";

// Weekly Review — conversational check-in (Phase 2).
// A multi-step, chat-like flow: gut read first (routes), then goal (branches),
// then data-fed subjective questions. On finish it hands the client's gut-read +
// goal to the dashboard via query params. Phase 3 persists the full answer set.

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ClientWeek, Goal, Status } from "@/lib/weekly-review/types";
import { STATUS_COLOR } from "@/lib/weekly-review/rules";

interface Answers {
  gutRead?: Status;
  goal: Goal;
  effort?: number;
  nutritionDialed?: number;
  energy?: number;
  sleep?: number;
  appetite?: number;
  hunger?: number;
  liftsMovedUp?: string;
  weekendNote: string;
}

const GOAL_OPTIONS: { value: Goal; title: string; desc: string }[] = [
  { value: "fatloss", title: "Fat loss", desc: "Losing body fat" },
  { value: "muscle", title: "Muscle building", desc: "Adding muscle" },
  { value: "leanbulk", title: "Lean bulk", desc: "Controlled gain" },
  { value: "recomp", title: "Body recomp", desc: "Lose fat, hold muscle" },
];

const METRIC_CHECKLIST = [
  "Last 7 days of training",
  "Nutrition and macros",
  "Steps and activity",
  "Habits and streaks",
  "Checking for new PRs",
];

export default function WeeklyCheckIn({ week, token }: { week: ClientWeek; token: string }) {
  const router = useRouter();
  const [i, setI] = useState(0);
  const [a, setA] = useState<Answers>({ goal: week.client.goal, weekendNote: "" });

  const weekendDrop = week.steps.weekendAvg < 0.6 * week.steps.weekdayAvg;

  const goalSteps = useMemo<string[]>(() => {
    if (a.goal === "fatloss") return ["hunger"];
    if (a.goal === "recomp") return ["lifts"];
    return ["lifts", "appetite"]; // muscle / leanbulk
  }, [a.goal]);

  const order = useMemo<string[]>(
    () => [
      "intro",
      "gut",
      "goal",
      "loading",
      "training",
      "nutrition",
      "steps",
      ...(weekendDrop ? ["weekend"] : []),
      "recovery",
      ...goalSteps,
      "done",
    ],
    [weekendDrop, goalSteps]
  );

  const key = order[Math.min(i, order.length - 1)];
  const set = (patch: Partial<Answers>) => setA((prev) => ({ ...prev, ...patch }));
  const next = () => setI((v) => Math.min(v + 1, order.length - 1));
  const back = () => setI((v) => Math.max(v - 1, 0));

  // "Got your metrics" auto-advances.
  useEffect(() => {
    if (key !== "loading") return;
    const t = setTimeout(() => setI((v) => v + 1), 1700);
    return () => clearTimeout(t);
  }, [key]);

  const [submitting, setSubmitting] = useState(false);
  const finish = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/weekly-review/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          gutRead: a.gutRead ?? week.gutRead,
          goal: a.goal,
          effort: a.effort,
          nutritionDialed: a.nutritionDialed,
          energy: a.energy,
          sleep: a.sleep,
          appetite: a.appetite,
          hunger: a.hunger,
          liftsMovedUp: a.liftsMovedUp,
          weekendNote: a.weekendNote,
        }),
      });
    } catch {
      // Best-effort: still show the client their dashboard.
    }
    router.push(`/review/${token}`);
  };

  const canNext = (() => {
    switch (key) {
      case "gut": return !!a.gutRead;
      case "training": return !!a.effort;
      case "nutrition": return !!a.nutritionDialed;
      case "recovery": return !!a.energy && !!a.sleep;
      case "lifts": return !!a.liftsMovedUp;
      case "appetite": return !!a.appetite;
      case "hunger": return !!a.hunger;
      default: return true;
    }
  })();

  const progress = Math.round((i / (order.length - 1)) * 100);

  return (
    <div className="min-h-screen bg-cream font-montserrat" style={{ padding: "32px 16px" }}>
      <div className="mx-auto" style={{ maxWidth: 460 }}>
        {/* Header bar */}
        <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
          <span className="text-text" style={{ fontSize: 13, fontWeight: 500 }}>De Maître Coaching</span>
          <span className="uppercase text-gold" style={{ fontSize: 10, letterSpacing: "0.18em" }}>Weekly check-in</span>
        </div>
        {/* Progress */}
        <div style={{ height: 4, background: "var(--cream2)", borderRadius: 999, overflow: "hidden", marginBottom: 22 }}>
          <div style={{ height: 4, width: `${progress}%`, background: "var(--gold)", borderRadius: 999, transition: "width 0.3s ease" }} />
        </div>

        {/* Card */}
        <div className="bg-white" style={{ border: "0.5px solid var(--border-soft)", borderRadius: 20, padding: "24px 22px", minHeight: 360, display: "flex", flexDirection: "column" }}>
          <div key={key} className="dm-step" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {renderStep()}
          </div>
        </div>
        <style>{`.dm-step{animation:dmStepIn .28s ease both}@keyframes dmStepIn{from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:none}}`}</style>
      </div>
    </div>
  );

  function renderStep() {
    switch (key) {
      case "intro":
        return (
          <StepShell eyebrow="Weekly check-in" title={`Hey ${week.client.name}, how has your week been?`} sub="This takes about three minutes. As you go, your real training and nutrition from Trainerize load in alongside your answers — so this is a conversation, not a form.">
            <Spacer />
            <PrimaryButton onClick={next}>Let us go</PrimaryButton>
          </StepShell>
        );

      case "gut":
        return (
          <StepShell eyebrow="First, your gut read" title="How would you sum up the week?" sub="Go with your instinct, before you see any numbers.">
            <Choice selected={a.gutRead === "green"} dot={STATUS_COLOR.green} title="Green" desc="Strong week. Felt in control." onClick={() => set({ gutRead: "green" })} />
            <Choice selected={a.gutRead === "amber"} dot={STATUS_COLOR.amber} title="Amber" desc="Mixed. Some good, some not." onClick={() => set({ gutRead: "amber" })} />
            <Choice selected={a.gutRead === "red"} dot={STATUS_COLOR.red} title="Red" desc="Tough one. Worth taking stock." onClick={() => set({ gutRead: "red" })} />
            <Spacer />
            <Nav onBack={back} onNext={next} canNext={canNext} />
          </StepShell>
        );

      case "goal":
        return (
          <StepShell eyebrow="What are we working towards" title="Your focus right now" sub="This shapes the questions and how we read your numbers.">
            {GOAL_OPTIONS.map((g) => (
              <Choice key={g.value} selected={a.goal === g.value} title={g.title} desc={g.desc} onClick={() => set({ goal: g.value })} />
            ))}
            <Spacer />
            <Nav onBack={back} onNext={next} canNext={canNext} />
          </StepShell>
        );

      case "loading":
        return (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <Spinner />
            <h2 className="font-cormorant text-text" style={{ fontSize: 24, margin: "16px 0 14px" }}>Got your metrics</h2>
            <div style={{ textAlign: "left" }}>
              {METRIC_CHECKLIST.map((m) => (
                <div key={m} className="flex items-center gap-2" style={{ margin: "7px 0" }}>
                  <Check />
                  <span className="text-text-soft" style={{ fontSize: 13 }}>{m}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "training":
        return (
          <StepShell eyebrow="Your training" title="How hard did you push this week?">
            <Context>{week.workouts.done} of {week.workouts.planned} sessions logged. Top lift: {week.lifts[0]?.name} {week.lifts[0]?.prev} → {week.lifts[0]?.curr}.</Context>
            <Scale value={a.effort} onChange={(n) => set({ effort: n })} low="Cruised" high="Maxed out" />
            <Spacer />
            <Nav onBack={back} onNext={next} canNext={canNext} />
          </StepShell>
        );

      case "nutrition":
        return (
          <StepShell eyebrow="Your nutrition" title="How dialed was your nutrition?">
            <Context>{week.nutrition.daysLogged} days logged, averaging {week.nutrition.loggedKcal.toLocaleString("en-US")} kcal.</Context>
            <Scale value={a.nutritionDialed} onChange={(n) => set({ nutritionDialed: n })} low="All over" high="Locked in" />
            <Spacer />
            <Nav onBack={back} onNext={next} canNext={canNext} />
          </StepShell>
        );

      case "steps":
        return (
          <StepShell eyebrow="Your movement" title="Your steps this week" sub="Straight from your watch — no need to remember the number.">
            <Context>{week.steps.avgPerDay.toLocaleString("en-US")} avg a day · weekdays {week.steps.weekdayAvg.toLocaleString("en-US")} · weekends {week.steps.weekendAvg.toLocaleString("en-US")}.</Context>
            <Spacer />
            <Nav onBack={back} onNext={next} canNext={canNext} />
          </StepShell>
        );

      case "weekend":
        return (
          <StepShell eyebrow="A closer look" title="Those weekend steps" sub="Your weekdays average well, but it drops off by the weekend.">
            <textarea
              value={a.weekendNote}
              onChange={(e) => set({ weekendNote: e.target.value })}
              placeholder="No judgement — just helps me understand the week with you."
              style={{ width: "100%", minHeight: 96, borderRadius: 12, border: "0.5px solid var(--border)", padding: "10px 12px", fontSize: 13, fontFamily: "inherit", resize: "vertical", color: "var(--text)" }}
            />
            <Spacer />
            <Nav onBack={back} onNext={next} canNext={canNext} />
          </StepShell>
        );

      case "recovery":
        return (
          <StepShell eyebrow="Recovery" title="How have you recovered?">
            <Label>Energy</Label>
            <Scale value={a.energy} onChange={(n) => set({ energy: n })} low="Running on empty" high="Full tank" />
            <Label>Sleep</Label>
            <Scale value={a.sleep} onChange={(n) => set({ sleep: n })} low="Broken" high="Solid" />
            <Spacer />
            <Nav onBack={back} onNext={next} canNext={canNext} />
          </StepShell>
        );

      case "lifts":
        return (
          <StepShell eyebrow="Lean mass focus" title="Did the lifts move up?">
            <Context>
              {week.lifts.map((l) => (
                <span key={l.name} style={{ display: "block" }}>{l.name}: {l.prev} → {l.curr}</span>
              ))}
            </Context>
            <Choice selected={a.liftsMovedUp === "yes"} title="Yes, most lifts" onClick={() => set({ liftsMovedUp: "yes" })} />
            <Choice selected={a.liftsMovedUp === "some"} title="Some of them" onClick={() => set({ liftsMovedUp: "some" })} />
            <Choice selected={a.liftsMovedUp === "no"} title="Not really" onClick={() => set({ liftsMovedUp: "no" })} />
            <Spacer />
            <Nav onBack={back} onNext={next} canNext={canNext} />
          </StepShell>
        );

      case "appetite":
        return (
          <StepShell eyebrow="Fuelling" title="How is your appetite for the calories?">
            <Scale value={a.appetite} onChange={(n) => set({ appetite: n })} low="No appetite" high="Always hungry" />
            <Spacer />
            <Nav onBack={back} onNext={next} canNext={canNext} />
          </StepShell>
        );

      case "hunger":
        return (
          <StepShell eyebrow="Fat loss check" title="Was hunger manageable?">
            <Scale value={a.hunger} onChange={(n) => set({ hunger: n })} low="Starving" high="Comfortable" />
            <Spacer />
            <Nav onBack={back} onNext={next} canNext={canNext} />
          </StepShell>
        );

      case "done":
      default:
        return (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div className="flex items-center justify-center" style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--gold-pale)" }}>
              <Check size={26} />
            </div>
            <h2 className="font-cormorant text-text" style={{ fontSize: 26, margin: "16px 0 8px" }}>Done. Your week is ready.</h2>
            <p className="text-text-soft" style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 22 }}>
              I have turned everything into your feedback dashboard — your week, back at you.
            </p>
            <PrimaryButton onClick={finish} disabled={submitting}>{submitting ? "Saving…" : "See my week"}</PrimaryButton>
          </div>
        );
    }
  }
}

// ---- Presentational helpers ---------------------------------------------------

function StepShell({ eyebrow, title, sub, children }: { eyebrow?: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {eyebrow && <div className="uppercase text-gold" style={{ fontSize: 11, letterSpacing: "0.16em", marginBottom: 8 }}>{eyebrow}</div>}
      <h2 className="font-cormorant text-text" style={{ fontSize: 25, lineHeight: 1.2, marginBottom: sub ? 8 : 18 }}>{title}</h2>
      {sub && <p className="text-text-soft" style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 18 }}>{sub}</p>}
      {children}
    </div>
  );
}

function Context({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--gold-pale)", border: "0.5px solid #E0D2A8", borderRadius: 12, padding: "10px 12px", marginBottom: 18 }}>
      <div className="uppercase" style={{ fontSize: 11, letterSpacing: "0.12em", color: "#9a7d2f", marginBottom: 4 }}>Pulled from Trainerize</div>
      <div style={{ fontSize: 13, color: "#5f4e24", lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-text" style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>{children}</div>;
}

function Scale({ value, onChange, low, high }: { value?: number; onChange: (n: number) => void; low?: string; high?: string }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div className="flex" style={{ gap: 6, flexWrap: "wrap" }}>
        {Array.from({ length: 10 }, (_, k) => k + 1).map((n) => {
          const sel = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              style={{ flex: "1 0 auto", minWidth: 28, height: 38, borderRadius: 9, fontSize: 14, fontWeight: 500, cursor: "pointer", border: sel ? "1px solid var(--gold)" : "0.5px solid var(--border)", background: sel ? "var(--gold)" : "#fff", color: sel ? "#fff" : "var(--text)" }}
            >
              {n}
            </button>
          );
        })}
      </div>
      {(low || high) && (
        <div className="flex justify-between text-text-muted" style={{ fontSize: 11, marginTop: 6 }}>
          <span>{low}</span>
          <span>{high}</span>
        </div>
      )}
    </div>
  );
}

function Choice({ selected, onClick, title, desc, dot }: { selected: boolean; onClick: () => void; title: string; desc?: string; dot?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ display: "block", width: "100%", textAlign: "left", background: selected ? "var(--cream)" : "#fff", border: selected ? "1.5px solid var(--gold)" : "0.5px solid var(--border-soft)", borderRadius: 14, padding: "13px 15px", marginBottom: 10, cursor: "pointer" }}
    >
      <div className="flex items-center" style={{ gap: 10 }}>
        {dot && <span style={{ width: 12, height: 12, borderRadius: "50%", background: dot, flex: "0 0 auto" }} />}
        <span className="text-text" style={{ fontSize: 15, fontWeight: 500 }}>{title}</span>
      </div>
      {desc && <div className="text-text-soft" style={{ fontSize: 12, marginTop: 3, marginLeft: dot ? 22 : 0 }}>{desc}</div>}
    </button>
  );
}

function Nav({ onBack, onNext, canNext }: { onBack: () => void; onNext: () => void; canNext: boolean }) {
  return (
    <div className="flex" style={{ gap: 12, marginTop: "auto" }}>
      <button type="button" onClick={onBack} style={{ flex: "0 0 auto", padding: "0 20px", height: 48, borderRadius: 999, border: "0.5px solid var(--border)", background: "transparent", color: "var(--text-soft)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>Back</button>
      <button type="button" onClick={onNext} disabled={!canNext} style={{ flex: 1, height: 48, borderRadius: 999, border: "none", background: "var(--ink)", color: "var(--cream)", fontSize: 14, fontWeight: 500, cursor: canNext ? "pointer" : "not-allowed", opacity: canNext ? 1 : 0.35 }}>Continue</button>
    </div>
  );
}

function PrimaryButton({ onClick, children, disabled }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} style={{ width: "100%", height: 48, borderRadius: 999, border: "none", background: "var(--ink)", color: "var(--cream)", fontSize: 14, fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1, marginTop: "auto" }}>
      {children}
    </button>
  );
}

function Spacer() {
  return <div style={{ flex: 1, minHeight: 8 }} />;
}

function Check({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flex: "0 0 auto" }} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#6E8B5A" />
      <path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <div
      style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid var(--cream2)", borderTopColor: "var(--gold)", animation: "dmspin 0.8s linear infinite" }}
    >
      <style>{`@keyframes dmspin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
