import { useState, useEffect } from "react";
import { FolderGit2, CalendarClock, Receipt, Loader2, Sparkles } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalAlbums: 0,
        pendingBookings: 0,
        totalServices: 0
    });
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch Albums
                const albumsSnap = await getDocs(collection(db, "albums"));
                const totalAlbums = albumsSnap.size;
                const albumsData = albumsSnap.docs.map(d => ({ ...d.data(), type: "album", id: d.id }));

                // Fetch Bookings
                const bookingsSnap = await getDocs(collection(db, "bookings"));
                let pendingBookings = 0;
                const bookingsData = bookingsSnap.docs.map(d => {
                    const data = d.data();
                    if (data.status === "pending") pendingBookings++;
                    return { ...data, type: "booking", id: d.id };
                });

                // Fetch Services
                const servicesSnap = await getDocs(collection(db, "services"));
                const totalServices = servicesSnap.size;

                setStats({ totalAlbums, pendingBookings, totalServices });

                // Merge and sort activities
                let allActivities = [...albumsData, ...bookingsData];

                allActivities = allActivities.map(item => {
                    let timeMs = Date.now(); // default
                    if (item.createdAt) {
                        if (item.createdAt.toMillis) timeMs = item.createdAt.toMillis();
                        else if (typeof item.createdAt === "string") timeMs = new Date(item.createdAt).getTime();
                        else if (typeof item.createdAt === "number") timeMs = item.createdAt;
                    }
                    return { ...item, _timeMs: timeMs };
                });

                // Sắp xếp mới nhất lên đầu
                allActivities.sort((a, b) => b._timeMs - a._timeMs);

                setActivities(allActivities.slice(0, 10)); // Lấy 10 hoạt động gần nhất
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const timeAgo = (ms: number) => {
        if (!ms) return "Vừa xong";
        const diff = Date.now() - ms;
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return "Vừa xong";
        if (mins < 60) return `${mins} phút trước`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours} giờ trước`;
        const days = Math.floor(hours / 24);
        return `${days} ngày trước`;
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center pt-20">
                <Loader2 className="animate-spin text-[#344E41]" size={36} />
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8 text-[#344E41]">Tổng quan hệ thống</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Stat Cards */}
                <div className="bg-white rounded-xl p-6 border border-neutral-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-neutral-500 mb-1">Tổng Album Ảnh</p>
                        <h3 className="text-3xl font-bold text-[#344E41]">{stats.totalAlbums}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#EEF4EC] text-[#588157]">
                        <FolderGit2 size={24} />
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-neutral-100 shadow-sm flex items-center justify-between mx-auto w-full">
                    <div>
                        <p className="text-sm font-medium text-neutral-500 mb-1">Lịch chờ xác nhận</p>
                        <h3 className="text-3xl font-bold text-[#F4A261]">{stats.pendingBookings}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-50 text-[#F4A261]">
                        <CalendarClock size={24} />
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-neutral-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-neutral-500 mb-1">Các Gói Dịch vụ</p>
                        <h3 className="text-3xl font-bold text-[#344E41]">{stats.totalServices}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50 text-blue-500">
                        <Receipt size={24} />
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 border border-neutral-100 shadow-sm">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-[#344E41]">Hoạt động gần đây</h2>

                {activities.length === 0 ? (
                    <div className="text-center py-8 text-neutral-400">
                        <Sparkles className="mx-auto mb-2 opacity-50" size={32} />
                        <p>Chưa có dữ liệu hoạt động</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activities.map((act, i) => (
                            <div key={`${act.id}-${i}`} className="flex items-center gap-4 pb-4 border-b border-neutral-50 last:border-0 last:pb-0">
                                {act.type === "booking" ? (
                                    <>
                                        <div className="w-2 h-2 rounded-full bg-[#F4A261] shrink-0" />
                                        <div className="flex-1 text-sm">
                                            <span className="font-semibold text-neutral-800">{act.name || "Khách ẩn danh"}</span> vừa gửi yếu cầu đặt lịch <b>{act.service || "Dịch vụ khác"}</b>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-2 h-2 rounded-full bg-[#588157] shrink-0" />
                                        <div className="flex-1 text-sm">
                                            Admin vừa tải lên & xuất bản Album mới: <b>{act.title}</b>
                                        </div>
                                    </>
                                )}
                                <div className="text-xs text-neutral-400 whitespace-nowrap shrink-0">{timeAgo(act._timeMs)}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
