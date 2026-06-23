import { useParams, useNavigate } from "react-router";
import { ArrowRight, ArrowLeft, Leaf, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { C, PORTFOLIO, FadeUp, BranchDivider, AlbumItem } from "../../app/shared";

export default function AlbumDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [fetchedAlbum, setFetchedAlbum] = useState<AlbumItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const res = await fetch("/api/portfolios");
        if (!res.ok) throw new Error("Failed to fetch");
        const allDb = await res.json() as AlbumItem[];

        let found = allDb.find((p) => p.slug === slug);
        if (!found) {
          found = PORTFOLIO.find(p => p.slug === slug);
        }

        if (found) {
          setFetchedAlbum({
            ...found,
            photos: found.photos && found.photos.length > 0 ? found.photos : [found.hero, found.img]
          });
        }
      } catch (err) {
        console.error("Error fetching album detail", err);
        const fb = PORTFOLIO.find(p => p.slug === slug);
        if (fb) setFetchedAlbum(fb);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbumDetails();
  }, [slug]);

  const album = fetchedAlbum;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20" style={{ background: C.bg }}>
        <Loader2 className="animate-spin" size={32} color={C.sageMain} />
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20" style={{ background: C.bg }}>
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: C.sageMain }}>Album không tồn tại.</p>
          <button onClick={() => navigate("/portfolio")} className="text-sm font-semibold hover:underline" style={{ color: C.peach }}>
            ← Quay lại Album
          </button>
        </div>
      </div>
    );
  }

  // related albums (same category, excluding current)
  // Combine PORTFOLIO and the currently fetched album temporarily to show related if any
  const relatedPool = [...PORTFOLIO, ...(album.slug !== PORTFOLIO[0]?.slug ? [album] : [])];
  const related = relatedPool.filter((p) => p.category === album.category && p.slug !== album.slug).slice(0, 3);

  return (
    <div style={{ background: C.bg }}>

      {/* ── HERO */}
      <div className="relative pt-20 overflow-hidden" style={{ height: "70vh", minHeight: 480 }}>
        <img
          src={album.hero}
          alt={album.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.42) saturate(1.1)" }}
        />
        {/* gradient */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(52,78,65,0.2) 0%, rgba(52,78,65,0.65) 100%)" }} />

        {/* back button */}
        <button
          onClick={() => navigate("/portfolio")}
          className="absolute top-28 left-6 z-20 flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft size={16} /> Quay lại Album
        </button>

        {/* hero text */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 px-6 z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3" style={{ opacity: 0, animation: "fadeUp 0.9s ease 0.1s forwards" }}>
              <span className="h-px w-8" style={{ background: C.champagne, opacity: 0.7 }} />
              <span className="text-xs tracking-widest uppercase font-medium" style={{ color: C.champagne, letterSpacing: "0.2em" }}>{album.category}</span>
              <span className="h-px w-8" style={{ background: C.champagne, opacity: 0.7 }} />
            </div>
            <h1
              className="font-semibold text-white mb-4 uppercase tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 6vw, 4.5rem)", lineHeight: 1.05, opacity: 0, animation: "fadeUp 0.9s ease 0.25s forwards" }}
            >
              {album.title}
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6" style={{ opacity: 0, animation: "fadeUp 0.9s ease 0.4s forwards" }}>
              {album.concept.split("·").map((tag, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full border text-white/70 border-white/20">
                  {tag.trim()}
                </span>
              ))}
            </div>
            <button
              onClick={() => navigate("/contact")}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{ background: C.peach, color: C.white, opacity: 0, animation: "fadeUp 0.9s ease 0.5s forwards", boxShadow: `0 8px 28px rgba(244,162,97,0.4)` }}
            >
              Đặt lịch chụp <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ── INTRO */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
              <Leaf size={11} color={C.sageMain} /> HBT Studio <Leaf size={11} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
            </div>
            <h2 className="font-semibold mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: C.forest }}>
              Bộ ảnh {album.title}
            </h2>
            <BranchDivider />
            <p className="mt-5 leading-relaxed text-base max-w-2xl mx-auto" style={{ color: C.forestMid }}>
              {album.desc}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── PHOTO GALLERY — masonry */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {album.photos.map((src, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div
                  className="group relative overflow-hidden cursor-zoom-in"
                  style={{ borderRadius: 12, background: C.sageLight, aspectRatio: "4/5" }}
                  onClick={() => setLightbox(src)}
                >
                  <img
                    src={src}
                    alt={`${album.title} ${i + 1}`}
                    className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center pointer-events-none"
                    style={{ background: "rgba(52,78,65,0.35)" }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 2h5M2 2v5M14 2h-5M14 2v5M2 14h5M2 14v-5M14 14h-5M14 14v-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED */}
      {related.length > 0 && (
        <section className="py-20 px-6" style={{ background: C.sageLight }}>
          <div className="max-w-7xl mx-auto">
            <FadeUp>
              <div className="text-center mb-10">
                <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                  <Leaf size={11} color={C.sageMain} /> Xem thêm <Leaf size={11} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
                </div>
                <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: C.forest }}>
                  Album cùng danh mục
                </h2>
              </div>
            </FadeUp>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r, i) => (
                <FadeUp key={r.slug} delay={i * 0.1}>
                  <div
                    className="group relative overflow-hidden rounded-2xl cursor-pointer"
                    style={{ background: C.sageLight }}
                    onClick={() => navigate(`/portfolio/${r.slug}`)}
                  >
                    <img src={r.img} alt={r.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-108" style={{ height: 260 }} />
                    <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ background: "linear-gradient(to top, rgba(52,78,65,0.85) 0%, transparent 55%)" }}>
                      <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: C.champagne }}>{r.category}</span>
                      <span className="font-semibold text-sm text-white mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>{r.title}</span>
                      <span className="text-xs text-white/60 flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Xem album <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA */}
      <section className="py-20 px-6" style={{ background: C.bg }}>
        <FadeUp>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-semibold mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", color: C.forest }}>
              Muốn có bộ ảnh như thế này?
            </h2>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: C.forestMid }}>
              Liên hệ HBT Studio để được tư vấn concept và đặt lịch chụp cho riêng bạn.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{ background: C.peach, color: C.white, boxShadow: `0 8px 28px rgba(244,162,97,0.35)` }}
            >
              Đặt lịch ngay <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </FadeUp>
      </section>

      {/* ── LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(13,11,9,0.94)", backdropFilter: "blur(12px)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
            onClick={() => setLightbox(null)}
          >
            <X size={18} />
          </button>
          <img
            src={lightbox}
            alt="Preview"
            className="max-w-full max-h-[88vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
