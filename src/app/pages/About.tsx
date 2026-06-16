import { useNavigate } from "react-router";
import { ArrowRight, Leaf, MapPin, Phone, Mail, Clock, Camera, Star, Award } from "lucide-react";
import { C, FadeUp, BranchDivider, SectionBanner } from "@/app/shared";

const VALUES = [
  { icon: "🌿", title: "Tự nhiên & Chân thực", desc: "Chúng tôi luôn hướng đến sự chân thực trong từng khoảnh khắc, không dàn dựng quá mức mà để cảm xúc tự nhiên tỏa sáng." },
  { icon: "🎨", title: "Sáng tạo & Tinh tế", desc: "Mỗi bộ ảnh là một tác phẩm nghệ thuật riêng — được nghiên cứu kỹ về ánh sáng, màu sắc và bố cục để đạt chuẩn thẩm mỹ cao nhất." },
  { icon: "💚", title: "Tận tâm & Chu đáo", desc: "Từ tư vấn trước buổi chụp đến giao ảnh thành phẩm, chúng tôi đồng hành cùng bạn trong từng bước với sự tận tâm tuyệt đối." },
  { icon: "✨", title: "Chuyên nghiệp & Đáng tin", desc: "Hơn 5 năm kinh nghiệm, 500+ khách hàng hài lòng là minh chứng cho sự uy tín và chất lượng nhất quán của HBT Studio." },
];

