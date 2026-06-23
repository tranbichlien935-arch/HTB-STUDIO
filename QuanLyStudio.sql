USE [master]
GO

IF DB_ID('QuanLyStudio') IS NOT NULL
BEGIN
    ALTER DATABASE [QuanLyStudio] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE [QuanLyStudio];
END
GO

CREATE DATABASE [QuanLyStudio]
GO

USE [QuanLyStudio]
GO

-- ==========================================
-- 1. TẠO BẢNG DANH MỤC ALBUM VÀ ALBUM
-- ==========================================
CREATE TABLE [dbo].[DanhMucAlbum] (
    [MaDanhMucAlbum] INT IDENTITY(1,1) PRIMARY KEY,
    [TenDanhMuc] NVARCHAR(100) NOT NULL
)
GO

CREATE TABLE [dbo].[Album] (
    [MaAlbum] INT IDENTITY(1,1) PRIMARY KEY,
    [TenAlbum] NVARCHAR(200) NOT NULL,
    [MoTa] NVARCHAR(MAX),
    [AnhBia] NVARCHAR(MAX),
    [NgayTao] DATETIME DEFAULT GETDATE(),
    [LuotXem] INT DEFAULT 0,
    [MaDanhMucAlbum] INT FOREIGN KEY REFERENCES [dbo].[DanhMucAlbum]([MaDanhMucAlbum])
)
GO

CREATE TABLE [dbo].[HinhAnhAlbum] (
    [MaHinhAnh] INT IDENTITY(1,1) PRIMARY KEY,
    [MaAlbum] INT FOREIGN KEY REFERENCES [dbo].[Album]([MaAlbum]),
    [DuongDan] NVARCHAR(MAX) NOT NULL
)
GO

-- ==========================================
-- 2. TẠO BẢNG DANH MỤC DỊCH VỤ VÀ DỊCH VỤ
-- ==========================================
CREATE TABLE [dbo].[DanhMucDichVu] (
    [MaDanhMucDichVu] INT IDENTITY(1,1) PRIMARY KEY,
    [TenDanhMuc] NVARCHAR(100) NOT NULL
)
GO

CREATE TABLE [dbo].[DichVu] (
    [MaDichVu] INT IDENTITY(1,1) PRIMARY KEY,
    [TenDichVu] NVARCHAR(200) NOT NULL,
    [GiaDichVu] NVARCHAR(100),
    [MoTaNgan] NVARCHAR(MAX),
    [MoTaChiTiet] NVARCHAR(MAX),
    [AnhDaiDien] NVARCHAR(MAX),
    [ThoiLuong] NVARCHAR(100),
    [MaDanhMucDichVu] INT FOREIGN KEY REFERENCES [dbo].[DanhMucDichVu]([MaDanhMucDichVu])
)
GO

-- ==========================================
-- 3. TẠO CÁC BẢNG KHÁC (NGƯỜI DÙNG, ĐÁNH GIÁ, LIÊN HỆ, LỊCH ĐẶT)
-- ==========================================
CREATE TABLE [dbo].[VaiTro] (
    [MaVaiTro] INT IDENTITY(1,1) PRIMARY KEY,
    [TenVaiTro] NVARCHAR(50) NOT NULL
)
GO

CREATE TABLE [dbo].[NguoiDung] (
    [MaNguoiDung] INT IDENTITY(1,1) PRIMARY KEY,
    [TenDangNhap] VARCHAR(100) UNIQUE,
    [MatKhau] VARCHAR(MAX),
    [HoTen] NVARCHAR(100),
    [Email] VARCHAR(150),
    [MaVaiTro] INT FOREIGN KEY REFERENCES [dbo].[VaiTro]([MaVaiTro])
)
GO

CREATE TABLE [dbo].[DanhGia] (
    [MaDanhGia] INT IDENTITY(1,1) PRIMARY KEY,
    [TenKhachHang] NVARCHAR(100),
    [VaiTroKhachHang] NVARCHAR(100),
    [NoiDung] NVARCHAR(MAX),
    [DiemDanhGia] INT,
    [AnhDaiDien] NVARCHAR(MAX)
)
GO

CREATE TABLE [dbo].[LichDat] (
    [MaLichDat] INT IDENTITY(1,1) PRIMARY KEY,
    [TenKhachHang] NVARCHAR(150),
    [SoDienThoai] VARCHAR(20),
    [NgayDat] DATETIME,
    [YeuCauChuY] NVARCHAR(MAX),
    [TrangThai] NVARCHAR(50) DEFAULT N'Chờ Xử Lý'
)
GO

CREATE TABLE [dbo].[LienHe] (
    [MaLienHe] INT IDENTITY(1,1) PRIMARY KEY,
    [HoTen] NVARCHAR(150),
    [Email] VARCHAR(150),
    [ChuDe] NVARCHAR(200),
    [NoiDung] NVARCHAR(MAX),
    [NgayGui] DATETIME DEFAULT GETDATE(),
    [TrangThai] NVARCHAR(50) DEFAULT N'Chưa Đọc'
)
GO

-- ==========================================
-- DỮ LIỆU MẪU (DỰA TRÊN ẢNH VÀ REACT CODE CỦA BẠN)
-- ==========================================

