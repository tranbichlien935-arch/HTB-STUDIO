import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, Star, MapPin, Phone, Mail, Clock, ChevronDown, Instagram, Facebook, Youtube, Leaf } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logo from "@/imports/logo4.png";

// ── Brand palette
const C = {
  bg: "#FDFBF7",
  sageLight: "#D4E0D0",
  sageMain: "#A3B18A",
  forest: "#344E41",
  forestMid: "#588157",
  pink: "#F4ACB7",
  peach: "#F4A261",
  champagne: "#E9C46A",
  white: "#ffffff",
};

// ── Intersection-observer reveal hook
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.85s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.85s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Parallax leaf decorator
function ParallaxLeaf({ style }: { style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const y = window.scrollY * 0.18;
      ref.current.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div ref={ref} className="pointer-events-none select-none absolute" style={{ transition: "transform 0.1s linear", ...style }}>
      <svg width="160" height="220" viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.18 }}>
        <path d="M80 10 Q140 60 110 130 Q85 190 40 200 Q10 160 30 100 Q50 40 80 10Z" fill={C.sageMain} />
        <path d="M80 10 Q30 70 50 140 Q65 185 100 195" stroke={C.forest} strokeWidth="1.5" fill="none" />
        <path d="M65 80 Q80 95 95 80" stroke={C.forest} strokeWidth="1" fill="none" />
        <path d="M58 110 Q80 128 100 110" stroke={C.forest} strokeWidth="1" fill="none" />
        <path d="M62 140 Q80 155 97 140" stroke={C.forest} strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}

// ── Floral branch divider
function BranchDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-2">
      <span className="h-px flex-1 max-w-[80px]" style={{ background: C.sageMain, opacity: 0.4 }} />
      <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
        <path d="M2 10 Q12 2 24 10 Q36 18 46 10" stroke={C.sageMain} strokeWidth="1.5" fill="none" />
        <circle cx="24" cy="10" r="2.5" fill={C.pink} />
        <circle cx="14" cy="6.5" r="1.5" fill={C.champagne} />
        <circle cx="34" cy="13.5" r="1.5" fill={C.pink} />
      </svg>
      <span className="h-px flex-1 max-w-[80px]" style={{ background: C.sageMain, opacity: 0.4 }} />
    </div>
  );
}

