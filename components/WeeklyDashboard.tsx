// Weekly Review — Feedback Dashboard (Phase 1).
// Pure render from a ClientWeek; all logic lives in lib/weekly-review/rules.ts.

import type { ClientWeek, Status } from "@/lib/weekly-review/types";
import { computeWeek, sparkPoints, STATUS_COLOR } from "@/lib/weekly-review/rules";

function Dot({ status }: { status: Status }) {
  return (
    <span
      className="inline-block rounded-full"
      style={{ width: 8, height: 8, marginTop: 3, background: STATUS_COLOR[status] }}
      aria-hidden="true"
    />
  );
}

function Sparkline({ series, color, height = 24 }: { series: number[]; color: string; height?: number }) {
  const pts = sparkPoints(series, 100, height);
  if (!pts) return null;
  return (
    <svg
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      style={{ width: "100%", height, marginTop: 4, display: "block" }}
      aria-hidden="true"
    >
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function TrainerizePill() {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full"
      style={{ fontSize: 11, color: "#7d6422", background: "var(--gold-pale)", padding: "2px 8px" }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)" }} />
      Trainerize
    </span>
  );
}

function SectionLabel({ children, live = true }: { children: React.ReactNode; live?: boolean }) {
  return (
    <div className="flex items-center justify-between" style={{ marginTop: 28, marginBottom: 12 }}>
      <span className="font-montserrat uppercase text-text-muted" style={{ fontSize: 11, letterSpacing: "0.16em" }}>
        {children}
      </span>
      {live && <TrainerizePill />}
    </div>
  );
}

const CARD_BORDER = "0.5px solid var(--border-soft)";

export default function WeeklyDashboard({ week }: { week: ClientWeek }) {
  const c = computeWeek(week);
  const bw = week.bodyweight;
  const bwChange = bw.changeKg > 0 ? `+${bw.changeKg}kg this week` : bw.changeKg < 0 ? `${bw.changeKg}kg this week` : "flat this week";

  return (
    <div className="min-h-screen bg-cream font-montserrat" style={{ padding: "40px 16px" }}>
      <div className="mx-auto" style={{ maxWidth: 560 }}>
        {/* Brand row */}
        <div className="flex items-center justify-between" style={{ paddingBottom: 16, borderBottom: CARD_BORDER }}>
          <span className="text-text" style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.02em" }}>
            De Maître Coaching
          </span>
          <span className="text-text-muted" style={{ fontSize: 11 }}>
            {week.weekOf}
          </span>
        </div>

        {/* Header */}
        <div className="text-center" style={{ marginTop: 22 }}>
          <div className="uppercase text-gold" style={{ fontSize: 11, letterSpacing: "0.2em" }}>
            Your week, in review
          </div>
          <h1 className="font-cormorant text-text" style={{ fontSize: 32, lineHeight: 1.15, margin: "10px 8px 14px" }}>
            {week.client.name}, here is your week back at you.
          </h1>
          <span
            className="inline-flex items-center gap-2 rounded-full"
            style={{ border: "0.5px solid var(--border)", padding: "6px 14px", fontSize: 13 }}
          >
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: STATUS_COLOR[week.gutRead] }} />
            {c.gutLabel} · {c.goalLabel}
          </span>
        </div>

        {/* Consistency grid */}
        <SectionLabel>Consistency this week</SectionLabel>
        <div className="grid grid-cols-2" style={{ gap: 10 }}>
          {c.cards.map((card) => (
            <div key={card.label} className="bg-white" style={{ border: CARD_BORDER, borderRadius: 16, padding: 12 }}>
              <div className="flex items-start justify-between">
                <span className="uppercase text-text-muted" style={{ fontSize: 11, letterSpacing: "0.06em" }}>
                  {card.label}
                </span>
                <Dot status={card.status} />
              </div>
              <div className="font-cormorant text-text" style={{ fontSize: 30, lineHeight: 1.05, marginTop: 2 }}>
                {card.display}
              </div>
              {card.trend && <Sparkline series={card.trend} color={STATUS_COLOR[card.status]} />}
              <div className="text-text-soft" style={{ fontSize: 11, marginTop: 4 }}>
                {card.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Habit consistency */}
        <SectionLabel>Habit consistency</SectionLabel>
        <div className="bg-white" style={{ border: CARD_BORDER, borderRadius: 16, padding: 16 }}>
          {c.habitItems.map((h) => (
            <div key={h.name} className="flex items-center gap-3" style={{ margin: "9px 0" }}>
              <span className="text-text" style={{ flex: "0 0 110px", fontSize: 13 }}>
                {h.name}
              </span>
              <div className="flex-1 rounded-full" style={{ height: 8, background: "var(--cream2)" }}>
                <div className="rounded-full" style={{ height: 8, width: `${Math.round(h.pct * 100)}%`, background: STATUS_COLOR[h.status] }} />
              </div>
              <span
                style={{ flex: "0 0 30px", textAlign: "right", fontSize: 12, color: h.status === "red" ? STATUS_COLOR.red : "var(--text-soft)" }}
              >
                {h.hits}/{h.outOf}
              </span>
            </div>
          ))}
        </div>

        {/* Bodyweight trend */}
        <SectionLabel>Bodyweight trend</SectionLabel>
        <div style={{ background: "var(--ink)", borderRadius: 16, padding: 16 }}>
          <div className="flex items-baseline justify-between">
            <span className="font-cormorant" style={{ fontSize: 32, color: "var(--cream)" }}>
              {bw.currentKg}
              <span style={{ fontSize: 14, color: "var(--text-muted)" }}>kg</span>
            </span>
            <span style={{ fontSize: 12, color: "#9DBE86" }}>{bwChange}</span>
          </div>
          <Sparkline series={bw.series} color="#CDA84E" height={64} />
          <p className="italic" style={{ fontSize: 12, color: "#C9BBA5", lineHeight: 1.5, marginTop: 8 }}>
            {c.bodyweightNarrative}
          </p>
        </div>

        {/* Energy balance */}
        <SectionLabel>Energy balance — the real maths</SectionLabel>
        <div className="bg-white" style={{ border: CARD_BORDER, borderRadius: 16, padding: 16 }}>
          <div className="flex justify-between text-center">
            <div style={{ flex: 1 }}>
              <div className="text-text-muted" style={{ fontSize: 11 }}>Logged in</div>
              <div className="text-text" style={{ fontSize: 18, fontWeight: 500 }}>{week.nutrition.loggedKcal.toLocaleString("en-US")}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="text-text-muted" style={{ fontSize: 11 }}>Burned</div>
              <div className="text-text" style={{ fontSize: 18, fontWeight: 500 }}>{week.client.maintenanceKcal.toLocaleString("en-US")}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="text-text-muted" style={{ fontSize: 11 }}>Weight</div>
              <div style={{ fontSize: 18, fontWeight: 500, color: "#5e7a4c" }}>{bw.changeKg > 0 ? `+${bw.changeKg}kg` : `${bw.changeKg}kg`}</div>
            </div>
          </div>
          {c.energyFlagText && (
            <div style={{ background: "var(--gold-pale)", border: "0.5px solid #E0D2A8", borderRadius: 10, padding: "10px 12px", marginTop: 12 }}>
              <span style={{ fontSize: 13, color: "#7d6422", fontWeight: 500 }}>{c.energyFlagText}</span>
            </div>
          )}
          <p className="text-text-soft" style={{ fontSize: 12, lineHeight: 1.6, marginTop: 10 }}>
            {c.energyNarrative}
          </p>
        </div>

        {/* Reconciliation */}
        <SectionLabel live={false}>You said {c.gutLabel} — here is the data</SectionLabel>
        <div className="bg-white" style={{ border: CARD_BORDER, borderLeft: `3px solid ${c.reconcile.accent}`, borderRadius: 0, padding: "12px 14px" }}>
          <div className="text-text" style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
            {c.reconcile.title}
          </div>
          <div className="text-text-soft" style={{ fontSize: 12, lineHeight: 1.6 }}>
            {c.reconcile.body}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center" style={{ marginTop: 22, paddingTop: 14, borderTop: CARD_BORDER }}>
          <p className="italic text-text-muted" style={{ fontSize: 11, lineHeight: 1.5 }}>
            Results referenced are from individual clients and are not a guarantee of future results.
            <br />
            Data shown is from your Trainerize account. Not affiliated with or endorsed by Trainerize.
          </p>
        </div>
      </div>
    </div>
  );
}
