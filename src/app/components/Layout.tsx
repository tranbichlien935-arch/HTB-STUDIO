import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Menu, X, ArrowUp, Leaf } from "lucide-react";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logo from "@/imports/logo4.png";
import { C, globalStyles } from "@/app/shared";

const NAV_LINKS = [
  { label: "Trang chủ",   path: "/" },
  { label: "Về chúng tôi", path: "/about" },
  { label: "Dịch vụ",     path: "/services" },
  { label: "Album",        path: "/portfolio" },
  { label: "Liên hệ",     path: "/contact" },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = location.pathname === "/" || location.pathname.startsWith("/portfolio/") || location.pathname.startsWith("/services/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setMenuOpen(false); window.scrollTo(0, 0); }, [location.pathname]);

  const go = (path: string) => { navigate(path); setMenuOpen(false); };

  const textColor = (isHome && !scrolled) ? "rgba(255,255,255,0.92)" : C.forest;
  const subColor  = (isHome && !scrolled) ? "rgba(255,255,255,0.65)" : C.sageMain;

  return (
    <div style={{ fontFamily: "'Quicksand', sans-serif", background: C.bg, color: C.forest }}>
      <style>{globalStyles}</style>

      {/* ── NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{
        background: scrolled ? "rgba(253,251,247,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        boxShadow: scrolled ? `0 1px 0 rgba(52,78,65,0.08)` : "none",
      }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => go("/")} className="flex items-center gap-2 group">
            <ImageWithFallback src={logo} alt="HBT Studio logo" className="object-contain transition-transform duration-300 group-hover:scale-105" style={{ width: 52, height: 52 }} />
            <div className="text-left">
              <div className="font-bold tracking-widest transition-colors duration-300" style={{ color: textColor, letterSpacing: "0.12em", fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", lineHeight: 1.1 }}>HBT</div>
              <div className="text-xs tracking-widest font-medium transition-colors duration-300" style={{ color: subColor, letterSpacing: "0.22em", lineHeight: 1 }}>STUDIO</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => {
              const active = location.pathname === l.path;
              return (
                <button key={l.path} onClick={() => go(l.path)}
                  className="text-sm font-medium relative group transition-colors duration-300 pb-3"
                  style={{ color: active ? C.peach : ((isHome && !scrolled) ? "rgba(255,255,255,0.92)" : C.forest) }}
                >
                  {l.label}
                  {/* floral marker — top-right of text */}
                  <span
                    className="absolute flex items-center justify-center transition-all duration-500"
                    style={{
                      top: -8,
                      right: -10,
                      opacity: active ? 1 : 0,
                      transform: `scale(${active ? 1 : 0.3}) rotate(${active ? 0 : 45}deg)`,
                      transformOrigin: "center",
                    }}
                  >
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                      {/* centre petal ring */}
                      <circle cx="9" cy="7" r="2" fill={C.peach} />
                      <ellipse cx="9" cy="3.5" rx="1.5" ry="2.5" fill={C.pink} opacity="0.85" />
                      <ellipse cx="9" cy="10.5" rx="1.5" ry="2.5" fill={C.pink} opacity="0.85" />
                      <ellipse cx="5.5" cy="5" rx="1.5" ry="2.5" transform="rotate(-60 5.5 5)" fill={C.champagne} opacity="0.8" />
                      <ellipse cx="12.5" cy="5" rx="1.5" ry="2.5" transform="rotate(60 12.5 5)" fill={C.champagne} opacity="0.8" />
                      <ellipse cx="5.5" cy="9" rx="1.5" ry="2.5" transform="rotate(60 5.5 9)" fill={C.pink} opacity="0.7" />
                      <ellipse cx="12.5" cy="9" rx="1.5" ry="2.5" transform="rotate(-60 12.5 9)" fill={C.pink} opacity="0.7" />
                      {/* dot centre */}
                      <circle cx="9" cy="7" r="1.2" fill={C.white} />
                    </svg>
                  </span>
                  {/* hover dot for non-active */}
                  <span
                    className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300"
                    style={{
                      bottom: 0,
                      background: C.peach,
                      opacity: !active ? 0 : 0,
                      transform: "translateX(-50%) scale(0)",
                    }}
                  />
                </button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm font-medium transition-colors duration-300" style={{ color: (isHome && !scrolled) ? "rgba(255,255,255,0.85)" : C.forestMid }}>0385 711 415</span>
            <button onClick={() => go("/contact")} className="px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md" style={{ background: C.peach, color: C.white }}>
              Đặt lịch
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} color={C.forest} /> : <Menu size={22} color={(isHome && !scrolled) ? C.white : C.forest} />}
          </button>
        </div>

        {/* mobile menu */}
        <div className="md:hidden overflow-hidden transition-all duration-500"
          style={{ maxHeight: menuOpen ? "400px" : "0", background: "rgba(253,251,247,0.98)", backdropFilter: "blur(16px)" }}>
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button key={l.path} onClick={() => go(l.path)}
                className="text-left font-medium py-2 border-b text-sm"
                style={{ borderColor: C.sageLight, color: location.pathname === l.path ? C.peach : C.forestMid }}
              >{l.label}</button>
            ))}
            <button onClick={() => go("/contact")} className="mt-2 py-3 rounded-full text-sm font-semibold" style={{ background: C.peach, color: C.white }}>
              Đặt lịch ngay
            </button>
          </div>
        </div>
      </header>

      {/* ── PAGE CONTENT */}
      <main>
        <Outlet />
      </main>

      {/* ── FOOTER */}
      <footer className="py-12 px-6" style={{ background: C.forest }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <ImageWithFallback src={logo} alt="HBT Studio logo" className="object-contain" style={{ width: 56, height: 56, filter: "brightness(0) invert(1) sepia(1) saturate(0.6) brightness(1.1)" }} />
              <div>
                <div className="font-bold tracking-widest" style={{ fontFamily: "'Playfair Display', serif", color: C.champagne, letterSpacing: "0.14em", fontSize: "1.1rem" }}>HBT STUDIO</div>
                <div className="text-xs mt-0.5" style={{ color: C.sageMain }}>236B Lê Văn Sỹ, Quận 3, TP.HCM</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              {NAV_LINKS.map((l) => (
                <button key={l.path} onClick={() => go(l.path)} className="text-xs font-medium transition-colors duration-300 hover:text-white" style={{ color: C.sageMain }}>{l.label}</button>
              ))}
            </div>
            <div className="flex gap-3">
              {[{ icon: <Instagram size={16} />, label: "Instagram" }, { icon: <Facebook size={16} />, label: "Facebook" }, { icon: <Youtube size={16} />, label: "YouTube" }].map((s) => (
                <button key={s.label} aria-label={s.label}
                  className="w-9 h-9 border-2 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ borderColor: C.sageMain, color: C.sageMain }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = C.peach; el.style.borderColor = C.peach; el.style.color = C.white; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.borderColor = C.sageMain; el.style.color = C.sageMain; }}
                >{s.icon}</button>
              ))}
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ borderTop: `1px solid rgba(163,177,138,0.2)`, color: C.sageMain }}>
            <span>© 2025 HBT Studio Photography. All rights reserved.</span>
            <span>Hotline: <span className="text-white font-medium">0385 711 415</span></span>
          </div>
        </div>
      </footer>

      {/* ── SCROLL TO TOP */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Về đầu trang"
        className="fixed bottom-8 right-6 z-50 flex flex-col items-center gap-1 group"
        style={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? "auto" : "none", transform: scrolled ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.4s, transform 0.4s" }}
      >
        <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl" style={{ background: C.peach }}>
          <ArrowUp size={18} color={C.white} />
        </div>
        <span className="text-xs font-semibold" style={{ color: C.forestMid, fontSize: "10px" }}>Về đầu</span>
      </button>
    </div>
  );
}
