# PROJECT HTB STUDIO
**TÀI LIỆU ĐÓNG & BÀN GIAO DỰ ÁN**

**Đơn vị thực hiện:** Trần Thị Bích Liên
**Mục đích:** Tài liệu này dùng để xác nhận dự án đã hoàn thành, cung cấp đầy đủ thông tin kỹ thuật cần thiết để vận hành, cấu hình cơ sở dữ liệu, bảo trì và tiếp nhận dự án HTB Studio về sau mà không phụ thuộc vào người triển khai ban đầu.

---

### 1. THÔNG TIN TÀI LIỆU 
| Thuộc tính | Giá trị |
| :--- | :--- |
| **Tên tài liệu** | Technical Handover Document |
| **Dự án** | HTB STUDIO |
| **Mã dự án** | HTB-01 |
| **Phiên bản tài liệu** | v1.0 |
| **Ngày tạo tài liệu** | 23/06/2026 |
| **Người biên soạn** | Trần Thị Bích Liên |
| **Mục đích** | Phục vụ kết nối SQL Server, maintain, vận hành và nâng cấp hệ thống front-end & back-end |
| **Phạm vi sử dụng** | Nội bộ Studio |

---

### 2. THÔNG TIN DỰ ÁN 
| Thuộc tính | Giá trị |
| :--- | :--- |
| **Tên dự án** | Website HTB Studio |
| **Khách hàng** | Ban Quản Trị HTB Studio |
| **Thời gian thực hiện** | Tháng 06/2026 |
| **Phiên bản** | v1.0 |
| **Trạng thái** | Đã hoàn thành / Bàn giao |

---

### 3. TỔNG QUAN HỆ THỐNG 
| Hạng mục | Mô tả |
| :--- | :--- |
| **Website người dùng (Client)** | Trang chủ, Về chúng tôi, Danh sách Dịch vụ, Chi tiết Dịch vụ, Album danh mục, Chi tiết Album, Form Đặt Lịch & Liên hệ. |
| **Trang quản trị (Admin)** | Quản lý Đặt Lịch (Bookings), Quản lý Album, Quản lý Dịch vụ/Gói. Nhận trực tiếp dữ liệu từ khách đặt qua SQL Server. |
| **API Backend** | RESTful API hỗ trợ lấy/đẩy dữ liệu Dịch vụ, Album và thông tin Đặt lịch vào cơ sở dữ liệu SQL. |
| **Hình thức hoạt động** | Client - Server |

---

### 4. PHẠM VI CHỨC NĂNG ĐÃ TRIỂN KHAI 

#### 4.1 Phía người dùng (Public Website)
Đã triển khai các chức năng chính một cách hoàn chỉnh và có tính thẩm mĩ cao (chuẩn Editorial Premium):
*   **Trang chủ (Home):**
    *   Hero section kèm slider ảnh nghệ thuật tự động (Parallax).
    *   Thông số tổng quan kinh nghiệm, khách hàng (Animation số nhảy).
    *   Preview dịch vụ nổi bật và tác phẩm Album tiêu biểu.
    *   Bảng đánh giá (Testimonials) với kích thước đồng bộ tự động.
*   **Về chúng tôi (About):**
    *   Câu chuyện thương hiệu, Triết lý nhiếp ảnh.
    *   Giới thiệu giá trị cốt lõi, không gian Studio & Trang thiết bị (Layout lưới cao cấp/Zigzag).
*   **Dịch vụ (Services):**
    *   Danh sách các gói chụp ảnh nghệ thuật, sự kiện, cưới hỏi.
    *   Hiển thị thông tin chi tiết từng gói dịch vụ.
*   **Album Gallery:**
    *   Chế độ lưới ảnh (Masonry/Grid) tiêu chuẩn, tự động tối ưu hiển thị.
    *   Xem chi tiết từng bộ ảnh với định dạng cột 4/5 tỉ lệ chuẩn.
*   **Liên hệ & Đặt lịch (Contact):**
    *   Form đặt lịch thông minh; bắt lỗi số điện thoại chỉ nhận số.
    *   Date picker tự động chặn lựa chọn ngày trong quá khứ, định dạng dd/mm/yyyy.
    *   Tự động gửi thông tin nhập vào Microsoft SQL Server.