-- Thêm Danh Mục Album
INSERT INTO [dbo].[DanhMucAlbum] (TenDanhMuc) VALUES
(N'Cá nhân'), (N'Couple'), (N'Gia đình'), (N'Sự kiện'), (N'Cưới'), (N'Doanh nghiệp'), (N'Nhóm');
GO

-- Thêm Data Album
INSERT INTO [dbo].[Album] (TenAlbum, MoTa, AnhBia, LuotXem, MaDanhMucAlbum) VALUES
(N'Hoa Xinh', N'Cô gái và hoa (Thiên nhiên · Hoa lá · Tự nhiên)', N'https://images.pexels.com/photos/31484891/pexels-photo-31484891.jpeg', 150, 1),
(N'Hoàng Hôn Và Em', N'Hoàng hôn · Lãng mạn · Ngoại cảnh', N'https://images.pexels.com/photos/27054261/pexels-photo-27054261.jpeg', 230, 2),
(N'Cả Nhà Cùng Vui', N'Gia đình · Ngoại cảnh · Hạnh phúc', N'https://images.unsplash.com/photo-1760633549227-901e0c3cf9d3?w=600&h=800&fit=crop&auto=format', 410, 3),
(N'Tuổi 18', N'Tuổi 18 - Thanh xuân rực rỡ', N'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop&auto=format', 189, 1),
(N'Marry Me', N'Cưới · Hoa · Lãng mạn', N'https://images.pexels.com/photos/37169828/pexels-photo-37169828.jpeg', 560, 5),
(N'Khai Trương', N'Sự kiện · Doanh nghiệp · Chuyên nghiệp', N'https://kenh14cdn.com/thumb_w/660/20333685438963.../', 120, 6),
(N'Tạm Biệt Tuổi Học Trò', N'Kỷ yếu · Bạn bè · Ký ức', N'https://images.pexels.com/photos/32121122/pexels-photo-32121122.jpeg', 320, 7),
(N'Cột Mốc', N'Tình yêu · Kỷ niệm · Cột mốc', N'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800...', 412, 2);
GO

-- Thêm Hình Ảnh Album (Mẫu cho Album Hoa Xinh - MaAlbum = 1)
INSERT INTO [dbo].[HinhAnhAlbum] (MaAlbum, DuongDan) VALUES
(1, N'https://images.pexels.com/photos/31484891/pexels-photo-31484891.jpeg'),
(1, N'https://images.pexels.com/photos/1013479/pexels-photo-1013479.jpeg'),
(2, N'https://images.pexels.com/photos/27054261/pexels-photo-27054261.jpeg');
GO

-- Thêm Danh Mục Dịch Vụ
INSERT INTO [dbo].[DanhMucDichVu] (TenDanhMuc) VALUES
(N'Chụp Ảnh'), (N'Quay Phim'), (N'Thuê Studio & Thiết Bị'), (N'Trang Điểm & Trang Phục'), (N'Hậu Kỳ & In Ấn');
GO

-- Thêm Dịch Vụ
INSERT INTO [dbo].[DichVu] (TenDichVu, GiaDichVu, MoTaNgan, MoTaChiTiet, AnhDaiDien, ThoiLuong, MaDanhMucDichVu) VALUES
(N'Chụp Ảnh Cưới', N'3.000.000đ', N'Gói chụp ảnh cưới ngoại cảnh cơ bản.', N'Gói chụp ảnh cưới ngoại cảnh cơ bản của HBT Studio mang đến những khoảnh khắc thiêng liêng nhất.', N'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1400', N'1 giờ', 1),
(N'Quay Phóng Sự', N'5.000.000đ', N'Quay và dựng video highlight sự kiện.', N'Dịch vụ quay phóng sự của HBT Studio ghi lại trọn vẹn không khí của ngày cưới từ sáng đến tối.', N'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1400', N'Cả ngày', 2),
(N'Cho Thuê Studio', N'500.000đ', N'Thuê studio đầy đủ ánh sáng, phông nền theo giờ.', N'Studio HBT được trang bị đầy đủ hệ thống đèn chuyên nghiệp.', N'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1400', N'1 giờ', 3);
GO

-- Thêm Đánh Giá Khách Hàng (Dựa trên TESTIMONIALS)
INSERT INTO [dbo].[DanhGia] (TenKhachHang, VaiTroKhachHang, NoiDung, DiemDanhGia, AnhDaiDien) VALUES
(N'Nguyễn Minh Châu', N'Cô dâu', N'Studio chụp tuyệt vời! Ekip rất chuyên nghiệp và thân thiện.', 5, N'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'),
(N'Trần Quốc Hùng', N'Chủ doanh nghiệp', N'Chụp ảnh doanh nghiệp cho team ở đây. Ảnh ra rất đẹp, chuyên nghiệp.', 5, N'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'),
(N'Lê Thị Hương', N'Khách hàng', N'Đặt lịch chụp concept Hoàng hôn và Em, ekip rất nhiệt tình hỗ trợ.', 5, N'https://images.unsplash.com/photo-1494790108377-be9c29b29330');
GO

-- Thêm Vai Trò & Tài Khoản Admin mẫu
INSERT INTO [dbo].[VaiTro] (TenVaiTro) VALUES (N'Admin'), (N'Nhân Viên');
GO

INSERT INTO [dbo].[NguoiDung] (TenDangNhap, MatKhau, HoTen, Email, MaVaiTro) VALUES
('admin', '123456', N'Quản Trị Viên', 'admin@hbtstudio.com', 1);
GO
