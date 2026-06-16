import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, ChevronDown, Leaf } from "lucide-react";
import { C, SERVICES, PORTFOLIO, STATS, TESTIMONIALS, FadeUp, BranchDivider, StatCard, ServiceCard, PortfolioCard, TestimonialCard } from "@/app/shared";
import slide1 from "@/imports/to-chuc-dam-cuoi-ngoai-troi.jpg";

const HERO_SLIDES = [
  { src: slide1, alt: "Tổ chức đám cưới ngoài trời" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&h=1100&fit=crop&auto=format", alt: "Wedding flowers and light" },
  { src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1600&h=1100&fit=crop&auto=format", alt: "Meadow flowers" },
];

function ParallaxLeaf({ style }: { style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = () => { if (ref.current) ref.current.style.transform = `translateY(${window.scrollY * 0.18}px)`; };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div ref={ref} className="pointer-events-none select-none absolute" style={{ transition: "transform 0.1s linear", ...style }}>
      <svg width="160" height="220" viewBox="0 0 160 220" fill="none" style={{ opacity: 0.18 }}>
        <path d="M80 10 Q140 60 110 130 Q85 190 40 200 Q10 160 30 100 Q50 40 80 10Z" fill={C.sageMain} />
        <path d="M80 10 Q30 70 50 140 Q65 185 100 195" stroke={C.forest} strokeWidth="1.5" fill="none" />
        <path d="M65 80 Q80 95 95 80" stroke={C.forest} strokeWidth="1" fill="none" />
        <path d="M58 110 Q80 128 100 110" stroke={C.forest} strokeWidth="1" fill="none" />
        <path d="M62 140 Q80 155 97 140" stroke={C.forest} strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // auto-advance every 5s
  useEffect(() => {
    const t = setInterval(() => {
      setSlide((s) => {
        setPrev(s);
        return (s + 1) % HERO_SLIDES.length;
      });
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const goSlide = (i: number) => { setPrev(slide); setSlide(i); };

  useEffect(() => {
    const fn = () => { if (heroRef.current) heroRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`; };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: C.bg }}>

      {/* ── HERO */}
      <section className="relative h-screen min-h-[640px] overflow-hidden flex items-center">
        {/* slideshow layers */}
        <div ref={heroRef} className="absolute inset-0 will-change-transform" style={{ top: "-10%", height: "120%" }}>
          {HERO_SLIDES.map((sl, i) => (
            <img
              key={sl.src}
              src={sl.src}
              alt={sl.alt}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: "brightness(0.50) saturate(1.15)",
                opacity: i === slide ? 1 : 0,
                transition: "opacity 1.4s cubic-bezier(.4,0,.2,1)",
                zIndex: i === slide ? 2 : (i === prev ? 1 : 0),
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 z-10" style={{ background: `linear-gradient(135deg, rgba(52,78,65,0.72) 0%, rgba(88,129,87,0.28) 55%, rgba(253,251,247,0.05) 100%)` }} />
        <ParallaxLeaf style={{ top: 80, right: 60, zIndex: 15 }} />
        <ParallaxLeaf style={{ bottom: 120, left: 40, zIndex: 15, transform: "scaleX(-1)" }} />

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
          <div className="max-w-xl">
            <div className="text-xs tracking-widest uppercase mb-5 flex items-center gap-3" style={{ color: C.champagne, opacity: 0, animation: "fadeUp 1s ease 0.2s forwards" }}>
              <span className="inline-block w-8 h-px" style={{ background: C.champagne }} />
              Nhiếp Ảnh Nghệ Thuật · TP.HCM
            </div>
            <h1 className="font-semibold leading-none mb-5 text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem, 7vw, 5.2rem)", lineHeight: 1.08, opacity: 0, animation: "fadeUp 1s ease 0.35s forwards" }}>
              Mỗi khoảnh khắc<br />
              <em className="italic" style={{ color: C.champagne }}>xứng đáng</em><br />
              được lưu giữ
            </h1>
            <p className="text-white/70 text-lg mb-10 leading-relaxed" style={{ opacity: 0, animation: "fadeUp 1s ease 0.5s forwards" }}>
              Chúng tôi kể câu chuyện của bạn qua từng bức ảnh — chân thực, tinh tế, và đầy cảm xúc.
            </p>
            <div className="flex flex-wrap gap-4" style={{ opacity: 0, animation: "fadeUp 1s ease 0.65s forwards" }}>
              <button onClick={() => navigate("/contact")} className="group flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105" style={{ background: C.peach, color: C.white, boxShadow: `0 8px 32px rgba(244,162,97,0.45)` }}>
                Đặt lịch ngay <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button onClick={() => navigate("/portfolio")} className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm border border-white/40 text-white transition-all duration-300 hover:bg-white/10">
                Xem album
              </button>
            </div>
          </div>
        </div>

        {/* floral slide indicators — bottom right */}
        <div className="absolute bottom-10 right-8 z-20 flex items-center gap-3">

          {/* icon 0: 4-petal cherry blossom */}
          <button onClick={() => goSlide(0)} aria-label="Slide 1" className="transition-all duration-400"
            style={{ opacity: slide===0 ? 1 : 0.4, transform: slide===0 ? "scale(1.1)" : "scale(0.85)" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <ellipse cx="10" cy="4.5" rx="2" ry="4"   fill={slide===0 ? C.pink : "rgba(255,255,255,0.75)"} />
              <ellipse cx="10" cy="15.5" rx="2" ry="4"  fill={slide===0 ? C.pink : "rgba(255,255,255,0.75)"} />
              <ellipse cx="4.5" cy="10" rx="4" ry="2"   fill={slide===0 ? C.pink : "rgba(255,255,255,0.75)"} />
              <ellipse cx="15.5" cy="10" rx="4" ry="2"  fill={slide===0 ? C.pink : "rgba(255,255,255,0.75)"} />
              <circle cx="10" cy="10" r="3" fill={slide===0 ? C.peach : "rgba(255,255,255,0.9)"} />
              <circle cx="10" cy="10" r="1.4" fill={slide===0 ? C.white : "rgba(200,200,200,0.6)"} />
            </svg>
          </button>

          {/* icon 1: leaf with veins */}
          <button onClick={() => goSlide(1)} aria-label="Slide 2" className="transition-all duration-400"
            style={{ opacity: slide===1 ? 1 : 0.4, transform: slide===1 ? "scale(1.1)" : "scale(0.85)" }}>
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
              <path d="M9 1 Q17 5 15 13 Q12 19 9 21 Q6 19 3 13 Q1 5 9 1Z" fill={slide===1 ? C.sageMain : "rgba(255,255,255,0.72)"} />
              <path d="M9 1 Q7.5 9 9 21" stroke={slide===1 ? C.forest : "rgba(255,255,255,0.45)"} strokeWidth="1" fill="none" />
              <path d="M9 7 Q12 9.5 14.5 8"  stroke={slide===1 ? C.forest : "rgba(255,255,255,0.35)"} strokeWidth="0.7" fill="none" />
              <path d="M9 12 Q12 14 14 13"  stroke={slide===1 ? C.forest : "rgba(255,255,255,0.35)"} strokeWidth="0.7" fill="none" />
              <path d="M9 7 Q6 9.5 3.5 8"   stroke={slide===1 ? C.forest : "rgba(255,255,255,0.35)"} strokeWidth="0.7" fill="none" />
            </svg>
          </button>

          {/* icon 2: sunflower / spiral center */}
          <button onClick={() => goSlide(2)} aria-label="Slide 3" className="transition-all duration-400"
            style={{ opacity: slide===2 ? 1 : 0.4, transform: slide===2 ? "scale(1.1)" : "scale(0.85)" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {/* long thin petals at 8 angles */}
              {[0,45,90,135,180,225,270,315].map((deg, i) => (
                <ellipse key={i} cx="11" cy="3.5" rx="1.4" ry="3.5"
                  fill={slide===2 ? (i%2===0 ? C.champagne : C.peach) : "rgba(255,255,255,0.7)"}
                  transform={`rotate(${deg} 11 11)`} />
              ))}
              <circle cx="11" cy="11" r="3.8" fill={slide===2 ? C.forest : "rgba(255,255,255,0.85)"} />
              <circle cx="11" cy="11" r="2"   fill={slide===2 ? C.champagne : "rgba(200,200,200,0.5)"} />
            </svg>
          </button>

        </div>

        <button onClick={() => document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors"
          style={{ animation: "bounce 2.5s infinite" }}>
          <span className="text-xs tracking-widest uppercase" style={{ fontSize: "10px" }}>Khám phá</span>
          <ChevronDown size={18} />
        </button>
      </section>

      <div id="overview">
        {/* ── ABOUT TEASER */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="relative overflow-hidden rounded-2xl" style={{ height: 480, background: C.sageLight }}>
                <img src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=700&h=900&fit=crop&auto=format" alt="Photographer" className="w-full h-full object-cover" style={{ filter: "brightness(0.88)" }} />
              </div>
            </FadeUp>
            <FadeUp delay={0.18}>
              <div>
                <div className="text-xs tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: C.sageMain }}>
                  <Leaf size={13} color={C.sageMain} /> Về chúng tôi
                </div>
                <h2 className="font-semibold mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.9rem)", lineHeight: 1.12, color: C.forest }}>
                  Nghệ thuật kể chuyện<br /><em className="italic" style={{ color: C.forestMid }}>qua từng khoảnh khắc</em>
                </h2>
                <BranchDivider />
                <p className="leading-relaxed mb-4 text-base mt-4" style={{ color: C.forestMid }}>
                  Chúng tôi tin rằng mỗi khoảnh khắc đều mang một câu chuyện riêng. Sứ mệnh của HBT Studio là ghi lại những cảm xúc chân thực nhất — từ nụ cười trong sáng đến ánh mắt đong đầy yêu thương.
                </p>
                <p className="leading-relaxed mb-8 text-sm" style={{ color: C.sageMain }}>
                  Với đội ngũ nhiếp ảnh gia giàu kinh nghiệm và không gian thiên nhiên xanh mát, chúng tôi mang đến những tác phẩm nghệ thuật xứng đáng với từng khoảnh khắc đặc biệt của bạn.
                </p>
                <button onClick={() => navigate("/about")} className="group flex items-center gap-2 text-sm font-semibold transition-all duration-300" style={{ color: C.peach }}>
                  Khám phá thêm <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── STATS */}
        <section className="py-20 px-6" style={{ background: C.sageLight }}>
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.12} />)}
          </div>
        </section>

        {/* ── SERVICES PREVIEW (3 cards) */}
        <section className="py-24 px-6" style={{ background: C.bg }}>
          <div className="max-w-7xl mx-auto">
            <FadeUp>
              <div className="text-center mb-4">
                <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                  <Leaf size={12} color={C.sageMain} /> Dịch vụ <Leaf size={12} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
                </div>
                <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.forest }}>Gói dịch vụ nổi bật</h2>
              </div>
              <BranchDivider />
            </FadeUp>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {SERVICES.slice(0, 3).map((s, i) => (
                <FadeUp key={s.name} delay={i * 0.08}>
                  <ServiceCard s={s} onBook={() => navigate("/contact")} onDetail={() => navigate(`/services/${s.slug}`)} />
                </FadeUp>
              ))}
            </div>
            <FadeUp delay={0.3}>
              <div className="text-center mt-10">
                <button onClick={() => navigate("/services")} className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm border-2 transition-all duration-300 hover:scale-105" style={{ borderColor: C.sageMain, color: C.forest }}>
                  Xem tất cả dịch vụ <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── PORTFOLIO PREVIEW (4 photos) */}
        <section className="py-24 px-6" style={{ background: "#EEF4EC" }}>
          <div className="max-w-7xl mx-auto">
            <FadeUp>
              <div className="text-center mb-4">
                <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                  <Leaf size={12} color={C.sageMain} /> Album <Leaf size={12} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
                </div>
                <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.forest }}>Tác phẩm gần đây</h2>
              </div>
              <BranchDivider />
            </FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {PORTFOLIO.slice(0, 4).map((p, i) => (
                <FadeUp key={p.title} delay={i * 0.07}>
                  <PortfolioCard p={p} onClick={() => navigate(`/portfolio/${p.slug}`)} />
                </FadeUp>
              ))}
            </div>
            <FadeUp delay={0.3}>
              <div className="text-center mt-10">
                <button onClick={() => navigate("/portfolio")} className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm border-2 transition-all duration-300 hover:scale-105" style={{ borderColor: C.sageMain, color: C.forest }}>
                  Xem toàn bộ album <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── TESTIMONIALS */}
        <section className="py-24 px-6" style={{ background: C.bg }}>
          <div className="max-w-7xl mx-auto">
            <FadeUp>
              <div className="text-center mb-4">
                <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                  <Leaf size={12} color={C.sageMain} /> Khách hàng nói gì <Leaf size={12} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
                </div>
                <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.forest }}>Cảm nhận thực tế</h2>
              </div>
              <BranchDivider />
            </FadeUp>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {TESTIMONIALS.map((t, i) => (
                <FadeUp key={t.name} delay={i * 0.12}>
                  <TestimonialCard t={t} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1600&h=600&fit=crop&auto=format" alt="Nature" className="w-full h-full object-cover" style={{ filter: "brightness(0.32) saturate(1.2)" }} />
            <div className="absolute inset-0" style={{ background: `rgba(52,78,65,0.55)` }} />
          </div>
          <FadeUp>
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="font-semibold mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
                Sẵn sàng tạo nên<br /><em className="italic" style={{ color: C.champagne }}>khoảnh khắc đáng nhớ?</em>
              </h2>
              <p className="text-white/70 mb-10 text-lg">Liên hệ ngay để được tư vấn miễn phí và đặt lịch chụp.</p>
              <button onClick={() => navigate("/contact")} className="group inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ background: C.peach, color: C.white, boxShadow: `0 8px 32px rgba(244,162,97,0.4)` }}>
                Đặt lịch ngay <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </FadeUp>
        </section>
      </div>
    </div>
  );
}
