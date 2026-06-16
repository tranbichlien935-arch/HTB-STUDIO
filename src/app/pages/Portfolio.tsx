import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Leaf } from "lucide-react";
import { C, PORTFOLIO, FadeUp, BranchDivider, SectionBanner, AlbumItem } from "@/app/shared";

const SIZE_PATTERN = ["tall", "wide", "normal", "tall", "normal", "wide", "normal", "tall"] as const;
type Size = typeof SIZE_PATTERN[number];
const heightMap: Record<Size, number> = { tall: 380, wide: 260, normal: 300 };

function PhotoCard({ p, size, delay }: { p: AlbumItem; size: Size; delay: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      <div
        className="group relative overflow-hidden cursor-pointer"
        style={{
          borderRadius: 14,
          background: C.sageLight,
          outline: hovered ? `2px solid rgba(163,177,138,0.55)` : "2px solid transparent",
          outlineOffset: hovered ? "3px" : "0px",
          transition: "outline 0.4s ease, outline-offset 0.4s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* image zooms smoothly */}
        <img
          src={p.img}
          alt={p.title}
          className="w-full object-cover block"
          style={{
            height: heightMap[size],
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(.22,1,.36,1)",
          }}
        />

        {/* always-present subtle base gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(52,78,65,0.65) 0%, rgba(52,78,65,0.1) 45%, transparent 70%)" }}
        />

        {/* hover: sage wash slides up from bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top, rgba(52,78,65,0.82) 0%, rgba(88,129,87,0.35) 55%, transparent 80%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.45s ease",
          }}
        />

        {/* category chip — slides down from top */}
        <div
          className="absolute top-3 left-3"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s",
          }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", color: C.champagne, border: "1px solid rgba(255,255,255,0.2)" }}
          >
            {p.category}
          </span>
        </div>

        {/* title + cta — slides up from bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* always visible title */}
          <div
            style={{
              transform: hovered ? "translateY(-28px)" : "translateY(0)",
              transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <span
              className="block font-semibold text-sm text-white"
              style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
            >
              {p.title}
            </span>
          </div>

          {/* cta slides up beneath title */}
          <div
            className="absolute left-4 right-4"
            style={{
              bottom: hovered ? 14 : -4,
              opacity: hovered ? 1 : 0,
              transition: "bottom 0.4s cubic-bezier(.22,1,.36,1) 0.08s, opacity 0.35s ease 0.08s",
            }}
          >
            <span className="text-xs text-white/75 flex items-center gap-1 font-medium">
              Xem album <ArrowRight size={10} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlbumMarquee() {
  return (
    <div className="w-full overflow-hidden" style={{ background: C.bg, borderTop: `1px solid ${C.sageLight}`, borderBottom: `1px solid ${C.sageLight}` }}>
      <div
        className="flex whitespace-nowrap items-center"
        style={{ animation: "albumScroll 30s linear infinite" }}
      >
        {[0, 1, 2, 3].map(i => (
          <span key={i} className="flex items-center">
            <span
              className="font-bold tracking-widest select-none"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(3.5rem, 10vw, 7rem)",
                color: "transparent",
                WebkitTextStroke: `1.5px ${C.sageMain}`,
                opacity: 0.35,
                padding: "0.1em 0.5em",
                lineHeight: 1.1,
              }}
            >
              ALBUM
            </span>
            {/* leaf dot separator */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
              <path d="M10 2 Q18 6 16 12 Q13 18 10 19 Q7 18 4 12 Q2 6 10 2Z" fill={C.sageMain} />
              <path d="M10 2 Q8.5 9 10 19" stroke={C.forest} strokeWidth="0.8" fill="none" />
            </svg>
          </span>
        ))}
      </div>
      <style>{`@keyframes albumScroll { from { transform: translateX(0); } to { transform: translateX(-25%); } }`}</style>
    </div>
  );
}

export default function Portfolio() {
  const navigate = useNavigate();
  const goDetail = (slug: string) => navigate(`/portfolio/${slug}`);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const categories = ["Tất cả", ...Array.from(new Set(PORTFOLIO.map((p) => p.category)))];
  const filtered = activeFilter === "Tất cả" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === activeFilter);

  return (
    <div style={{ background: "#EEF4EC" }}>
      <div className="pt-20">
        <SectionBanner
          img="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1400&h=500&fit=crop&auto=format"
          title="Album Ảnh"
          subtitle="Tác phẩm"
          align="center"
        />
      </div>

      <AlbumMarquee />

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-4">
              <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                <Leaf size={12} color={C.sageMain} /> Album <Leaf size={12} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.forest }}>
                Tuyển tập tác phẩm
              </h2>
            </div>
            <BranchDivider />

            {/* filters */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categories.map((c) => (
                <button key={c} onClick={() => setActiveFilter(c)}
                  className="px-5 py-2 text-sm rounded-full font-medium border transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: activeFilter === c ? C.peach : C.sageMain,
                    background: activeFilter === c ? C.peach : "transparent",
                    color: activeFilter === c ? C.white : C.forestMid,
                    boxShadow: activeFilter === c ? `0 4px 16px rgba(244,162,97,0.35)` : "none",
                  }}
                >{c}</button>
              ))}
            </div>
          </FadeUp>

          {/* masonry-style grid with CSS columns */}
          <div className="mt-10" style={{ columns: "2 280px", gap: "16px" }}>
            {filtered.map((p, i) => {
              const size = SIZE_PATTERN[i % SIZE_PATTERN.length];
              return (
                <div key={p.title} style={{ breakInside: "avoid", marginBottom: 16 }}>
                  <div onClick={() => goDetail(p.slug)} className="cursor-pointer">
                    <PhotoCard p={p} size={size} delay={i * 0.06} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-20 px-6" style={{ background: C.bg }}>
        <FadeUp>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: C.forest }}>
              Muốn có bộ ảnh<br /><em className="italic" style={{ color: C.forestMid }}>đẹp như thế này?</em>
            </h2>
            <p className="mb-8 text-sm leading-relaxed" style={{ color: C.forestMid }}>
              Đặt lịch ngay hôm nay để được tư vấn concept và phong cách phù hợp nhất với bạn.
            </p>
            <button onClick={() => navigate("/contact")} className="group inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105" style={{ background: C.peach, color: C.white, boxShadow: `0 8px 28px rgba(244,162,97,0.35)` }}>
              Đặt lịch chụp <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