// ── Arch image frame
function ArchPhoto({ src, alt, height = 380 }: { src: string; alt: string; height?: number }) {
  return (
    <div
      className="overflow-hidden w-full relative"
      style={{
        borderRadius: "9999px 9999px 12px 12px",
        height,
        background: C.sageLight,
      }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {/* floral corner overlay SVG */}
      <svg className="absolute top-0 right-0 pointer-events-none" width="90" height="90" viewBox="0 0 90 90" fill="none" style={{ opacity: 0.7 }}>
        <circle cx="72" cy="18" r="9" fill={C.pink} opacity="0.6" />
        <circle cx="58" cy="8" r="5" fill={C.champagne} opacity="0.7" />
        <circle cx="82" cy="35" r="6" fill={C.peach} opacity="0.5" />
        <path d="M70 10 Q82 22 75 38" stroke={C.sageMain} strokeWidth="1.5" fill="none" />
        <circle cx="76" cy="40" r="3" fill={C.pink} opacity="0.5" />
      </svg>
      <svg className="absolute bottom-0 left-0 pointer-events-none" width="70" height="70" viewBox="0 0 70 70" fill="none" style={{ opacity: 0.55 }}>
        <circle cx="15" cy="55" r="8" fill={C.sageMain} opacity="0.5" />
        <circle cx="28" cy="66" r="4" fill={C.pink} opacity="0.6" />
        <path d="M12 50 Q28 48 35 62" stroke={C.forest} strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}

const NAV_LINKS = [
  { label: "Trang chủ", href: "#hero" },
  { label: "Về chúng tôi", href: "#about" },
  { label: "Dịch vụ", href: "#services" },
  { label: "Album", href: "#portfolio" },
  { label: "Liên hệ", href: "#contact" },
];

const SERVICES = [
  { name: "Chụp Ảnh Cưới", price: "3.000.000đ", emoji: "💍", desc: "Ghi lại khoảnh khắc thiêng liêng nhất trong cuộc đời với phong cách tinh tế, lãng mạn giữa khung cảnh thiên nhiên." },
  { name: "Quay Phóng Sự", price: "5.000.000đ", emoji: "🎬", desc: "Phim phóng sự cưới chân thực, sống động — kể câu chuyện tình yêu theo cách đặc biệt và đáng nhớ nhất." },
  { name: "Cho Thuê Studio", price: "500.000đ", emoji: "🌿", desc: "Studio chuyên nghiệp với ánh sáng tự nhiên hiện đại, phù hợp mọi phong cách chụp ảnh." },
  { name: "Chụp Ảnh Doanh Nghiệp", price: "2.000.000đ", emoji: "💼", desc: "Xây dựng hình ảnh thương hiệu chuyên nghiệp, ấn tượng cho doanh nghiệp của bạn." },
  { name: "Chụp Ảnh Sản Phẩm", price: "2.500.000đ", emoji: "📸", desc: "Ảnh sản phẩm sắc nét, bắt mắt giúp tăng tỷ lệ chuyển đổi cho cửa hàng online." },
  { name: "Make Up", price: "800.000đ", emoji: "✨", desc: "Đội ngũ trang điểm chuyên nghiệp, phong cách đa dạng từ tự nhiên tươi mới đến ấn tượng." },
];

const STATS = [
  { number: "500+", label: "Khách hàng hài lòng" },
  { number: "10+", label: "Concept độc đáo" },
  { number: "5", label: "Năm kinh nghiệm" },
  { number: "100%", label: "Tận tâm phục vụ" },
];

const PORTFOLIO = [
  { title: "Hoa Xinh", category: "Cá nhân", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format" },
  { title: "Hoàng Hôn Và Em", category: "Couple", img: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&h=800&fit=crop&auto=format" },
  { title: "Cả Nhà Cùng Vui", category: "Gia đình", img: "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=600&h=800&fit=crop&auto=format" },
  { title: "Tuổi 18", category: "Cá nhân", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop&auto=format" },
  { title: "Marry Me", category: "Cưới", img: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=800&fit=crop&auto=format" },
  { title: "Khai Trương", category: "Doanh nghiệp", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop&auto=format" },
  { title: "Tạm Biệt Tuổi Học Trò", category: "Nhóm", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=800&fit=crop&auto=format" },
  { title: "Cột Mốc", category: "Couple", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop&auto=format" },
];

const TESTIMONIALS = [
  { name: "Nguyễn Minh Châu", role: "Cô dâu", text: "Studio chụp tuyệt vời! Ekip rất chuyên nghiệp và thân thiện. Bộ ảnh cưới vượt ngoài mong đợi, từng khoảnh khắc đều được ghi lại tinh tế và đầy cảm xúc.", rating: 5, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format" },
  { name: "Trần Quốc Hùng", role: "Chủ doanh nghiệp", text: "Chụp ảnh doanh nghiệp cho team ở đây. Ảnh ra rất đẹp, chuyên nghiệp. Cách xử lý ánh sáng và góc chụp rất xuất sắc, mình rất hài lòng.", rating: 5, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format" },
  { name: "Lê Thị Hương", role: "Khách hàng", text: "Đặt lịch chụp concept Hoàng hôn và Em, ekip rất nhiệt tình hỗ trợ từ trang phục đến tạo dáng. Mình sẽ quay lại cho các dịp đặc biệt khác!", rating: 5, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const heroParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      if (heroParallaxRef.current) {
        heroParallaxRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categories = ["Tất cả", ...Array.from(new Set(PORTFOLIO.map((p) => p.category)))];
  const filtered = activeFilter === "Tất cả" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === activeFilter);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.forest, fontFamily: "'Quicksand', sans-serif" }}>

      {/* ── NAVBAR */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(253,251,247,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          boxShadow: scrolled ? `0 1px 0 rgba(52,78,65,0.08)` : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2 group">
            <ImageWithFallback
              src={logo}
              alt="HBT Studio logo"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              style={{ width: 52, height: 52 }}
            />
            <div className="text-left">
              <div className="font-bold tracking-widest transition-colors duration-300" style={{ color: scrolled ? C.forest : "rgba(255,255,255,0.95)", letterSpacing: "0.12em", fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", lineHeight: 1.1 }}>
                HBT
              </div>
              <div className="text-xs tracking-widest font-medium transition-colors duration-300" style={{ color: scrolled ? C.sageMain : "rgba(255,255,255,0.7)", letterSpacing: "0.22em", lineHeight: 1 }}>
                STUDIO
              </div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="text-sm font-medium relative group transition-colors duration-300"
                style={{ color: scrolled ? C.forest : "rgba(255,255,255,0.92)" }}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-300" style={{ background: C.peach }} />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm font-medium transition-colors duration-300" style={{ color: scrolled ? C.forestMid : "rgba(255,255,255,0.85)" }}>0385 711 415</span>
            <button
              onClick={() => scrollTo("#contact")}
              className="px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md"
              style={{ background: C.peach, color: C.white }}
            >
              Đặt lịch
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} color={C.forest} /> : <Menu size={22} color={C.forest} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-500"
          style={{ maxHeight: menuOpen ? "400px" : "0", background: "rgba(253,251,247,0.98)", backdropFilter: "blur(16px)" }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="text-left font-medium py-2 border-b text-sm" style={{ borderColor: C.sageLight, color: C.forestMid }}>
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("#contact")} className="mt-2 py-3 rounded-full text-sm font-semibold" style={{ background: C.peach, color: C.white }}>
              Đặt lịch ngay
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO */}
      <section id="hero" className="relative h-screen min-h-[640px] overflow-hidden flex items-center">
        {/* parallax bg */}
        <div ref={heroParallaxRef} className="absolute inset-0 will-change-transform" style={{ top: "-15%", height: "130%" }}>
          <img
            src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1600&h=1100&fit=crop&auto=format"
            alt="Meadow flowers nature"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.55) saturate(1.1)" }}
          />
        </div>
        {/* gradient overlay */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(52,78,65,0.72) 0%, rgba(88,129,87,0.3) 50%, rgba(253,251,247,0.08) 100%)` }} />

        {/* parallax leaf decorators */}
        <ParallaxLeaf style={{ top: 80, right: 60, width: 160, zIndex: 5 }} />
        <ParallaxLeaf style={{ bottom: 120, left: 40, width: 120, zIndex: 5, transform: "scaleX(-1)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <div
              className="text-xs tracking-widest uppercase mb-5 flex items-center gap-3"
              style={{ color: C.champagne, opacity: 0, animation: "fadeUp 1s ease 0.2s forwards" }}
            >
              <span className="inline-block w-8 h-px" style={{ background: C.champagne }} />
              Nhiếp Ảnh Nghệ Thuật · TP.HCM
            </div>
            <h1
              className="font-semibold leading-none mb-5 text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.8rem, 7vw, 5.2rem)",
                lineHeight: 1.08,
                opacity: 0,
                animation: "fadeUp 1s ease 0.35s forwards",
              }}
            >
              Mỗi khoảnh khắc<br />
              <em className="italic" style={{ color: C.champagne }}>xứng đáng</em><br />
              được lưu giữ
            </h1>
            <p
              className="text-white/70 text-lg mb-10 leading-relaxed"
              style={{ opacity: 0, animation: "fadeUp 1s ease 0.5s forwards" }}
            >
              Chúng tôi kể câu chuyện của bạn qua từng bức ảnh — chân thực, tinh tế, và đầy cảm xúc.
            </p>
            <div
              className="flex flex-wrap gap-4"
              style={{ opacity: 0, animation: "fadeUp 1s ease 0.65s forwards" }}
            >
              <button
                onClick={() => scrollTo("#contact")}
                className="group flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{ background: C.peach, color: C.white, boxShadow: `0 8px 32px rgba(244,162,97,0.45)` }}
              >
                Đặt lịch ngay
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => scrollTo("#portfolio")}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm border border-white/40 text-white transition-all duration-300 hover:bg-white/10"
              >
                Xem album
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollTo("#about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors"
          style={{ animation: "bounce 2.5s infinite" }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ fontSize: "10px" }}>Khám phá</span>
          <ChevronDown size={18} />
        </button>
      </section>

      {/* ── ABOUT */}
      <section id="about" className="py-28 px-6 overflow-hidden" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="relative">
              <ArchPhoto
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=700&h=900&fit=crop&auto=format"
                alt="Photographer at work in nature"
                height={520}
              />
              {/* badge */}
              <div
                className="absolute -bottom-5 -right-4 px-6 py-4 rounded-2xl shadow-xl"
                style={{ background: C.white, border: `1.5px solid ${C.sageLight}` }}
              >
                <div className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: C.forest }}>5+</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: C.sageMain }}>Năm kinh nghiệm</div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.18}>
            <div>
              <div className="text-xs tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: C.sageMain }}>
                <Leaf size={13} color={C.sageMain} />
                Về chúng tôi
              </div>
              <h2 className="font-semibold mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.9rem)", lineHeight: 1.12, color: C.forest }}>
                Nghệ thuật kể chuyện<br />
                <em className="italic" style={{ color: C.forestMid }}>qua từng khoảnh khắc</em>
              </h2>
              <BranchDivider />
              <p className="leading-relaxed mb-4 text-base" style={{ color: C.forestMid, marginTop: "1rem" }}>
                Chúng tôi tin rằng mỗi khoảnh khắc đều mang một câu chuyện riêng. Sứ mệnh của studio là ghi lại những cảm xúc chân thực nhất — từ nụ cười trong sáng đến ánh mắt đong đầy yêu thương.
              </p>
              <p className="leading-relaxed mb-10 text-sm" style={{ color: C.sageMain }}>
                Với đội ngũ nhiếp ảnh gia giàu kinh nghiệm và không gian thiên nhiên xanh mát, chúng tôi mang đến những tác phẩm nghệ thuật xứng đáng với từng khoảnh khắc đặc biệt của bạn.
              </p>
              <button
                onClick={() => scrollTo("#services")}
                className="group flex items-center gap-2 text-sm font-semibold transition-all duration-300"
                style={{ color: C.peach }}
              >
                Khám phá dịch vụ
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── STATS */}
      <section className="py-20 px-6" style={{ background: C.sageLight }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.09}>
              <div className="text-center py-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.55)" }}>
                <div className="font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", color: C.forest, lineHeight: 1 }}>
                  {s.number}
                </div>
                <div className="text-sm font-medium" style={{ color: C.forestMid }}>{s.label}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── SERVICES */}
      <section id="services" className="py-28 px-6" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-4">
              <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                <Leaf size={12} color={C.sageMain} />
                Dịch vụ
                <Leaf size={12} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.forest }}>
                Gói dịch vụ của chúng tôi
              </h2>
            </div>
            <BranchDivider />
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.name} delay={i * 0.07}>
                <div
                  className="group p-8 rounded-2xl border transition-all duration-500 cursor-pointer"
                  style={{ borderColor: C.sageLight, background: C.white }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = C.sageMain;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px rgba(52,78,65,0.1)`;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = C.sageLight;
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <div className="text-3xl mb-4">{s.emoji}</div>
                  <h3 className="font-semibold mb-2 text-lg" style={{ fontFamily: "'Playfair Display', serif", color: C.forest }}>{s.name}</h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: C.sageMain }}>{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg" style={{ color: C.peach }}>{s.price}</span>
                    <button
                      onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                      className="text-xs font-semibold flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors duration-300"
                      style={{ background: C.sageLight, color: C.forest }}
                    >
                      Đặt lịch <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO */}
      <section id="portfolio" className="py-28 px-6" style={{ background: "#EEF4EC" }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-4">
              <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                <Leaf size={12} color={C.sageMain} />
                Album
                <Leaf size={12} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.forest }}>
                Tác phẩm của chúng tôi
              </h2>
            </div>
            <BranchDivider />
            {/* filter tabs */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveFilter(c)}
                  className="px-5 py-2 text-sm rounded-full font-medium border transition-all duration-300"
                  style={{
                    borderColor: activeFilter === c ? C.peach : C.sageMain,
                    background: activeFilter === c ? C.peach : "transparent",
                    color: activeFilter === c ? C.white : C.forestMid,
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {filtered.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.06}>
                <div
                  className="group relative overflow-hidden cursor-pointer"
                  style={{ borderRadius: "9999px 9999px 8px 8px", background: C.sageLight }}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ height: "260px" }}
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4"
                    style={{
                      background: `linear-gradient(to top, rgba(52,78,65,0.85) 0%, transparent 55%)`,
                      borderRadius: "9999px 9999px 8px 8px",
                    }}
                  >
                    <div className="text-xs font-semibold tracking-wide uppercase" style={{ color: C.champagne }}>{p.category}</div>
                    <div className="font-semibold text-sm mt-0.5 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{p.title}</div>
                    <button className="mt-1.5 text-xs text-white/60 flex items-center gap-1 hover:text-white transition-colors opacity-0 group-hover:opacity-100 duration-300">
                      Xem album <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS */}
      <section className="py-28 px-6" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-4">
              <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                <Leaf size={12} color={C.sageMain} />
                Khách hàng nói gì
                <Leaf size={12} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.forest }}>
                Cảm nhận thực tế
              </h2>
            </div>
            <BranchDivider />
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.12}>
                <div
                  className="p-8 rounded-2xl border relative overflow-hidden"
                  style={{ borderColor: C.sageLight, background: C.white }}
                >
                  {/* decorative floral corner */}
                  <svg className="absolute top-0 right-0 pointer-events-none" width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ opacity: 0.35 }}>
                    <circle cx="50" cy="10" r="10" fill={C.pink} />
                    <circle cx="38" cy="4" r="5" fill={C.champagne} />
                    <path d="M45 8 Q52 20 46 35" stroke={C.sageMain} strokeWidth="1.5" fill="none" />
                  </svg>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} fill={C.peach} color={C.peach} />
                    ))}
                  </div>
                  <p className="leading-relaxed mb-6 text-sm italic" style={{ color: C.forestMid }}>"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" style={{ border: `2px solid ${C.sageLight}` }} />
                    <div>
                      <div className="text-sm font-semibold" style={{ color: C.forest }}>{t.name}</div>
                      <div className="text-xs" style={{ color: C.sageMain }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1600&h=600&fit=crop&auto=format"
            alt="Green nature forest light"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.35) saturate(1.2)" }}
          />
          <div className="absolute inset-0" style={{ background: `rgba(52,78,65,0.55)` }} />
        </div>
        <ParallaxLeaf style={{ top: 20, left: 40, zIndex: 2 }} />
        <ParallaxLeaf style={{ bottom: 20, right: 60, zIndex: 2, transform: "scaleX(-1) rotate(20deg)" }} />
        <FadeUp>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="font-semibold mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
              Sẵn sàng tạo nên<br />
              <em className="italic" style={{ color: C.champagne }}>khoảnh khắc đáng nhớ?</em>
            </h2>
            <p className="text-white/70 mb-10 text-lg">Liên hệ ngay để được tư vấn miễn phí và đặt lịch chụp.</p>
            <button
              onClick={() => scrollTo("#contact")}
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ background: C.peach, color: C.white, boxShadow: `0 8px 32px rgba(244,162,97,0.4)` }}
            >
              Đặt lịch ngay
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </FadeUp>
      </section>

      {/* ── CONTACT */}
      <section id="contact" className="py-28 px-6" style={{ background: C.sageLight }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-4">
              <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                <Leaf size={12} color={C.sageMain} />
                Liên hệ
                <Leaf size={12} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.forest }}>
                Đặt lịch chụp
              </h2>
            </div>
            <BranchDivider />
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-16 mt-12">
            <FadeUp>
              <div>
                <div className="grid gap-4 mb-8">
                  {[
                    { icon: <MapPin size={18} color={C.peach} />, label: "Địa chỉ", value: "236B Lê Văn Sỹ, Quận 3, TP.HCM" },
                    { icon: <Phone size={18} color={C.peach} />, label: "Hotline", value: "0385 711 415" },
                    { icon: <Mail size={18} color={C.peach} />, label: "Email", value: "studio@photography.vn" },
                    { icon: <Clock size={18} color={C.peach} />, label: "Giờ làm việc", value: "8:00 – 20:00 (Thứ 2 – Chủ nhật)" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: C.white, border: `1px solid ${C.sageMain}20` }}>
                      <div className="mt-0.5 shrink-0">{item.icon}</div>
                      <div>
                        <div className="text-xs tracking-wide uppercase mb-0.5" style={{ color: C.sageMain }}>{item.label}</div>
                        <div className="text-sm font-medium" style={{ color: C.forest }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  {[
                    { icon: <Instagram size={18} />, label: "Instagram" },
                    { icon: <Facebook size={18} />, label: "Facebook" },
                    { icon: <Youtube size={18} />, label: "YouTube" },
                  ].map((s) => (
                    <button
                      key={s.label}
                      className="w-10 h-10 border-2 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{ borderColor: C.sageMain, color: C.sageMain }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = C.peach;
                        (e.currentTarget as HTMLElement).style.borderColor = C.peach;
                        (e.currentTarget as HTMLElement).style.color = C.white;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.borderColor = C.sageMain;
                        (e.currentTarget as HTMLElement).style.color = C.sageMain;
                      }}
                      aria-label={s.label}
                    >
                      {s.icon}
                    </button>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => { e.preventDefault(); alert("Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất."); }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  {["Họ và tên", "Số điện thoại"].map((ph) => (
                    <input
                      key={ph}
                      placeholder={ph}
                      required
                      className="w-full px-4 py-3.5 text-sm rounded-xl border-2 focus:outline-none transition-all duration-300"
                      style={{ borderColor: C.sageLight, background: C.white, color: C.forest }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.sageMain)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.sageLight)}
                    />
                  ))}
                </div>
                <select
                  required
                  className="w-full px-4 py-3.5 text-sm rounded-xl border-2 focus:outline-none transition-all duration-300 cursor-pointer"
                  style={{ borderColor: C.sageLight, background: C.white, color: C.forestMid }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = C.sageMain)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = C.sageLight)}
                >
                  <option value="">Chọn dịch vụ</option>
                  {SERVICES.map((s) => <option key={s.name} value={s.name}>{s.name} — {s.price}</option>)}
                </select>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3.5 text-sm rounded-xl border-2 focus:outline-none transition-all duration-300"
                  style={{ borderColor: C.sageLight, background: C.white, color: C.forestMid }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = C.sageMain)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = C.sageLight)}
                />
                <textarea
                  rows={4}
                  placeholder="Ghi chú thêm về yêu cầu của bạn..."
                  className="w-full px-4 py-3.5 text-sm rounded-xl border-2 focus:outline-none transition-all duration-300 resize-none"
                  style={{ borderColor: C.sageLight, background: C.white, color: C.forest }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = C.sageMain)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = C.sageLight)}
                />
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  style={{ background: C.peach, color: C.white, boxShadow: `0 6px 24px rgba(244,162,97,0.35)` }}
                >
                  Gửi yêu cầu đặt lịch
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FOOTER */}
      <footer className="py-12 px-6" style={{ background: C.forest }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <ImageWithFallback
                src={logo}
                alt="HBT Studio logo"
                className="object-contain"
                style={{ width: 60, height: 60, filter: "brightness(0) invert(1) sepia(1) saturate(0.6) brightness(1.1)" }}
              />
              <div>
                <div className="font-bold tracking-widest" style={{ fontFamily: "'Playfair Display', serif", color: C.champagne, letterSpacing: "0.14em", fontSize: "1.1rem" }}>HBT STUDIO</div>
                <div className="text-xs mt-0.5" style={{ color: C.sageMain }}>236B Lê Văn Sỹ, Quận 3, TP.HCM</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              {NAV_LINKS.map((l) => (
                <button key={l.label} onClick={() => scrollTo(l.href)} className="text-xs font-medium transition-colors duration-300 hover:text-white" style={{ color: C.sageMain }}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ borderTop: `1px solid rgba(163,177,138,0.2)`, color: C.sageMain }}>
            <span>© 2025 Studio Photography. All rights reserved.</span>
            <span>Hotline: <span className="text-white font-medium">0385 711 415</span></span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(7px); }
        }
        ::placeholder { color: #A3B18A; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D4E0D0; border-radius: 2px; }
      `}</style>
    </div>
  );
}
