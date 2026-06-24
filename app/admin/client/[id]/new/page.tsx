import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getClient, listWeeksForClient } from "@/lib/weekly-review/store";
import { createWeekAction } from "@/lib/weekly-review/actions";

export const metadata: Metadata = { title: "New week", robots: { index: false, follow: false } };

export default async function NewWeekPage({ params }: { params: { id: string } }) {
  const client = await getClient(params.id);
  if (!client) notFound();
  const weeks = await listWeeksForClient(params.id);
  const last = weeks[0]; // most recent (listWeeks is sorted desc)
  const m = last?.metrics;

  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-cream font-montserrat" style={{ padding: "40px 20px" }}>
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <Link href={`/admin/client/${client.id}`} className="text-text-muted" style={{ fontSize: 12, textDecoration: "none" }}>← {client.name}</Link>
        <h1 className="font-cormorant text-text" style={{ fontSize: 32, margin: "12px 0 4px" }}>New check-in week</h1>
        <p className="text-text-soft" style={{ fontSize: 13, marginBottom: 24 }}>
          Enter this week&rsquo;s numbers from Trainerize. {last ? "Prefilled from last week — adjust what changed." : "First week for this client."}
        </p>

        <form action={createWeekAction}>
          <input type="hidden" name="clientId" value={client.id} />

          <Section title="Week">
            <Field label="Label" wide><input name="weekOf" defaultValue={`Week of ${today}`} style={input} /></Field>
          </Section>

          <Section title="Training">
            <Field label="Workouts done"><input name="workoutsDone" type="number" defaultValue={m?.workouts.done} style={input} /></Field>
            <Field label="Workouts planned"><input name="workoutsPlanned" type="number" defaultValue={m?.workouts.planned} style={input} /></Field>
            <Field label="Cardio done"><input name="cardioDone" type="number" defaultValue={m?.cardio.done} style={input} /></Field>
            <Field label="Cardio planned"><input name="cardioPlanned" type="number" defaultValue={m?.cardio.planned} style={input} /></Field>
          </Section>

          <Section title="Nutrition">
            <Field label="Adherence %"><input name="nutritionAdherence" type="number" defaultValue={m?.nutrition.adherencePct} style={input} /></Field>
            <Field label="Days logged"><input name="nutritionDays" type="number" step="0.1" defaultValue={m?.nutrition.daysLogged} style={input} /></Field>
            <Field label="Avg kcal logged"><input name="loggedKcal" type="number" defaultValue={m?.nutrition.loggedKcal} style={input} /></Field>
          </Section>

          <Section title="Steps">
            <Field label="Avg / day"><input name="stepsAvg" type="number" defaultValue={m?.steps.avgPerDay} style={input} /></Field>
            <Field label="Weekday avg"><input name="stepsWeekday" type="number" defaultValue={m?.steps.weekdayAvg} style={input} /></Field>
            <Field label="Weekend avg"><input name="stepsWeekend" type="number" defaultValue={m?.steps.weekendAvg} style={input} /></Field>
          </Section>

          <Section title="Bodyweight & weigh-ins">
            <Field label="Current kg"><input name="bwCurrent" type="number" step="0.1" defaultValue={m?.bodyweight.currentKg} style={input} /></Field>
            <Field label="Change this week (kg)"><input name="bwChange" type="number" step="0.1" defaultValue={m?.bodyweight.changeKg} style={input} /></Field>
            <Field label="Weigh-ins this week"><input name="weighInsThisWeek" type="number" step="0.1" defaultValue={m?.weighIns.thisWeek} style={input} /></Field>
            <Field label="Weigh-ins last 4 wk"><input name="weighInsLast4" type="number" defaultValue={m?.weighIns.last4wk} style={input} /></Field>
          </Section>

          <Section title="Habits (days hit, out of 7)">
            {client.habits.map((h) => (
              <Field key={h} label={h}>
                <input name={`habit__${h}`} type="number" min={0} max={7} defaultValue={m?.habitHits[h]} style={input} />
              </Field>
            ))}
            <Field label="Habit note" wide><input name="habitsNote" defaultValue={m?.habitsNote} placeholder="e.g. water and sleep slipping" style={input} /></Field>
          </Section>

          <Section title="Key lifts (optional)">
            {[1, 2, 3].map((i) => {
              const lift = m?.lifts[i - 1];
              return (
                <div key={i} className="grid" style={{ gridTemplateColumns: "1.4fr 1fr 1fr", gap: 10, gridColumn: "1 / -1" }}>
                  <input name={`lift${i}name`} defaultValue={lift?.name} placeholder={`Lift ${i} name`} style={input} />
                  <input name={`lift${i}prev`} defaultValue={lift?.prev} placeholder="prev (100kg x 8)" style={input} />
                  <input name={`lift${i}curr`} defaultValue={lift?.curr} placeholder="now (105kg x 7)" style={input} />
                </div>
              );
            })}
          </Section>

          <button type="submit" style={{ marginTop: 8, height: 48, padding: "0 28px", borderRadius: 999, border: "none", background: "var(--ink)", color: "var(--cream)", fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
            Save week &amp; generate link
          </button>
        </form>
      </div>
    </div>
  );
}

const input: React.CSSProperties = {
  width: "100%",
  height: 40,
  borderRadius: 9,
  border: "0.5px solid var(--border)",
  padding: "0 12px",
  fontSize: 14,
  fontFamily: "inherit",
  background: "#fff",
  color: "var(--text)",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div className="uppercase text-text-muted" style={{ fontSize: 11, letterSpacing: "0.16em", marginBottom: 12 }}>{title}</div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <label style={{ display: "block", gridColumn: wide ? "1 / -1" : undefined }}>
      <span className="text-text-soft" style={{ fontSize: 12, display: "block", marginBottom: 5 }}>{label}</span>
      {children}
    </label>
  );
}
