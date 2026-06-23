import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, Clock, XCircle, Trash2 } from "lucide-react";

export default function AdminBookings() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/admin/bookings");
            if (!res.ok) throw new Error("Failed");
            const data = await res.json();
            // Map MS SQL columns to the UI
            const mappedData = data.map((b: any) => ({
                id: b.MaLichDat.toString(),
                name: b.TenKhachHang,
                phone: b.SoDienThoai,
                date: b.NgayDat,
                service: "Dịch vụ đã chọn", // Simplified, as we put it into notes earlier
                notes: b.YeuCauChuY,
                status: b.TrangThai === "Đã Chốt Lịch" ? "confirmed" : b.TrangThai === "Từ Chối" ? "cancelled" : "pending"
            }));
            setBookings(mappedData);
        } catch (error) {
            console.error("Error fetching bookings: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await fetch(`/api/admin/bookings/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });
            fetchBookings(); // Refresh data
        } catch (err) {
            console.error(err);
            alert("Lỗi khi cập nhật trạng thái!");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Bạn có chắc chắn muốn xóa lịch đặt này?")) {
            try {
                await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
                fetchBookings(); // Refresh data
            } catch (err) {
                console.error(err);
                alert("Lỗi khi xóa!");
            }
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#344E41]">Quản lý Đặt Lịch</h1>
                    <p className="text-neutral-500 text-sm mt-1">Danh sách khách hàng đặt lịch chụp ảnh từ website</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-neutral-50 text-neutral-600 text-sm border-b border-neutral-200">
                        <tr>
                            <th className="px-6 py-4 font-medium tracking-wide">KHÁCH HÀNG</th>
                            <th className="px-6 py-4 font-medium tracking-wide">DỊCH VỤ & NGÀY CHỤP</th>
                            <th className="px-6 py-4 font-medium tracking-wide">TRẠNG THÁI</th>
                            <th className="px-6 py-4 font-medium tracking-wide text-right">THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-neutral-400">
                                    <Loader2 className="animate-spin mx-auto mb-2" size={30} /> Đang tải dữ liệu...
                                </td>
                            </tr>
                        ) : bookings.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-16 text-center">
                                    <Clock size={48} className="mx-auto text-neutral-300 mb-4" />
                                    <p className="text-xl font-medium text-[#344E41]">Chưa có lịch hẹn nào</p>
                                    <p className="text-neutral-500 text-sm mt-1">Khách đặt lịch trên website sẽ hiển thị ở đây (Real-time).</p>
                                </td>
                            </tr>
                        ) : (
                            bookings.map((b) => (
                                <tr key={b.id} className="hover:bg-neutral-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-[#344E41]">{b.name}</div>
                                        <div className="text-sm text-neutral-500 mt-0.5">{b.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-neutral-800">{b.service}</div>
                                        <div className="text-sm text-[#F4A261] font-medium mt-0.5 flex items-center gap-1">
                                            <Clock size={14} /> Ngày chụp: {b.date ? new Date(b.date).toLocaleDateString('vi-VN') : "Chưa chọn"}
                                        </div>
                                        {b.notes && <div className="text-xs text-neutral-400 mt-1 italic max-w-xs truncate">"{b.notes}"</div>}
                                    </td>
                                    <td className="px-6 py-4">
                                        {b.status === "confirmed" ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full border border-green-200">
                                                <CheckCircle2 size={14} /> ĐÃ CHỐT LỊCH
                                            </span>
                                        ) : b.status === "cancelled" ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-full border border-red-200">
                                                <XCircle size={14} /> TỪ CHỐI
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full border border-orange-200">
                                                <Clock size={14} /> CHỜ XÁC NHẬN
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <select
                                                value={b.status}
                                                onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                                                className="text-xs border border-neutral-200 rounded-lg px-2 py-1.5 bg-white outline-none cursor-pointer hover:border-neutral-300 transition-colors"
                                            >
                                                <option value="pending">Chờ xác nhận</option>
                                                <option value="confirmed">Chốt lịch</option>
                                                <option value="cancelled">Hủy/Từ chối</option>
                                            </select>
                                            <button onClick={() => handleDelete(b.id)} className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