const TEAM = [
  { name: "Hoàng Bảo Trân", role: "Nhiếp ảnh gia chính", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&auto=format" },
  { name: "Minh Khoa", role: "Quay phim & Dựng phim", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format" },
  { name: "Thu Uyên", role: "Chuyên gia Make Up", img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop&auto=format" },
];

export default function About() {
  const navigate = useNavigate();
  return (
    <div style={{ background: C.bg }}>
      <div className="pt-20">
        <SectionBanner
          img="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&h=500&fit=crop&auto=format"
          title="Về Chúng Tôi"
          subtitle="HBT Studio"
          align="left"
        />
      </div>

      {/* Story */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="relative overflow-hidden rounded-2xl" style={{ height: 520, background: C.sageLight }}>
              <img src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=700&h=900&fit=crop&auto=format" alt="Studio photographer" className="w-full h-full object-cover" style={{ filter: "brightness(0.88)" }} />
            </div>
          </FadeUp>
          <FadeUp delay={0.18}>
            <div>
              <div className="text-xs tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: C.sageMain }}>
                <Leaf size={13} color={C.sageMain} /> Câu chuyện của chúng tôi
              </div>
              <h2 className="font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: 1.15, color: C.forest }}>
                Hành trình ghi lại<br /><em className="italic" style={{ color: C.forestMid }}>vẻ đẹp cuộc sống</em>
              </h2>
              <BranchDivider />
              <div className="mt-4 space-y-4 text-sm leading-relaxed" style={{ color: C.forestMid }}>
                <p>HBT Studio được thành lập với niềm đam mê mãnh liệt với nhiếp ảnh nghệ thuật. Chúng tôi tin rằng những khoảnh khắc đẹp nhất trong cuộc đời đều xứng đáng được lưu giữ mãi mãi qua từng bức ảnh.</p>
                <p>Với hơn 5 năm hoạt động tại TP.HCM, chúng tôi đã đồng hành cùng hơn 500 khách hàng trong những dịp đặc biệt nhất — từ ngày cưới thiêng liêng, kỷ niệm gia đình ấm áp, đến những cột mốc đáng nhớ trong cuộc đời.</p>
                <p>Mỗi bộ ảnh của HBT Studio không chỉ là hình ảnh — đó là cảm xúc được đóng khung, là ký ức được giữ nguyên vẹn theo thời gian.</p>
              </div>
              <button onClick={() => navigate("/services")} className="group mt-8 flex items-center gap-2 text-sm font-semibold transition-all duration-300" style={{ color: C.peach }}>
                Xem dịch vụ của chúng tôi <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6" style={{ background: C.sageLight }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-4">
              <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                <Leaf size={12} color={C.sageMain} /> Giá trị cốt lõi <Leaf size={12} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: C.forest }}>Những gì chúng tôi tin tưởng</h2>
            </div>
            <BranchDivider />
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {VALUES.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.09}>
                <div className="p-7 rounded-2xl h-full" style={{ background: "rgba(255,255,255,0.65)" }}>
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="font-semibold mb-2 text-base" style={{ fontFamily: "'Playfair Display', serif", color: C.forest }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.forestMid }}>{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-4">
              <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                <Leaf size={12} color={C.sageMain} /> Đội ngũ <Leaf size={12} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: C.forest }}>Những người đứng sau ống kính</h2>
            </div>
            <BranchDivider />
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {TEAM.map((m, i) => (
              <FadeUp key={m.name} delay={i * 0.12}>
                <div className="text-center group">
                  <div className="relative overflow-hidden rounded-2xl mx-auto mb-4" style={{ height: 320, maxWidth: 280, background: C.sageLight }}>
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(52,78,65,0.4) 0%, transparent 50%)" }} />
                  </div>
                  <h3 className="font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif", color: C.forest }}>{m.name}</h3>
                  <p className="text-sm mt-1" style={{ color: C.sageMain }}>{m.role}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* ── MOTTO */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: C.forest }}>
        {/* decorative large quote mark */}
        <div className="absolute top-6 left-8 select-none pointer-events-none"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "16rem", lineHeight: 1, color: "rgba(163,177,138,0.08)", fontStyle: "italic" }}>
          "
        </div>
        <div className="absolute bottom-0 right-8 select-none pointer-events-none"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "16rem", lineHeight: 0.8, color: "rgba(163,177,138,0.06)", fontStyle: "italic" }}>
          "
        </div>
        <FadeUp>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-10" style={{ background: C.champagne, opacity: 0.5 }} />
              <span className="text-xs tracking-widest uppercase font-medium" style={{ color: C.champagne, letterSpacing: "0.2em" }}>Phương châm</span>
              <span className="h-px w-10" style={{ background: C.champagne, opacity: 0.5 }} />
            </div>
            <blockquote
              className="font-semibold italic leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", color: C.white, lineHeight: 1.25 }}
            >
              "Mỗi khoảnh khắc đều có linh hồn riêng —<br />
              <span style={{ color: C.champagne }}>chúng tôi ở đây để gìn giữ nó."</span>
            </blockquote>
            <p className="text-sm" style={{ color: C.sageMain }}>— HBT Studio, từ 2019</p>
          </div>
        </FadeUp>
      </section>

      {/* ── STUDIO INFO */}
      <section className="py-24 px-6" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-4">
              <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                <Leaf size={12} color={C.sageMain} /> Thông tin studio <Leaf size={12} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: C.forest }}>
                Những điều cần biết
              </h2>
            </div>
            <BranchDivider />
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {/* Left: key facts */}
            <FadeUp delay={0.1}>
              <div className="rounded-2xl p-8 h-full" style={{ background: C.sageLight }}>
                <h3 className="font-semibold mb-6 text-lg" style={{ fontFamily: "'Playfair Display', serif", color: C.forest }}>
                  Thông tin liên hệ
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: <MapPin size={16} color={C.peach} />, label: "Địa chỉ", value: "236B Lê Văn Sỹ, Quận 3, TP.HCM" },
                    { icon: <Phone size={16} color={C.peach} />, label: "Hotline", value: "0385 711 415" },
                    { icon: <Mail size={16} color={C.peach} />, label: "Email", value: "studio@hbtstudio.vn" },
                    { icon: <Clock size={16} color={C.peach} />, label: "Giờ hoạt động", value: "8:00 – 20:00, Thứ 2 – Chủ nhật" },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">{item.icon}</div>
                      <div>
                        <div className="text-xs uppercase tracking-wide mb-0.5" style={{ color: C.sageMain }}>{item.label}</div>
                        <div className="text-sm font-medium" style={{ color: C.forest }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Right: commitments */}
            <FadeUp delay={0.18}>
              <div className="rounded-2xl p-8 h-full" style={{ background: C.white, border: `1.5px solid ${C.sageLight}` }}>
                <h3 className="font-semibold mb-6 text-lg" style={{ fontFamily: "'Playfair Display', serif", color: C.forest }}>
                  Cam kết với khách hàng
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: <Camera size={16} color={C.forestMid} />, text: "Tư vấn concept miễn phí trước buổi chụp" },
                    { icon: <Star size={16} color={C.forestMid} />,   text: "Giao ảnh chỉnh sửa trong 5–7 ngày làm việc" },
                    { icon: <Award size={16} color={C.forestMid} />,  text: "Hoàn tiền 100% nếu không hài lòng với kết quả" },
                    { icon: <Leaf size={16} color={C.forestMid} />,   text: "Không gian chụp thoải mái, không áp lực" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0" style={{ borderColor: C.sageLight }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: C.sageLight }}>
                        {item.icon}
                      </div>
                      <p className="text-sm leading-relaxed pt-1" style={{ color: C.forestMid }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Bottom wide: what to prepare */}
            <FadeUp delay={0.22} className="md:col-span-2">
              <div className="rounded-2xl p-8" style={{ background: C.forest }}>
                <h3 className="font-semibold mb-6 text-lg text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Khách hàng cần chuẩn bị gì?
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { no: "01", title: "Trang phục", desc: "Chuẩn bị 1–2 bộ phù hợp concept, ủi phẳng trước khi đến." },
                    { no: "02", title: "Tâm lý thoải mái", desc: "Không cần biết tạo dáng — ekip sẽ hướng dẫn từng bước." },
                    { no: "03", title: "Đến đúng giờ", desc: "Vui lòng có mặt trước 10 phút để make up và chuẩn bị." },
                    { no: "04", title: "Ý tưởng (nếu có)", desc: "Bạn có thể mang ảnh tham khảo để ekip nắm phong cách mong muốn." },
                  ].map(item => (
                    <div key={item.no} className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.07)" }}>
                      <div className="font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: C.sageMain, opacity: 0.5, lineHeight: 1 }}>{item.no}</div>
                      <div className="font-semibold text-sm mb-1 text-white">{item.title}</div>
                      <div className="text-xs leading-relaxed" style={{ color: C.sageMain }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: C.sageLight }}>
        <FadeUp>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: C.forest }}>
              Hãy để chúng tôi<br /><em className="italic" style={{ color: C.forestMid }}>kể câu chuyện của bạn</em>
            </h2>
            <p className="mb-8 text-sm leading-relaxed" style={{ color: C.forestMid }}>Liên hệ ngay hôm nay để được tư vấn miễn phí và đặt lịch cho buổi chụp đặc biệt của bạn.</p>
            <button onClick={() => navigate("/contact")} className="group inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105" style={{ background: C.peach, color: C.white, boxShadow: `0 8px 28px rgba(244,162,97,0.35)` }}>
              Liên hệ ngay <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
