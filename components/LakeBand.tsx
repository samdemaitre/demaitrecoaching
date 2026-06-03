"use client";

export default function LakeBand() {
  return (
    <div className="relative overflow-hidden" style={{ height: 520 }}>
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/20220804054144_IMG_0024.JPG"
          alt="Lake Atitlán, Guatemala"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 35%", filter: "contrast(1.08) saturate(0.8)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(26,21,16,0.82) 0%, rgba(26,21,16,0.55) 50%, rgba(26,21,16,0.72) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center gap-6 text-center px-6"
        style={{ maxWidth: 860, margin: "0 auto" }}
      >
        <div className="w-14 h-px opacity-60" style={{ background: "var(--gold)" }} />
        <blockquote
          className="font-cormorant font-light italic leading-[1.3] tracking-tight"
          style={{ fontSize: "clamp(26px, 3.2vw, 44px)", color: "var(--cream)", letterSpacing: "-0.01em" }}
        >
          &ldquo;The best programmes don&rsquo;t just change your body —<br />
          they change{" "}
          <em className="not-italic" style={{ color: "var(--gold)" }}>
            what you believe you&rsquo;re capable of.
          </em>
          &rdquo;
        </blockquote>
        <p
          className="font-montserrat font-semibold uppercase"
          style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(247,242,232,0.4)" }}
        >
          — Sam De Maître · De Maître Coaching
        </p>
        <div className="w-14 h-px opacity-60" style={{ background: "var(--gold)" }} />
      </div>

      {/* Location tag */}
      <div className="absolute bottom-7 right-10 z-20 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full opacity-70" style={{ background: "var(--gold)" }} />
        <span
          className="font-montserrat font-semibold uppercase"
          style={{ fontSize: 8, letterSpacing: "0.28em", color: "rgba(247,242,232,0.3)" }}
        >
          Guatemala City · Guatemala
        </span>
      </div>
    </div>
  );
}
