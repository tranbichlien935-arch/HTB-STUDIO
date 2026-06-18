import { Outlet, Link, useNavigate } from "react-router";
import { LayoutDashboard, Images, Users, Calendar, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";

export default function AdminLayout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <div className="flex h-screen bg-neutral-50 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col">
                <div className="p-6 border-b border-neutral-100 mb-4 text-center">
                    <h2 className="text-xl font-bold tracking-widest text-[#344E41]">HBT <span className="text-[#F4A261]">ADMIN</span></h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-[#EEF4EC] text-[#344E41]">
                        <LayoutDashboard size={18} /> Tổng quan
                    </Link>
                    <Link to="/admin/albums" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-[#344E41] transition-colors">
                        <Images size={18} /> Quản lý Album
                    </Link>
                    <Link to="/admin/bookings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-[#344E41] transition-colors">
                        <Calendar size={18} /> Quản lý Đặt lịch
                    </Link>
                    <Link to="/admin/services" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-[#344E41] transition-colors">
                        <Users size={18} /> Dịch vụ & Gói
                    </Link>
                </nav>

                <div className="p-4 border-t border-neutral-100 mb-2">
                    <div className="flex items-center gap-3 px-3 py-2 bg-neutral-50 rounded-xl relative group">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-white shadow-sm cursor-pointer" onClick={() => {
                            const url = prompt("Nhập link đường dẫn ảnh đại diện (avatar) của bạn:", "");
                            if (url) {
                                localStorage.setItem("adminAvatar", url);
                                window.location.reload();
                            }
                        }}>
                            <img src={localStorage.getItem("adminAvatar") || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop"} alt="Admin Avatar" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] items-center text-white font-medium">Bấm Đổi</span>
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-bold text-[#344E41] truncate">Quản trị viên</p>
                            <p className="text-[11px] text-[#A3B18A] truncate font-medium">huynhbaotran@...</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 py-2 mb-4">
                    <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors">
                        <LogOut size={16} /> Đăng xuất phiên
                    </button>
                </div>
            </aside>

            {/* Main Content Content */}
            <main className="flex-1 overflow-auto h-screen relative">
                <Outlet />
            </main>
        </div>
    );
}
