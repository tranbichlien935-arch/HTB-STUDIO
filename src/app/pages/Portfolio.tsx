import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Leaf } from "lucide-react";
import { C, PORTFOLIO, FadeUp, BranchDivider, SectionBanner, AlbumItem } from "@/app/shared";


function PhotoCard({ p, delay }: { p: AlbumItem; delay: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="group relative overflow-hidden rounded-[20px] cursor-pointer"
      style={{
        aspectRatio: "4/5",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        transition: `opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s, box-shadow 0.5s ease-out, border-color 0.5s ease-out`,
        border: `1.5px solid transparent`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 24px 50px rgba(52,78,65,0.3)";
        e.currentTarget.style.borderColor = "rgba(163,177,138,0.6)";
        e.currentTarget.style.zIndex = "10";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "transparent";
        e.currentTarget.style.zIndex = "1";
      }}
    >
      <img
        src={p.img}
        alt={p.title}
        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />

      {/* Background vignette gradient for readability */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-in-out bg-black/10 group-hover:bg-transparent"
        style={{ background: "rgba(0, 0, 0, 0.15)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-50 group-hover:opacity-90 transition-opacity duration-700 ease-in-out"
        style={{ background: `linear-gradient(to top, ${C.forest} 0%, transparent 60%)` }}
      />

      {/* Top right pill */}
      <div className="absolute top-5 right-5 overflow-hidden rounded-full">
        <div className="px-3.5 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-[10px] tracking-[0.2em] uppercase translate-y-[-120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[600ms] cubic-bezier(0.22, 1, 0.36, 1) delay-100">
          {p.category}
        </div>
      </div>

      {/* Bottom text block */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center text-center">
        <h3
          className="text-white text-xl md:text-2xl font-semibold mb-2 transition-transform duration-700 ease-out group-hover:-translate-y-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {p.title}
        </h3>

        {/* Animated line separator */}
        <div className="h-px bg-white/60 w-0 group-hover:w-16 transition-all duration-700 ease-out mx-auto mb-4" />

        <div className="overflow-hidden">
          <span className="text-white/80 hover:text-white transition-colors text-xs font-medium uppercase tracking-[0.15em] flex items-center justify-center gap-2 translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500 ease-out delay-200">
            Khám phá
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </span>
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

  const [dbAlbums, setDbAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const { collection, getDocs } = await import("firebase/firestore");
        const { db } = await import("../../lib/firebase");

        const snapshot = await getDocs(collection(db, "albums"));

        let data = snapshot.docs.map(doc => {
          const raw = doc.data();

          let dbCat = raw.category || "Cá nhân";
          if (dbCat === "CÁ NHÂN") dbCat = "Cá nhân";
          if (dbCat === "COUPLE") dbCat = "Couple";
          if (dbCat === "GIA ĐÌNH") dbCat = "Gia đình";
          if (dbCat === "SỰ KIỆN") dbCat = "Sự kiện";

          // Map firebase fields to Portfolio fields
          return {
            id: doc.id,
            slug: doc.id, // For now use ID as slug
            title: raw.title || "Untitled",
            category: dbCat,
            img: raw.coverImage || "https://images.pexels.com/photos/1056588/pexels-photo-1056588.jpeg",
            _createdAt: raw.createdAt?.toMillis ? raw.createdAt.toMillis() : Date.now()
          };
        });

        // Sort manually directly
        data = data.sort((a, b) => b._createdAt - a._createdAt);

        setDbAlbums(data);
      } catch (err) {
        console.error("Failed to load albums", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  // fallback to PORTFOLIO mock data if DB empty but loading finished
  // actually let's merge them so it looks beautiful with both Real + Mock data!
  const displayItems = [...dbAlbums, ...PORTFOLIO];

  const categories = ["Tất cả", ...Array.from(new Set(displayItems.map((p) => p.category)))];
  const filtered = activeFilter === "Tất cả" ? displayItems : displayItems.filter((p) => p.category === activeFilter);

  return (
    <div style={{ background: "#EEF4EC" }}>
      <div className="pt-20">
        <SectionBanner
          img="https://images.pexels.com/photos/37902252/pexels-photo-37902252.jpeg"
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

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 min-h-[400px]">
            {loading ? (
              <div className="col-span-full flex justify-center items-center h-48 text-[#344E41]">
                Đang tải dữ liệu tác phẩm...
              </div>
            ) : filtered.length === 0 ? (
              <div className="col-span-full flex justify-center items-center h-48 text-[#A3B18A]">
                Chưa có dữ liệu.
              </div>
            ) : filtered.map((p, i) => (
              <div key={p.id || p.title} onClick={() => goDetail(p.slug)}>
                <PhotoCard p={p as unknown as AlbumItem} delay={i * 0.08} />
              </div>
            ))}
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
