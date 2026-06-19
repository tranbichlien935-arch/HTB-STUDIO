import { useState } from "react";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function AdminLogin() {
    console.log("AdminLogin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/admin");
        } catch (err: any) {
            console.error(err);
            setError("Tài khoản hoặc mật khẩu không chính xác.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 relative font-sans">
            <Link to="/" className="absolute top-8 left-8 text-[#6B8C76] hover:text-[#344E41] flex items-center gap-2 transition-colors">
                <ArrowLeft size={20} /> Về trang chủ
            </Link>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-100 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#344E41] tracking-widest mb-2">HBT <span className="text-[#F4A261]">STUDIO</span></h1>
                    <p className="text-[#6B8C76]">Hệ thống Quản trị & Vận hành</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-[#344E41] mb-1.5">Email Quản Trị</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-[#A3B18A] transition-all outline-none"
                                placeholder="admin@hbtstudio.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#344E41] mb-1.5">Mật khẩu</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-[#A3B18A] transition-all outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 mt-2 bg-[#344E41] text-white rounded-lg font-semibold hover:bg-[#2c4137] transition-all flex justify-center items-center gap-2 shadow-lg shadow-[#344E41]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Đăng nhập hệ thống"}
                    </button>
                </form>
            </div>
        </div>
    );
}
