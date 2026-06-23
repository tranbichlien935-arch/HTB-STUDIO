import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './db.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Routes
app.get('/api/services', async (req, res) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query(`
            SELECT 
                d.MaDichVu, d.TenDichVu, d.GiaDichVu, d.MoTaNgan, d.MoTaChiTiet, d.AnhDaiDien, d.ThoiLuong, 
                dm.TenDanhMuc 
            FROM DichVu d
            LEFT JOIN DanhMucDichVu dm ON d.MaDanhMucDichVu = dm.MaDanhMucDichVu
        `);

        const frontendServices = result.recordset.map(row => ({
            slug: row.MaDichVu.toString(),
            name: row.TenDichVu || "Dịch vụ",
            price: row.GiaDichVu || "Liên hệ",
            emoji: "✨",
            desc: row.MoTaNgan || "",
            img: row.AnhDaiDien || "https://images.pexels.com/photos/1056588/pexels-photo-1056588.jpeg",
            hero: row.AnhDaiDien || "https://images.pexels.com/photos/1056588/pexels-photo-1056588.jpeg",
            duration: row.ThoiLuong || "Tuỳ chọn",
            category: row.TenDanhMuc || "Dịch vụ",
            fullDesc: row.MoTaChiTiet || "",
            includes: [], // Could join with chi tiết later if available
            process: [
                { no: "01", title: "Tư vấn", desc: "Liên hệ và thống nhất ý tưởng." },
                { no: "02", title: "Thực hiện", desc: "Triển khai dịch vụ." },
                { no: "03", title: "Bàn giao", desc: "Giao sản phẩm hoàn thiện." }
            ]
        }));

        res.json(frontendServices);
    } catch (error) {
        console.error("GET /api/services error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/portfolios', async (req, res) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query(`
            SELECT 
                a.MaAlbum, a.TenAlbum, a.MoTa, a.AnhBia, a.NgayTao,
                dm.TenDanhMuc
            FROM Album a
            LEFT JOIN DanhMucAlbum dm ON a.MaDanhMucAlbum = dm.MaDanhMucAlbum
        `);

        // Get images
        const imagesResult = await pool.request().query('SELECT MaAlbum, DuongDan FROM HinhAnhAlbum');
        const imagesByAlbum = {};
        imagesResult.recordset.forEach(img => {
            if (!imagesByAlbum[img.MaAlbum]) imagesByAlbum[img.MaAlbum] = [];
            imagesByAlbum[img.MaAlbum].push(img.DuongDan);
        });

        const frontendPortfolios = result.recordset.map(row => {
            const photos = imagesByAlbum[row.MaAlbum] || [row.AnhBia];
            return {
                id: row.MaAlbum.toString(),
                slug: row.MaAlbum.toString(),
                title: row.TenAlbum,
                category: row.TenDanhMuc || "Cá nhân",
                img: row.AnhBia || "https://images.pexels.com/photos/1056588/pexels-photo-1056588.jpeg",
                hero: row.AnhBia || "https://images.pexels.com/photos/1056588/pexels-photo-1056588.jpeg",
                concept: row.MoTa || "Nhiếp ảnh",
                desc: row.MoTa || "Những khoảnh khắc tuyệt vời được lưu giữ qua ống kính HBT Studio.",
                photos: photos.length > 0 ? photos : [row.AnhBia]
            };
        });

        res.json(frontendPortfolios);
    } catch (error) {
        console.error("GET /api/portfolios error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/bookings', async (req, res) => {
    try {
        const { name, phone, date, service, notes } = req.body;
        const pool = await connectDB();

        let yeuCau = `Dịch vụ quan tâm: ${service || 'Không có'}`;
        if (notes) {
            yeuCau += `\n\nGhi chú: ${notes}`;
        }

        await pool.request()
            .input('TenKhachHang', name)
            .input('SoDienThoai', phone)
            .input('NgayDat', date)
            .input('YeuCau', yeuCau)
            .query(`
                INSERT INTO LichDat (TenKhachHang, SoDienThoai, NgayDat, YeuCauChuY, TrangThai)
                VALUES (@TenKhachHang, @SoDienThoai, @NgayDat, @YeuCau, N'Chờ Xử Lý')
            `);

        res.json({ success: true, message: 'Đã nhận lịch thành công' });
    } catch (error) {
        console.error("POST /api/bookings error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Serve static files từ thư mục dist
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback: mọi route đều trả về index.html (cần thiết cho SPA routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Init connection then start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server đang chạy tại port ${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to MS SQL Server on startup", err);
    // Still start server to allow static files to serve
    app.listen(PORT, () => {
        console.log(`Server chạy tại port ${PORT} nhưng CSDL lỗi.`);
    });
});
