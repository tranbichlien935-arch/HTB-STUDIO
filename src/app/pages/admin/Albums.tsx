import { useState, useEffect } from "react";
import { Plus, Image as ImageIcon, Trash2, Edit, X, Link as LinkIcon, Loader2, List as ListIcon } from "lucide-react";
import { collection, getDocs, addDoc, updateDoc, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function AdminAlbums() {
    const [albums, setAlbums] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Form states
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState("");
    const [newCategory, setNewCategory] = useState("Cá nhân");
    const [coverUrl, setCoverUrl] = useState("");
    const [galleryInput, setGalleryInput] = useState("");
    const [saving, setSaving] = useState(false);

    const fetchAlbums = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "albums"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAlbums(data.sort((a: any, b: any) => b.createdAt?.toMillis() - a.createdAt?.toMillis()));
        } catch (error) {
            console.error("Error fetching albums: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlbums();
    }, []);

    const openCreateModal = () => {
        setEditingId(null);
        setNewTitle("");
        setNewCategory("Cá nhân");
        setCoverUrl("");
        setGalleryInput("");
        setShowModal(true);
    };

    const openEditModal = (album: any) => {
        setEditingId(album.id);
        setNewTitle(album.title || "");

        let cat = album.category || "Cá nhân";
        if (cat === "CÁ NHÂN") cat = "Cá nhân";
        if (cat === "COUPLE") cat = "Couple";
        if (cat === "GIA ĐÌNH") cat = "Gia đình";
        if (cat === "SỰ KIỆN") cat = "Sự kiện";
        setNewCategory(cat);

        setCoverUrl(album.coverImage || "");
        setGalleryInput(album.gallery ? album.gallery.join('\n') : "");
        setShowModal(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const galleryUrls = galleryInput.split('\n').map(url => url.trim()).filter(url => url.length > 0);

        try {
            if (editingId) {
                // Update
                const albumRef = doc(db, "albums", editingId);
                await updateDoc(albumRef, {
                    title: newTitle,
                    category: newCategory,
                    coverImage: coverUrl,
                    gallery: galleryUrls
                });
            } else {
                // Create
                await addDoc(collection(db, "albums"), {
                    title: newTitle,
                    category: newCategory,
                    createdAt: serverTimestamp(),
                    status: "published",
                    coverImage: coverUrl,
                    gallery: galleryUrls
                });
            }

            setShowModal(false);
            fetchAlbums();
        } catch (err) {
            console.error(err);
            alert("Lỗi khi lưu Album!");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Chắc chắn muốn xóa?")) {
            await deleteDoc(doc(db, "albums", id));
            fetchAlbums();
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#344E41]">Quản lý Album</h1>
                    <p className="text-neutral-500 text-sm mt-1">Nơi tải lên và xem trước nội dung Portfolio của studio</p>
                </div>
                <button onClick={openCreateModal} className="bg-[#344E41] hover:bg-[#2c4137] text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-[#344E41]/20">
                    <Plus size={18} /> Thêm bộ ảnh mới
                </button>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-neutral-50 text-neutral-600 text-sm border-b border-neutral-200">
                        <tr>
                            <th className="px-6 py-4 font-medium tracking-wide">BỘ ẢNH (ALBUM)</th>
                            <th className="px-6 py-4 font-medium tracking-wide">PHÂN LOẠI</th>
                            <th className="px-6 py-4 font-medium tracking-wide">SỐ ẢNH PHỤ</th>
                            <th className="px-6 py-4 font-medium tracking-wide">NGÀY ĐĂNG</th>
                            <th className="px-6 py-4 font-medium tracking-wide text-right">THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-neutral-400"><Loader2 className="animate-spin mx-auto mb-2" size={30} /> Đang tải dữ liệu...</td>
                            </tr>
                        ) : albums.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-16 text-center">
                                    <ImageIcon size={48} className="mx-auto text-neutral-300 mb-4" />
                                    <p className="text-xl font-medium text-[#344E41]">Chưa có bộ ảnh nào trên hệ thống</p>
                                    <p className="text-neutral-500 text-sm mt-1 mb-4">Các album được thêm ở đây sẽ hiển thị trực tiếp trên trang Portfolio.</p>
                                </td>
                            </tr>
                        ) : (
                            albums.map((album) => (
                                <tr key={album.id} className="hover:bg-neutral-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200 relative group">
                                                {album.coverImage ? (
                                                    <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <ImageIcon className="w-full h-full p-3 text-neutral-300" />
                                                )}
                                            </div>
                                            <span className="font-semibold text-[#344E41]">{album.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-[#EEF4EC] text-[#588157] text-xs font-semibold tracking-wide rounded-full uppercase border border-[#A3B18A]/30">
                                            {album.category || "Cá nhân"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-neutral-500 text-sm font-medium bg-neutral-100 w-fit px-2.5 py-1 rounded-md">
                                            <ImageIcon size={14} /> {(album.gallery?.length || 0)} ảnh
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-500 text-sm">
                                        {album.createdAt?.toDate ? album.createdAt.toDate().toLocaleDateString('vi-VN') : "Vừa xong"}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => openEditModal(album)} className="p-2 text-neutral-400 hover:text-blue-600 transition-colors"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(album.id)} className="p-2 text-neutral-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Thêm/Sửa Album */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl scale-in-95 duration-200 max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center bg-[#FDFBF7] shrink-0">
                            <h2 className="text-xl font-bold text-[#344E41]">{editingId ? "Chỉnh sửa Album" : "Tạo Album Mới"}</h2>
                            <button disabled={saving} onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-red-500 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left column: Essential Info */}
                                <div className="space-y-5">
                                    <h3 className="font-semibold text-[#A3B18A] border-b pb-2 flex items-center gap-2"><ImageIcon size={18} /> Thông tin chính</h3>

                                    <div>
                                        <label className="block text-sm font-medium text-[#344E41] mb-1.5">Tên Bộ Ảnh <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            required
                                            className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[#A3B18A] outline-none"
                                            placeholder="VD: Hoàng Hôn Và Em..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#344E41] mb-1.5">Danh mục <span className="text-red-500">*</span></label>
                                        <select
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[#A3B18A] outline-none bg-white"
                                        >
                                            <option value="Couple">Cặp đôi (Couple)</option>
                                            <option value="Cá nhân">Cá nhân (Portrait)</option>
                                            <option value="Gia đình">Gia đình (Family)</option>
                                            <option value="Sự kiện">Sự kiện (Event)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#344E41] mb-1.5">Link Ảnh Bìa (Cover URL) <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                                                <LinkIcon size={18} />
                                            </div>
                                            <input
                                                type="url"
                                                value={coverUrl}
                                                onChange={(e) => setCoverUrl(e.target.value)}
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[#A3B18A] outline-none"
                                                placeholder="https://images.pexels.com/..."
                                            />
                                        </div>

                                        {/* Live Preview */}
                                        <div className="mt-4 rounded-xl overflow-hidden border border-neutral-200 w-full h-[180px] bg-neutral-50 flex flex-col items-center justify-center">
                                            {coverUrl ? (
                                                <img
                                                    src={coverUrl}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/f8f9fa/c1c2c5?text=Link+Anh+Loi';
                                                    }}
                                                />
                                            ) : (
                                                <>
                                                    <ImageIcon className="text-neutral-300 mb-2" size={32} />
                                                    <span className="text-neutral-400 text-sm">Xem trước ảnh bìa</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right column: Gallery Images */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-[#A3B18A] border-b pb-2 flex items-center gap-2"><ListIcon size={18} /> Thư viện Album (Ảnh chi tiết)</h3>
                                    <p className="text-xs text-neutral-500">Mỗi dòng 1 đường link URL hình ảnh. Sẽ hiển thị khi khách bấm vào xem chi tiết bộ ảnh này.</p>
                                    <textarea
                                        value={galleryInput}
                                        onChange={(e) => setGalleryInput(e.target.value)}
                                        placeholder="https://images.pexels.com/...&#10;https://images.pexels.com/...&#10;https://images.pexels.com/..."
                                        className="w-full h-[320px] px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[#A3B18A] outline-none font-mono text-sm resize-none whitespace-pre"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-neutral-100 shrink-0">
                                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-neutral-600 font-medium hover:bg-neutral-100 rounded-lg transition-colors">
                                    Hủy bỏ
                                </button>
                                <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[#344E41] text-white font-medium rounded-lg hover:bg-[#2c4137] transition-all flex items-center gap-2 shadow-md hover:shadow-lg">
                                    {saving ? <Loader2 className="animate-spin" size={18} /> : (editingId ? "Lưu thay đổi" : "Tạo & Xuất bản")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
