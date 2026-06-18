import { Leaf, MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { C, SERVICES, FadeUp, BranchDivider, SectionBanner, PORTFOLIO } from "@/app/shared";

export default function Contact() {
  const [dbServices, setDbServices] = useState<any[]>([]);
  const [dbAlbums, setDbAlbums] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { collection, getDocs } = await import("firebase/firestore");
        const { db } = await import("../../lib/firebase");

        // Fetch services
        const sSnap = await getDocs(collection(db, "services"));
        setDbServices(sSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        // Fetch albums
        const aSnap = await getDocs(collection(db, "albums"));
        setDbAlbums(aSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Failed fetching contact dropdown data", err);
      }
    };
    fetchData();
  }, []);
  return (
    <div style={{ background: C.sageLight }}>
      <div className="pt-20">
        <SectionBanner
          img="https://images.pexels.com/photos/37902252/pexels-photo-37902252.jpeg"
          title="Liên Hệ & Đặt Lịch"
          subtitle="Kết nối với chúng tôi"
          align="left"
        />
      </div>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-4">
              <div className="text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: C.sageMain }}>
                <Leaf size={12} color={C.sageMain} /> Liên hệ <Leaf size={12} color={C.sageMain} style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.forest }}>Đặt lịch chụp ảnh</h2>
            </div>
            <BranchDivider />
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-16 mt-12">
            {/* Info */}
            <FadeUp>
              <div>
                <div className="grid gap-4 mb-8">
                  {[
                    { icon: <MapPin size={18} color={C.peach} />, label: "Địa chỉ", value: "236B Lê Văn Sỹ, Quận 3, TP.HCM" },
                    { icon: <Phone size={18} color={C.peach} />, label: "Hotline", value: "0385 711 415" },
                    { icon: <Mail size={18} color={C.peach} />, label: "Email", value: "huynhbaotran@gmail.com" },
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

                {/* Map placeholder */}
                <div className="rounded-2xl overflow-hidden mb-6" style={{ height: 200, background: C.sageLight }}>
                  <iframe
                    title="HBT Studio location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3290945624185!2d106.67627!3d10.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzQ4LjAiTiAxMDbCsDQwJzM0LjYiRQ!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                    width="100%" height="100%" style={{ border: 0, filter: "saturate(0.7)" }} allowFullScreen loading="lazy"
                  />
                </div>

                <div className="flex gap-3">
                  {[
                    { icon: <Instagram size={18} />, label: "Instagram" },
                    { icon: <Facebook size={18} />, label: "Facebook" },
                    { icon: <Youtube size={18} />, label: "YouTube" },
                  ].map((s) => (
                    <button key={s.label} aria-label={s.label}
                      className="w-10 h-10 border-2 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{ borderColor: C.sageMain, color: C.sageMain }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = C.peach; el.style.borderColor = C.peach; el.style.color = C.white; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.borderColor = C.sageMain; el.style.color = C.sageMain; }}
                    >{s.icon}</button>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Form */}
            <FadeUp delay={0.15}>
              <form
                className="flex flex-col gap-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const form = e.target as HTMLFormElement;
                    const data = {
                      name: (form.elements.namedItem("name") as HTMLInputElement).value,
                      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
                      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
                      date: (form.elements.namedItem("date") as HTMLInputElement).value,
                      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
                      status: "pending",
                      createdAt: new Date().toISOString()
                    };

                    const { collection, addDoc } = await import("firebase/firestore");
                    const { db } = await import("../../lib/firebase");
                    await addDoc(collection(db, "bookings"), data);

                    alert("Cảm ơn bạn! Yêu cầu đặt lịch đã được gửi đến Admin.");
                    form.reset();
                  } catch (error) {
                    console.error("Booking failed", error);
                    alert("Có lỗi xảy ra, vui lòng thử lại sau.");
                  }
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="name" placeholder="Họ và tên" required
                    className="w-full px-4 py-3.5 text-sm rounded-xl border-2 focus:outline-none transition-all duration-300"
                    style={{ borderColor: C.sageLight, background: C.white, color: C.forest }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = C.sageMain)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = C.sageLight)}
                  />
                  <input name="phone" placeholder="Số điện thoại" required
                    className="w-full px-4 py-3.5 text-sm rounded-xl border-2 focus:outline-none transition-all duration-300"
                    style={{ borderColor: C.sageLight, background: C.white, color: C.forest }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = C.sageMain)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = C.sageLight)}
                  />
                </div>
                <select name="service" required
                  className="w-full px-4 py-3.5 text-sm rounded-xl border-2 focus:outline-none transition-all duration-300 cursor-pointer"
                  style={{ borderColor: C.sageLight, background: C.white, color: C.forestMid }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = C.sageMain)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = C.sageLight)}
                >
                  <option value="">Chọn dịch vụ / phong cách</option>

                  {/* Backup static data if DB is empty */}
                  {dbServices.length === 0 && SERVICES.map((s) => <option key={s.name} value={`[DỊCH VỤ] ${s.name}`}>{s.name} — {s.price}</option>)}

                  {dbServices.length > 0 && (
                    <optgroup label="👉 Đặt theo Gói Dịch Vụ">
                      {dbServices.map(s => <option key={s.id} value={`[DỊCH VỤ] ${s.title}`}>{s.title} — {s.price}</option>)}
                    </optgroup>
                  )}

                  <optgroup label="👉 Muốn chụp theo Concept / Album">
                    {[...dbAlbums, ...PORTFOLIO].map((a, i) => (
                      <option key={`album-${a.id || a.slug}-${i}`} value={`[ALBUM] ${a.title}`}>Cảm hứng từ: {a.title}</option>
                    ))}
                  </optgroup>
                </select>
                <input type="date" name="date" required
                  className="w-full px-4 py-3.5 text-sm rounded-xl border-2 focus:outline-none transition-all duration-300"
                  style={{ borderColor: C.sageLight, background: C.white, color: C.forestMid }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = C.sageMain)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = C.sageLight)}
                />
                <textarea rows={4} name="notes" placeholder="Ghi chú thêm về yêu cầu của bạn..."
                  className="w-full px-4 py-3.5 text-sm rounded-xl border-2 focus:outline-none transition-all duration-300 resize-none"
                  style={{ borderColor: C.sageLight, background: C.white, color: C.forest }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = C.sageMain)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = C.sageLight)}
                />
                <button type="submit"
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
    </div>
  );
}
