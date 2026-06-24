// Friendly fallback when a share token doesn't resolve.
export default function NotFoundCard({ kind }: { kind: "review" | "checkin" }) {
  return (
    <div className="min-h-screen bg-cream font-montserrat flex items-center justify-center" style={{ padding: "40px 16px" }}>
      <div className="bg-white text-center" style={{ border: "0.5px solid var(--border-soft)", borderRadius: 18, padding: "32px 26px", maxWidth: 420 }}>
        <h1 className="font-cormorant text-text" style={{ fontSize: 26, marginBottom: 10 }}>This link has expired</h1>
        <p className="text-text-soft" style={{ fontSize: 14, lineHeight: 1.6 }}>
          {kind === "checkin"
            ? "We could not find this check-in. Ask your coach for a fresh link."
            : "We could not find this week. Ask your coach for a fresh link."}
        </p>
      </div>
    </div>
  );
}
