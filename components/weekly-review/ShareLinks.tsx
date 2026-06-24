"use client";

import { useEffect, useRef, useState } from "react";

// Copy + WhatsApp share for a client's check-in link. The link is always shown in
// a selectable field so it can be copied manually if the Clipboard API is blocked
// (it only works in secure/localhost contexts and can be denied by the browser).
export default function ShareLinks({ token, clientName, phone }: { token: string; clientName: string; phone?: string }) {
  const [origin, setOrigin] = useState("");
  const [status, setStatus] = useState<"" | "copied" | "manual">("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setOrigin(window.location.origin), []);
  const url = `${origin}/check-in/${token}`;

  const copy = async () => {
    inputRef.current?.focus();
    inputRef.current?.select();
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        ok = true;
      }
    } catch {
      // fall through to execCommand
    }
    if (!ok) {
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
    }
    setStatus(ok ? "copied" : "manual");
    setTimeout(() => setStatus(""), 2500);
  };

  const whatsapp = () => {
    const text = `Hi ${clientName}, here is your weekly check-in — it takes about three minutes: ${url}`;
    const base = phone ? `https://wa.me/${phone.replace(/[^0-9]/g, "")}` : "https://wa.me/";
    window.open(`${base}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const btn: React.CSSProperties = {
    height: 40,
    padding: "0 14px",
    borderRadius: 9,
    border: "0.5px solid var(--border)",
    background: "#fff",
    color: "var(--text)",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

  return (
    <div>
      {/* Always-visible, selectable link */}
      <div className="flex" style={{ gap: 8, marginBottom: 8 }}>
        <input
          ref={inputRef}
          readOnly
          value={url}
          onFocus={(e) => e.currentTarget.select()}
          style={{ flex: 1, minWidth: 0, height: 40, borderRadius: 9, border: "0.5px solid var(--border)", padding: "0 12px", fontSize: 13, color: "var(--text-soft)", background: "var(--cream)", fontFamily: "inherit" }}
        />
        <button type="button" onClick={copy} style={{ ...btn, background: "var(--ink)", color: "var(--cream)", border: "none" }}>
          {status === "copied" ? "Copied" : "Copy"}
        </button>
      </div>
      {status === "manual" && (
        <div className="text-text-muted" style={{ fontSize: 11, marginBottom: 8 }}>
          Couldn&rsquo;t copy automatically — the link is selected above, press Ctrl/Cmd + C.
        </div>
      )}

      <div className="flex" style={{ gap: 8, flexWrap: "wrap" }}>
        <button type="button" onClick={whatsapp} style={btn}>Send via WhatsApp</button>
        <a href={`/review/${token}`} style={{ ...btn, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>View dashboard</a>
      </div>
    </div>
  );
}
