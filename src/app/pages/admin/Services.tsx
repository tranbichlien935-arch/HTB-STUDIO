import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Loader2, Sparkles, Receipt, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { collection, getDocs, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function AdminServices() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Form states
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [coverUrl, setCoverUrl] = useState("");
    const [saving, setSaving] = useState(false);

    const fetchServices = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "services"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Sắp xếp tạm thời
            setServices(data.sort((a: any, b: any) => b.createdAt?.toMillis() - a.createdAt?.toMillis()));
        } catch (error) {
            console.error("Error fetching services: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const openCreateModal = () => {
        setEditingId(null);
        setNewTitle("");
        setNewPrice("");
        setNewDesc("");
        setCoverUrl("");
        setShowModal(true);
    };

    const openEditModal = (svc: any) => {
        setEditingId(svc.id);
        setNewTitle(svc.title || "");
        setNewPrice(svc.price || "");
        setNewDesc(svc.description || "");
        setCoverUrl(svc.coverImage || "");
        setShowModal(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingId) {
                await updateDoc(doc(db, "services", editingId), {
                    title: newTitle,
                    price: newPrice,
                    description: newDesc,
                    coverImage: coverUrl,
                });
            } else {
                await addDoc(collection(db, "services"), {
                    title: newTitle,
                    price: newPrice,
                    description: newDesc,
                    coverImage: coverUrl,
                    createdAt: serverTimestamp(),
                });
            }
            setShowModal(false);
            fetchServices();
        } catch (err) {
            alert("Lỗi khi lưu Dịch vụ!");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Chắc chắn muốn xóa dịch vụ/gói chụp này?")) {
            await deleteDoc(doc(db, "services", id));
            fetchServices();
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#344E41]">Dịch vụ & Gói chụp</h1>
                    <p className="text-neutral-500 text-sm mt-1">Thiết lập các gói bảng giá hiển thị trên trang chủ</p>
                </div>
                <button onClick={openCreateModal} className="bg-[#344E41] hover:bg-[#2c4137] text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-[#344E41]/20">
                    <Plus size={18} /> Thêm gói mới
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-neutral-400">
                        <Loader2 className="animate-spin mb-2" size={30} />
                        Đang tải dữ liệu...
                    </div>
                ) : services.length === 0 ? (
                    <div className="col-span-full py-16 flex flex-col items-center justify-center bg-white rounded-xl border border-neutral-200">
                        <Sparkles size={48} className="text-neutral-300 mb-4" />
                        <p className="text-xl font-medium text-[#344E41]">Chưa có gói dịch vụ nào</p>
                        <p className="text-neutral-500 text-sm mt-1">Thêm các báo giá dịch vụ (Cưới, kỷ yếu, cá nhân...)</p>
                    </div>
                ) : (
                    services.map((svc) => (
                        <div key={svc.id} className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow relative">
                            {svc.coverImage ? (
                                <div className="w-full h-32 mb-4 bg-neutral-100 rounded-xl overflow-hidden">
                                    <img src={svc.coverImage} alt={svc.title} className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <div className="w-12 h-12 bg-[#EEF4EC] rounded-xl flex items-center justify-center text-[#588157] mb-4">
                                    <Receipt size={24} />
                                </div>
                            )}
                            <h3 className="text-lg font-bold text-[#344E41] mb-1">{svc.title}</h3>
                            <p className="text-[#F4A261] font-bold text-xl mb-4">{svc.price}</p>

                            <p className="text-sm text-neutral-600 line-clamp-3 mb-6 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                                {svc.description || "Chưa có mô tả chi tiết."}
                            </p>

                            <div className="flex justify-end gap-2 border-t border-neutral-100 pt-4">
                                <button onClick={() => openEditModal(svc)} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-neutral-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                    <Edit size={16} /> Sửa
                                </button>
                                <button onClick={() => handleDelete(svc.id)} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                    <Trash2 size={16} /> Xóa
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal Thêm/Sửa Dịch Vụ */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl scale-in-95 duration-200 max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center bg-[#FDFBF7] shrink-0">
                            <h2 className="text-xl font-bold text-[#344E41]">{editingId ? "Sửa Gói Dịch Vụ" : "Thêm Gói Dịch Vụ Mới"}</h2>
                            <button disabled={saving} onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-red-500 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 overflow-y-auto">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-[#344E41] mb-1.5">Tên Gói Chụp <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        required
                                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[#A3B18A] outline-none"
                                        placeholder="VD: Trọn Gói Phóng Sự Cưới"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#344E41] mb-1.5">Mức Giá <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={newPrice}
                                        onChange={(e) => setNewPrice(e.target.value)}
                                        required
                                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[#A3B18A] outline-none font-semibold text-[#F4A261]"
                                        placeholder="VD: Từ 15.000.000đ"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#344E41] mb-1.5">Link Ảnh Mô Tả (Tuỳ chọn)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                                            <LinkIcon size={18} />
                                        </div>
                                        <input
                                            type="url"
                                            value={coverUrl}
                                            onChange={(e) => setCoverUrl(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[#A3B18A] outline-none"
                                            placeholder="https://images.pexels.com/..."
                                        />
                                    </div>
                                    {coverUrl && (
                                        <div className="mt-3 w-full h-32 rounded-lg bg-neutral-100 overflow-hidden border border-neutral-200 flex items-center justify-center">
                                            <img src={coverUrl} alt="Preview" className="w-full h-full object-cover"
                                                onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/f8f9fa/c1c2c5?text=Link+Anh+Loi'} />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#344E41] mb-1.5">Mô tả đặc quyền / Bao gồm những gì</label>
                                    <textarea
                                        rows={4}
                                        value={newDesc}
                                        onChange={(e) => setNewDesc(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[#A3B18A] outline-none resize-none"
                                        placeholder="VD: Bao gồm 2 máy nháy, giao toàn bộ file ảnh gốc, 1 photobook siêu mỏng..."
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-neutral-100">
                                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-neutral-600 font-medium hover:bg-neutral-100 rounded-lg transition-colors">
                                    Hủy bỏ
                                </button>
                                <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[#344E41] text-white font-medium rounded-lg hover:bg-[#2c4137] transition-all flex items-center gap-2 shadow-md">
                                    {saving ? <Loader2 className="animate-spin" size={18} /> : (editingId ? "Lưu Thay Đổi" : "Lưu Bảng Giá")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
