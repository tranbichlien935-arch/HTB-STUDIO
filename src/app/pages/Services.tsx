import { useNavigate } from "react-router";
import { Leaf, ArrowRight } from "lucide-react";
import { C, SERVICES, FadeUp, BranchDivider, SectionBanner, ServiceCard } from "@/app/shared";


export default function Services() {
  const navigate = useNavigate();
  return (
    <div style={{ background: C.bg }}>
      <div className="pt-20">
        <SectionBanner
          img="https://images.pexels.com/photos/37902252/pexels-photo-37902252.jpeg"
          title="Dịch Vụ"
          subtitle="Gói chụp ảnh"
          align="center"
        />
      </div>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-4">
              <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                <Leaf size={12} color={C.sageMain} /> Dịch vụ <Leaf size={12} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.forest }}>
                Tất cả gói dịch vụ
              </h2>
              <p className="mt-3 text-sm max-w-xl mx-auto" style={{ color: C.sageMain }}>
                Chúng tôi cung cấp đầy đủ các gói chụp ảnh chuyên nghiệp, phù hợp với mọi nhu cầu và ngân sách.
              </p>
            </div>
            <BranchDivider />
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.name} delay={i * 0.07}>
                <ServiceCard s={s} onBook={() => navigate("/contact")} onDetail={() => navigate(`/services/${s.slug}`)} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6" style={{ background: C.sageLight }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-4">
              <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                <Leaf size={12} color={C.sageMain} /> Quy trình <Leaf size={12} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: C.forest }}>
                Từ đặt lịch đến nhận ảnh
              </h2>
            </div>
            <BranchDivider />
          </FadeUp>
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              { step: "01", title: "Tư vấn", desc: "Liên hệ và trao đổi về nhu cầu, concept, ngân sách." },
              { step: "02", title: "Lên kế hoạch", desc: "Chọn ngày, địa điểm, trang phục và phong cách phù hợp." },
              { step: "03", title: "Buổi chụp", desc: "Ekip chuyên nghiệp dẫn dắt bạn tự nhiên, thoải mái." },
              { step: "04", title: "Nhận ảnh", desc: "Ảnh chỉnh sửa đẹp, giao qua link tải trong 5–7 ngày." },
            ].map((p, i) => (
              <FadeUp key={p.step} delay={i * 0.1}>
                <div className="text-center p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.6)" }}>
                  <div className="font-bold text-5xl mb-3" style={{ fontFamily: "'Playfair Display', serif", color: C.sageMain, opacity: 0.5 }}>{p.step}</div>
                  <h3 className="font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: C.forest }}>{p.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: C.forestMid }}>{p.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6" style={{ background: C.bg }}>
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <div className="text-center mb-4">
              <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                <Leaf size={12} color={C.sageMain} /> FAQ <Leaf size={12} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: C.forest }}>Câu hỏi thường gặp</h2>
            </div>
            <BranchDivider />
          </FadeUp>
          <div className="mt-10 space-y-4">
            {[
              { q: "Thời gian giao ảnh là bao lâu?", a: "Thông thường 5–7 ngày làm việc sau buổi chụp. Đối với album cưới có thể lên đến 10–14 ngày tùy số lượng ảnh." },
              { q: "Ảnh được giao ở định dạng nào?", a: "Ảnh giao qua link tải về, định dạng JPG độ phân giải cao, phù hợp in ảnh cỡ lớn và lưu giữ lâu dài." },
              { q: "Có được chụp thử trước không?", a: "Có! Chúng tôi khuyến khích khách hàng đặt buổi thử 30 phút (miễn phí khi đặt gói chính) để cảm nhận phong cách làm việc." },
              { q: "Hủy lịch cần báo trước bao lâu?", a: "Vui lòng báo trước ít nhất 48 giờ để tránh phát sinh phí. Trường hợp khẩn cấp, chúng tôi sẽ linh hoạt hỗ trợ tối đa." },
            ].map((f, i) => (
              <FadeUp key={f.q} delay={i * 0.07}>
                <div className="p-6 rounded-2xl border" style={{ borderColor: C.sageLight, background: C.white }}>
                  <h3 className="font-semibold mb-2 text-sm" style={{ color: C.forest }}>{f.q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.forestMid }}>{f.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3}>
            <div className="text-center mt-10">
              <button onClick={() => navigate("/contact")} className="group inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105" style={{ background: C.peach, color: C.white, boxShadow: `0 8px 28px rgba(244,162,97,0.35)` }}>
                Đặt lịch ngay
              </button>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