#### 4.2 Phía quản trị (Admin Dashboard)
Môi trường quản trị độc lập để theo dõi khách hàng thực tế:
*   **Quản lý Đặt Lịch (Bookings):**
    *   Gọi xuất dữ liệu từ DB SQL Server.
    *   Thống kê khách hàng, số điện thoại, ngày chụp và dịch vụ chọn.
    *   Cập nhật các trạng thái: *Chờ xử lý, Đã chốt lịch, Từ chối*.
    *   Xoá đơn đặt lịch.
*   **Quản lý Dịch Vụ & Album:** Cập nhật thông tin dịch vụ, danh sách ảnh.
*   **Giao diện:** Thiết kế tinh gọn, bảo mật thông tin nội bộ.

---

### 5. KIẾN TRÚC & CÔNG NGHỆ 
#### 5.1 Kiến trúc hệ thống 
*   **Mô hình:** Client – Server.
*   Backend (Node.js) cung cấp RESTful API kết nối trực tiếp với DB cục bộ thông qua ODBC Driver MS-SQL.

#### 5.2 Công nghệ sử dụng 
| Thành phần | Công nghệ |
| :--- | :--- |
| **Frontend** | React 18, Vite, Typecript (TSX), Tailwind CSS v4, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | Microsoft SQL Server (MS-SQL) |
| **Database Driver**| `mssql` kết hợp `msnodesqlv8` (Windows Auth Support) |
| **Hosting UI** | Vercel (Bản tĩnh để Demo UI) |
| **Local Hosting** | Hệ thống chạy Localhost đầy đủ chức năng CSDL |

---

### 6. THÔNG TIN TRUY CẬP HỆ THỐNG 
| Hạng mục | Thông tin |
| :--- | :--- |
| **Local User Site** | `http://localhost:5173` |
| **Local Admin Site**| `http://localhost:5173/admin/bookings` |
| **Backend API** | `http://localhost:3000/api` |
| **Database instance**| `localhost\SQLEXPRESS01` (Tên DB: `QuanLyStudio`) |
| **Tài khoản Server** | Chạy bằng quyền *Windows Authentication* (Trusted_Connection=yes) |
| **Github Source** | `https://github.com/tranbichlien935-arch/HTB-STUDIO.git` |

---

### 7. TÀI KHOẢN & DỊCH VỤ LIÊN QUAN
| Dịch vụ | Tài khoản / Tên truy cập | Ghi chú |
| :--- | :--- | :--- |
| **Github** | tranbichlien935-arch | Git lưu trữ mã nguồn |
| **Vercel** | Dùng chung tài khoản | Publish UI dạng Demo tĩnh |
| **SQL Server** | `localhost\SQLEXPRESS01` | Máy chủ lưu DB chính thức tại công ty |

---

### 8. CẤU TRÚC SOURCE CODE
#### 8.1 Cấu trúc file/folder chính
```text
HTB-STUDIO/
├── QuanLyStudio.sql      # File Script khởi tạo cấu trúc Bảng và Data mẫu cho MS SQL
├── db.mjs                # Khởi tạo kết nối Connection Pool đến SQL Server
├── server.js             # Mã nguồn Backend Express.js (Định nghĩa các API routes)
├── package.json          # Quản lý thư viện cài đặt Node.js
├── vite.config.ts        # Cấu hình Vite & Proxy API sang Backend
├── src/
│   ├── app/
│   │   ├── pages/        # Lõi cấu trúc chức năng
│   │   │   ├── admin/    # Dashboard quản trị (Bookings, Albums, Services)
│   │   │   ├── About.tsx # Trang về chúng tôi
│   │   │   ├── Home.tsx  # Trang chủ
│   │   │   ├── Contact.tsx
│   │   │   ├── ...
│   │   ├── components/   # Headers, Footers, Navbars
│   │   └── shared.tsx    # Các Modules, Data tĩnh, Hooks và Card UI tái sử dụng
│   ├── main.tsx          # Điểm đánh dấu Render cho React
│   └── index.css         # Reset css & Tailwind global style
```

