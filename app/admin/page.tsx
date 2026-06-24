import type { Metadata } from "next";
import Link from "next/link";
import { listClients, listWeeks, assembleClientWeek } from "@/lib/weekly-review/store";
import { computeWeek, STATUS_COLOR } from "@/lib/weekly-review/rules";
import { addClientAction } from "@/lib/weekly-review/actions";

export const metadata: Metadata = { title: "Coach dashboard", robots: { index: false, follow: false } };

const GOAL_LABEL: Record<string, string> = { fatloss: "Fat loss", muscle: "Muscle", leanbulk: "Lean bulk", recomp: "Recomp" };

export default async function AdminPage() {
  const [clients, weeks] = await Promise.all([listClients(), listWeeks()]);
  const clientOf = (id: string) => clients.find((c) => c.id === id);
  const weeksOf = (id: string) => weeks.filter((w) => w.clientId === id);

  const recent = weeks.slice(0, 8).flatMap((w) => {
    const cl = clientOf(w.clientId);
    if (!cl) return [];
    const c = computeWeek(assembleClientWeek(cl, w, weeksOf(w.clientId)));
    const off = c.cards.filter((card) => card.status !== "green");
    return [{ w, cl, c, off }];
  });

  return (
    <div className="min-h-screen bg-cream font-montserrat" style={{ padding: "40px 20px" }}>
      <div className="mx-auto" style={{ maxWidth: 880 }}>
        <div className="uppercase text-gold" style={{ fontSize: 11, letterSpacing: "0.2em" }}>De Maître Coaching</div>
        <h1 className="font-cormorant text-text" style={{ fontSize: 34, margin: "6px 0 4px" }}>Coach dashboard</h1>
        <p className="text-text-soft" style={{ fontSize: 14, marginBottom: 28 }}>Enter each client&rsquo;s week, send their check-in, and see what needs a look.</p>

        {/* Needs attention */}
        <div className="uppercase text-text-muted" style={{ fontSize: 11, letterSpacing: "0.16em", marginBottom: 12 }}>Recent check-ins</div>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12, marginBottom: 36 }}>
          {recent.length === 0 && <p className="text-text-soft" style={{ fontSize: 13 }}>No weeks yet — add a client and create their first week.</p>}
          {recent.map(({ w, cl, c, off }) => (
            <div key={w.token} className="bg-white" style={{ border: "0.5px solid var(--border-soft)", borderRadius: 14, padding: 16 }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                <span className="text-text" style={{ fontSize: 15, fontWeight: 500 }}>{cl.name}</span>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: w.checkIn ? "var(--gold-pale)" : "var(--cream2)", color: w.checkIn ? "#7d6422" : "var(--text-muted)" }}>
                  {w.checkIn ? `Said ${c.gutLabel}` : "Awaiting check-in"}
                </span>
              </div>
              <div className="text-text-muted" style={{ fontSize: 12, marginBottom: 10 }}>{w.weekOf}</div>
              <div className="text-text" style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{c.reconcile.title}</div>
              {c.energyFlagText && <div style={{ fontSize: 12, color: "#7d6422", marginBottom: 8 }}>{c.energyFlagText}</div>}
              {off.length > 0 && (
                <div className="flex" style={{ gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {off.map((card) => (
                    <span key={card.label} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, border: `0.5px solid ${STATUS_COLOR[card.status]}`, color: STATUS_COLOR[card.status] }}>{card.label}</span>
                  ))}
                </div>
              )}
              <div className="flex" style={{ gap: 14 }}>
                <Link href={`/review/${w.token}`} className="text-gold" style={{ fontSize: 12, textDecoration: "none" }}>Dashboard →</Link>
                <Link href={`/admin/client/${cl.id}`} className="text-text-muted" style={{ fontSize: 12, textDecoration: "none" }}>{cl.name}&rsquo;s weeks</Link>
              </div>
            </div>
          ))}
        </div>

        {/* Clients */}
        <div className="uppercase text-text-muted" style={{ fontSize: 11, letterSpacing: "0.16em", marginBottom: 12 }}>Clients</div>
        <div className="bg-white" style={{ border: "0.5px solid var(--border-soft)", borderRadius: 14, padding: 6, marginBottom: 36 }}>
          {clients.map((cl) => (
            <Link key={cl.id} href={`/admin/client/${cl.id}`} className="flex items-center justify-between" style={{ padding: "12px 14px", borderRadius: 10, textDecoration: "none" }}>
              <span className="text-text" style={{ fontSize: 15, fontWeight: 500 }}>{cl.name}</span>
              <span className="text-text-muted" style={{ fontSize: 12 }}>{GOAL_LABEL[cl.goal]} · {weeksOf(cl.id).length} weeks →</span>
            </Link>
          ))}
        </div>

        {/* Add client */}
        <div className="uppercase text-text-muted" style={{ fontSize: 11, letterSpacing: "0.16em", marginBottom: 12 }}>Add a client</div>
        <form action={addClientAction} className="bg-white" style={{ border: "0.5px solid var(--border-soft)", borderRadius: 14, padding: 18 }}>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            <Field label="Name"><input name="name" required style={inputStyle} placeholder="Jordan" /></Field>
            <Field label="Goal">
              <select name="goal" defaultValue="leanbulk" style={inputStyle}>
                <option value="fatloss">Fat loss</option>
                <option value="muscle">Muscle</option>
                <option value="leanbulk">Lean bulk</option>
                <option value="recomp">Recomp</option>
              </select>
            </Field>
            <Field label="Maintenance kcal"><input name="maintenanceKcal" type="number" defaultValue={2500} style={inputStyle} /></Field>
            <Field label="Step target"><input name="stepTarget" type="number" defaultValue={10000} style={inputStyle} /></Field>
            <Field label="WhatsApp number"><input name="phone" style={inputStyle} placeholder="50212345678" /></Field>
            <Field label="Habits (comma separated)"><input name="habits" style={inputStyle} placeholder="3L water, Protein target, 10k steps, 7 hrs sleep" /></Field>
          </div>
          <button type="submit" style={{ marginTop: 16, height: 44, padding: "0 22px", borderRadius: 999, border: "none", background: "var(--ink)", color: "var(--cream)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>Add client</button>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span className="text-text-soft" style={{ fontSize: 12, display: "block", marginBottom: 5 }}>{label}</span>
      {children}
    </label>
  );
}
