import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getClient, listWeeksForClient } from "@/lib/weekly-review/store";
import ShareLinks from "@/components/weekly-review/ShareLinks";

export const metadata: Metadata = { title: "Client", robots: { index: false, follow: false } };

const GOAL_LABEL: Record<string, string> = { fatloss: "Fat loss", muscle: "Muscle", leanbulk: "Lean bulk", recomp: "Recomp" };

export default async function ClientPage({ params }: { params: { id: string } }) {
  const client = await getClient(params.id);
  if (!client) notFound();
  const weeks = await listWeeksForClient(params.id);

  return (
    <div className="min-h-screen bg-cream font-montserrat" style={{ padding: "40px 20px" }}>
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <Link href="/admin" className="text-text-muted" style={{ fontSize: 12, textDecoration: "none" }}>← Coach dashboard</Link>
        <div className="flex items-end justify-between" style={{ marginTop: 12, marginBottom: 6, gap: 12, flexWrap: "wrap" }}>
          <h1 className="font-cormorant text-text" style={{ fontSize: 32 }}>{client.name}</h1>
          <Link href={`/admin/client/${client.id}/new`} style={{ height: 42, padding: "0 20px", borderRadius: 999, background: "var(--ink)", color: "var(--cream)", fontSize: 14, fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
            + New check-in week
          </Link>
        </div>
        <p className="text-text-soft" style={{ fontSize: 13, marginBottom: 28 }}>
          {GOAL_LABEL[client.goal]} · {client.maintenanceKcal} kcal maintenance · {client.stepTarget.toLocaleString("en-US")} step target · {client.habits.length} habits
        </p>

        <div className="uppercase text-text-muted" style={{ fontSize: 11, letterSpacing: "0.16em", marginBottom: 12 }}>Weeks</div>
        {weeks.length === 0 && <p className="text-text-soft" style={{ fontSize: 13 }}>No weeks yet. Create the first one to generate a check-in link.</p>}
        <div className="grid" style={{ gap: 12 }}>
          {weeks.map((w) => (
            <div key={w.token} className="bg-white" style={{ border: "0.5px solid var(--border-soft)", borderRadius: 14, padding: 16 }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                <span className="text-text" style={{ fontSize: 15, fontWeight: 500 }}>{w.weekOf}</span>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: w.checkIn ? "var(--gold-pale)" : "var(--cream2)", color: w.checkIn ? "#7d6422" : "var(--text-muted)" }}>
                  {w.checkIn ? "Checked in" : "Awaiting check-in"}
                </span>
              </div>
              <ShareLinks token={w.token} clientName={client.name} phone={client.phone} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