#### 8.2 Chú thích phân luồng
*   `QuanLyStudio.sql`: Được thực thi bằng SSMS (Xong bước này hệ thống SQL mới sống).
*   `server.js`: Đóng vai trò múc dữ liệu từ SQL thông qua gói thư viện `mssql` và ném ra REST API (Vd: `/api/admin/bookings`).
*   `vite.config.ts`: Proxy cấu hình `^/api` trỏ về Backend port `3000` để vượt qua lỗi CORS khi Dev.

---

### 9. HƯỚNG DẪN KHỞI ĐỘNG & VẬN HÀNH
#### 9.1 Điều kiện tiên quyết
1. Có cấu hình **Node.js** bản mới.
2. Có máy chủ **Microsoft SQL Server Management Studio (SSMS)** đang bật.
3. Đã tạo Database thành công từ file `QuanLyStudio.sql` (bằng cách ấn F5 chạy file trên SSMS).

#### 9.2 Các bước khởi động hệ thống song song
Mở **2 tab Terminal (dấu nhắc lệnh)** tại thư mục gốc của dự án `HTB-STUDIO`:

**Tab 1 - Chạy Backend (Database Server):**
```bash
npm start
# Sẽ báo: "Connected to MS SQL Server (QuanLyStudio)" và chạy ở Port 3000
```
**Tab 2 - Chạy Frontend (Giao diện Web):**
```bash
npm run dev
# Khởi động tại cổng http://localhost:5173
```
👉 Hãy truy cập `http://localhost:5173` để thao tác và `http://localhost:5173/admin/bookings` để xem lịch được cập nhật.

---

### 10. ĐỀ XUẤT NÂNG CẤP DÀNH CHO TƯƠNG LAI
| Hạng mục | Đề xuất |
| :--- | :--- |
| **Quản trị người dùng** | Tích hợp JWT Authentication cho Admin thay vì truy cập mở. |
| **CMS Dữ liệu** | Đưa toàn bộ hình ảnh Album, văn bản đang Fix cứng ở FE vào Database quản lý chung. |
| **Lịch chụp (Calendar)** | Tích hợp Booking System theo lịch biểu rỗng/đầy, cảnh báo trùng ngày chụp API. |
| **Hosting** | Mua VPS Windows nội bộ để Deploy Backend `.exe` hoặc Pm2. |

---

### 11. LƯU Ý QUAN TRỌNG CHO DEV (MAINTAINER CẦN BIẾT)
| Lưu ý | Mô tả |
| :--- | :--- |
| **Vercel Deploy Issue** | Vercel là môi trường tĩnh gốc Linux. Thư viện kết nối SQL (`msnodesqlv8`) chỉ hỗ trợ Windows. Vì vậy đã cấu hình `.vercelignore` và đưa module vào Optional để tự bỏ qua SQL khi deploy UI demo lên mạng. Về sau không được xoá cấu hình này nếu upload lên Vercel. |
| **Database Scheme** | Khi thay đổi bảng SQL trong tương lai, cần phải chạy SSMS Query thay đổi, sau đó sửa trực tiếp lại câu `SELECT/INSERT` ở bên trong file `server.js`. |

---

### 12. NHÂN SỰ THAM GIA
| STT | Họ tên | Vai trò |
| :--- | :--- | :--- |
| **1** | **Trần Thị Bích Liên** | **Developer / Khởi tạo dự án & Thực hiện trực tiếp** |
| **2** | **Võ Bá Thành Nhân** | **Sếp / Đại diện tiếp nhận & Nghiệm thu** |

---

### 13. THÔNG TIN BÀN GIAO 
| Hạng mục | Thông tin |
| :--- | :--- |
| **Trạng thái dự án** | Đã hoàn thành / Đã nghiệm thu (Full CSDL Thực) |
| **Ngày bàn giao** | 23/06/2026 |
| **Người bàn giao** | Trần Thị Bích Liên |
| **Người tiếp nhận** | Võ Bá Thành Nhân |
| **Hình thức xác nhận** | Biên bản nghiệm thu kiểm thử mã nguồn |
