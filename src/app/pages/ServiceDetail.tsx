import { useParams, useNavigate } from "react-router";
import { ArrowRight, ArrowLeft, Clock, Tag, Leaf, CheckCircle } from "lucide-react";
import { C, SERVICES, FadeUp, BranchDivider } from "@/app/shared";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20" style={{ background: C.bg }}>
        <div className="text-center">
          <p className="mb-4" style={{ color: C.sageMain }}>Dịch vụ không tồn tại.</p>
          <button onClick={() => navigate("/services")} className="text-sm font-semibold" style={{ color: C.peach }}>← Quay lại Dịch vụ</button>
        </div>
      </div>
    );
  }

  const related = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div style={{ background: C.bg }}>

      {/* ── HERO */}
      <div className="relative pt-20 overflow-hidden" style={{ height: "60vh", minHeight: 420 }}>
        <img src={service.hero} alt={service.name} className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.4) saturate(1.1)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(52,78,65,0.2) 0%, rgba(52,78,65,0.7) 100%)" }} />

        <button onClick={() => navigate("/services")} className="absolute top-28 left-6 z-20 flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
          <ArrowLeft size={16} /> Quay lại Dịch vụ
        </button>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6 z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3" style={{ opacity: 0, animation: "fadeUp 0.9s ease 0.1s forwards" }}>
            <span className="h-px w-8" style={{ background: C.champagne, opacity: 0.7 }} />
            <span className="text-xs tracking-widest uppercase font-medium" style={{ color: C.champagne, letterSpacing: "0.2em" }}>{service.category}</span>
            <span className="h-px w-8" style={{ background: C.champagne, opacity: 0.7 }} />
          </div>
          <h1 className="font-semibold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, opacity: 0, animation: "fadeUp 0.9s ease 0.3s forwards" }}>
            {service.name}
          </h1>
          <p className="text-white/70 max-w-xl text-base" style={{ opacity: 0, animation: "fadeUp 0.9s ease 0.4s forwards" }}>{service.desc}</p>
        </div>
      </div>

      {/* ── MAIN CONTENT */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header Info (Title + Desc) spanning full width */}
          <FadeUp>
            <div className="text-xs tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: C.sageMain }}>
              <Leaf size={11} color={C.sageMain} /> HBT Studio
            </div>
            <h2 className="font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: C.forest }}>
              {service.name}
            </h2>
            <BranchDivider />
            <p className="mt-5 leading-relaxed text-base max-w-3xl" style={{ color: C.forestMid }}>{service.fullDesc}</p>
          </FadeUp>

          {/* Merged Image & Info Card (Non-sticky, Single block) */}
          <FadeUp delay={0.12}>
            <div className="mt-10 rounded-[2rem] overflow-hidden border flex flex-col lg:flex-row" style={{ borderColor: C.sageLight, minHeight: 440 }}>

              {/* Left: Image */}
              <div className="lg:w-[65%] relative" style={{ minHeight: 300 }}>
                <img
                  src={service.detailImg || service.img || service.hero}
                  alt={service.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(52,78,65,0.45) 0%, transparent 60%)" }}
                />
                <div className="absolute bottom-6 left-8">
                  <span
                    className="text-xs tracking-widest uppercase font-medium px-4 py-2 rounded-full"
                    style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", color: C.white, border: "1px solid rgba(255,255,255,0.25)" }}
                  >
                    HBT Studio · {service.name}
                  </span>
                </div>
              </div>

              {/* Right: Info Card */}
              <div className="lg:w-[35%] flex flex-col border-t lg:border-t-0 lg:border-l" style={{ borderColor: C.sageLight }}>
                {/* price header */}
                <div className="px-6 py-8 text-center" style={{ background: C.forest }}>
                  <div className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: C.champagne }}>{service.price}</div>
                  <div className="text-xs mt-1.5 tracking-wide" style={{ color: C.sageMain }}>Giá tham khảo</div>
                </div>
                {/* details */}
                <div className="px-8 py-10 space-y-6 flex-grow" style={{ background: C.white }}>
                  <div className="flex items-center gap-4 pb-5 border-b" style={{ borderColor: C.sageLight }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: C.sageLight }}>
                      <Clock size={16} color={C.forestMid} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide mb-1" style={{ color: C.sageMain }}>Thời lượng</div>
                      <div className="text-sm font-semibold" style={{ color: C.forest }}>{service.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: C.sageLight }}>
                      <Tag size={16} color={C.forestMid} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide mb-1" style={{ color: C.sageMain }}>Danh mục</div>
                      <div className="text-sm font-semibold" style={{ color: C.forest }}>{service.category}</div>
                    </div>
                  </div>
                </div>
                {/* CTA */}
                <div className="p-6 border-t" style={{ borderColor: C.sageLight, background: C.bg }}>
                  <button
                    onClick={() => navigate("/contact")}
                    className="group w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    style={{ background: C.peach, color: C.white, boxShadow: `0 6px 20px rgba(244,162,97,0.35)` }}
                  >
                    Đặt lịch ngay <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-xs mt-3" style={{ color: C.sageMain }}>Tư vấn miễn phí · Không cam kết</p>
                </div>
              </div>

            </div>
          </FadeUp>

          {/* Includes */}
          <FadeUp delay={0.15}>
            <div className="mt-12">
              <h3 className="font-semibold mb-6 text-lg" style={{ fontFamily: "'Playfair Display', serif", color: C.forest }}>
                Bao gồm trong gói
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: C.sageLight }}>
                    <CheckCircle size={18} color={C.forestMid} className="mt-0.5 shrink-0" />
                    <span className="text-sm leading-relaxed" style={{ color: C.forest }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PROCESS */}
      <section className="py-20 px-6" style={{ background: C.forest }}>
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="h-px w-8" style={{ background: C.champagne, opacity: 0.4 }} />
                <span className="text-xs tracking-widest uppercase font-medium" style={{ color: C.champagne, letterSpacing: "0.2em" }}>Process</span>
                <span className="h-px w-8" style={{ background: C.champagne, opacity: 0.4 }} />
              </div>
              <h2 className="font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
                Quy trình làm việc
              </h2>
              <p className="mt-2 text-sm" style={{ color: C.sageMain }}>HBT Studio luôn chuẩn bị kỹ để buổi chụp diễn ra nhẹ nhàng và hiệu quả.</p>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6 mt-12 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px" style={{ background: `rgba(163,177,138,0.25)` }} />
            {service.process.map((step, i) => (
              <FadeUp key={step.no} delay={i * 0.12}>
                <div className="relative text-center px-6 py-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10" style={{ background: C.sageLight }}>
                    <span className="font-bold text-sm" style={{ color: C.forest }}>{step.no}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.sageMain }}>{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED */}
      <section className="py-20 px-6" style={{ background: C.sageLight }}>
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-10">
              <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                <Leaf size={11} color={C.sageMain} /> Dịch vụ khác <Leaf size={11} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: C.forest }}>Có thể bạn quan tâm</h2>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((s, i) => (
              <FadeUp key={s.slug} delay={i * 0.1}>
                <div
                  className="group p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ borderColor: C.sageLight, background: C.white }}
                  onClick={() => navigate(`/services/${s.slug}`)}
                >
                  <div className="text-3xl mb-3">{s.emoji}</div>
                  <h3 className="font-semibold mb-1 text-sm" style={{ fontFamily: "'Playfair Display', serif", color: C.forest }}>{s.name}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: C.sageMain }}>{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm" style={{ color: C.peach }}>{s.price}</span>
                    <span className="text-xs flex items-center gap-1" style={{ color: C.sageMain }}>
                      Xem chi tiết <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
