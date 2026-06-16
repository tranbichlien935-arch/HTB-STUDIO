import { useState, useEffect, useRef } from "react";
import { ArrowRight, Leaf, Star } from "lucide-react";
import hoangHonImg from "@/imports/image-21.png";
import hoangHonRingImg from "@/imports/image-22.png";
import hoaXinhImg from "@/imports/image-23.png";
import marryMeImg from "@/imports/image-24.png";
import khaiTruongImg from "@/imports/khai-truong.jpg";
import cotMocImg from "@/imports/image-26.png";
import cotMoc2Img from "@/imports/image-27.png";

// ── Palette
export const C = {
  bg: "#FDFBF7",
  sageLight: "#D4E0D0",
  sageMain: "#A3B18A",
  forest: "#344E41",
  forestMid: "#588157",
  pink: "#F4ACB7",
  peach: "#F4A261",
  champagne: "#E9C46A",
  white: "#ffffff",
};

// ── Data
export interface ServiceDetail {
  slug: string;
  name: string;
  price: string;
  emoji: string;
  desc: string;
  img: string;
  duration: string;
  category: string;
  fullDesc: string;
  includes: string[];
  process: { no: string; title: string; desc: string }[];
  hero: string;
  detailImg?: string;
}

export const SERVICES: ServiceDetail[] = [
  {
    slug: "chup-anh-cuoi",
    name: "Chụp Ảnh Cưới", price: "3.000.000đ", emoji: "💍",
    desc: "Gói chụp ảnh cưới ngoại cảnh cơ bản, chỉnh sửa 30 ảnh.",
    img: "https://weddingboutiquephuket.com/wp-content/uploads/2024/05/Wedding-Boutique-Phuket_KYTRISTAN_WEB_047.jpg", hero: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1400&h=600&fit=crop&auto=format",
    duration: "1 giờ", category: "Chụp Ảnh",
    detailImg: "https://weddingboutiquephuket.com/wp-content/uploads/2024/05/Wedding-Boutique-Phuket_KYTRISTAN_WEB_047.jpg",
    fullDesc: "Gói chụp ảnh cưới ngoại cảnh cơ bản của HBT Studio mang đến những khoảnh khắc thiêng liêng nhất trong ngày trọng đại của bạn. Chúng tôi lựa chọn góc chụp, ánh sáng và bố cục để tôn vinh vẻ đẹp tự nhiên của cặp đôi.",
    includes: ["30 ảnh chỉnh sửa chất lượng cao", "1 nhiếp ảnh gia chuyên nghiệp", "Tư vấn concept & địa điểm miễn phí", "Giao ảnh qua link tải trong 7 ngày"],
    process: [
      { no: "01", title: "Tư vấn concept", desc: "Trao đổi nhu cầu, phong cách và ý tưởng phù hợp với khách hàng." },
      { no: "02", title: "Chuẩn bị buổi chụp", desc: "Sắp xếp thời gian, địa điểm, trang phục và các chi tiết cần thiết." },
      { no: "03", title: "Chụp và chỉnh ảnh", desc: "Thực hiện buổi chụp, chọn ảnh và chỉnh sửa theo phong cách đã thống nhất." },
    ],
  },
  {
    slug: "quay-phong-su",
    name: "Quay Phóng Sự", price: "5.000.000đ", emoji: "🎬",
    desc: "Quay và dựng video highlight sự kiện, cưới hỏi.",
    img: "https://images.pexels.com/photos/36606619/pexels-photo-36606619.jpeg", hero: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1400&h=600&fit=crop&auto=format",
    duration: "Cả ngày", category: "Quay Phim",
    fullDesc: "Dịch vụ quay phóng sự của HBT Studio ghi lại trọn vẹn không khí của ngày cưới từ sáng đến tối. Video highlight được dựng chuyên nghiệp, phối nhạc tinh tế, trở thành kỷ niệm đáng trân trọng cho cả gia đình.",
    includes: ["Quay full ngày sự kiện", "Video highlight 5–7 phút", "Dựng phim chuyên nghiệp có nhạc nền", "Xuất file Full HD, giao trong 14 ngày"],
    process: [
      { no: "01", title: "Trao đổi kịch bản", desc: "Nắm bắt timeline, địa điểm và phong cách video mong muốn." },
      { no: "02", title: "Quay ngày sự kiện", desc: "Ekip quay đầy đủ các khoảnh khắc quan trọng trong ngày." },
      { no: "03", title: "Dựng & giao phim", desc: "Chỉnh màu, phối nhạc và dựng video theo phong cách thống nhất." },
    ],
  },
  {
    slug: "cho-thue-studio",
    name: "Cho Thuê Studio", price: "500.000đ", emoji: "🌿",
    desc: "Thuê studio đầy đủ ánh sáng, phông nền theo giờ.",
    img: "https://images.pexels.com/photos/11901222/pexels-photo-11901222.jpeg", hero: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1400&h=600&fit=crop&auto=format",
    duration: "1 giờ", category: "Thuê Studio & Thiết Bị",
    fullDesc: "Studio HBT được trang bị đầy đủ hệ thống đèn studio chuyên nghiệp, đa dạng phông nền và props. Không gian thoáng đãng, phù hợp cho chụp cá nhân, nhóm, sản phẩm hay thương hiệu cá nhân.",
    includes: ["Không gian studio 40m²", "Hệ thống đèn studio đầy đủ", "Nhiều lựa chọn phông nền", "Props & phụ kiện hỗ trợ"],
    process: [
      { no: "01", title: "Tư vấn concept", desc: "Trao đổi nhu cầu, phong cách và ý tưởng phù hợp với khách hàng." },
      { no: "02", title: "Chuẩn bị buổi chụp", desc: "Sắp xếp thời gian, địa điểm, trang phục và các chi tiết cần thiết." },
      { no: "03", title: "Chụp và chỉnh ảnh", desc: "Thực hiện buổi chụp, chọn ảnh và chỉnh sửa theo phong cách đã thống nhất." },
    ],
  },
  {
    slug: "chup-anh-doanh-nghiep",
    name: "Chụp Ảnh Doanh Nghiệp", price: "2.000.000đ", emoji: "💼",
    desc: "Chụp profile công ty, nhân sự, sự kiện doanh nghiệp.",
    img: "https://images.pexels.com/photos/21044856/pexels-photo-21044856.jpeg", hero: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&h=600&fit=crop&auto=format",
    duration: "1 giờ", category: "Chụp Ảnh",
    fullDesc: "Bộ ảnh doanh nghiệp chuyên nghiệp giúp thương hiệu của bạn tạo ấn tượng mạnh với khách hàng và đối tác. HBT Studio cung cấp dịch vụ chụp ảnh profile, headshot nhân sự và phóng sự sự kiện công ty.",
    includes: ["50 ảnh chỉnh sửa chất lượng cao", "Chụp tại studio hoặc văn phòng", "Tư vấn phong cách & trang phục", "Giao ảnh trong 7 ngày"],
    process: [
      { no: "01", title: "Tư vấn concept", desc: "Trao đổi nhu cầu, phong cách và ý tưởng phù hợp với khách hàng." },
      { no: "02", title: "Chuẩn bị buổi chụp", desc: "Sắp xếp thời gian, địa điểm, trang phục và các chi tiết cần thiết." },
      { no: "03", title: "Chụp và chỉnh ảnh", desc: "Thực hiện buổi chụp, chọn ảnh và chỉnh sửa theo phong cách đã thống nhất." },
    ],
  },
  {
    slug: "chup-anh-san-pham",
    name: "Chụp Ảnh Sản Phẩm", price: "2.500.000đ", emoji: "📸",
    desc: "Chụp sản phẩm thương mại điện tử, menu, quảng cáo.",
    img: "https://images.pexels.com/photos/14149690/pexels-photo-14149690.jpeg", hero: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400&h=600&fit=crop&auto=format",
    duration: "1 giờ", category: "Chụp Ảnh",
    fullDesc: "Ảnh sản phẩm đẹp là chìa khóa tăng doanh số. HBT Studio chụp ảnh sản phẩm với ánh sáng chuẩn, bố cục đẹp mắt phù hợp cho Shopee, website, menu nhà hàng và quảng cáo mạng xã hội.",
    includes: ["20 ảnh/sản phẩm chỉnh sửa hoàn chỉnh", "Nền trắng và nền cảnh (lifestyle)", "Tư vấn sắp xếp & props", "File xuất nhiều kích thước"],
    process: [
      { no: "01", title: "Tư vấn concept", desc: "Trao đổi nhu cầu, phong cách và ý tưởng phù hợp với khách hàng." },
      { no: "02", title: "Chuẩn bị buổi chụp", desc: "Sắp xếp thời gian, địa điểm, trang phục và các chi tiết cần thiết." },
      { no: "03", title: "Chụp và chỉnh ảnh", desc: "Thực hiện buổi chụp, chọn ảnh và chỉnh sửa theo phong cách đã thống nhất." },
    ],
  },
  {
    slug: "make-up",
    name: "Make Up", price: "800.000đ", emoji: "✨",
    desc: "Trang điểm chuyên nghiệp cho buổi chụp ảnh.",
    img: "https://images.pexels.com/photos/18378798/pexels-photo-18378798.jpeg", hero: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1400&h=600&fit=crop&auto=format",
    duration: "1 giờ", category: "Trang Điểm & Trang Phục",
    fullDesc: "Đội ngũ make up artist của HBT Studio được đào tạo bài bản, am hiểu ánh sáng studio để tạo lớp trang điểm hoàn hảo trước ống kính. Phong cách đa dạng từ tự nhiên, nhẹ nhàng đến ấn tượng theo yêu cầu.",
    includes: ["Trang điểm mặt hoàn chỉnh", "Tư vấn phong cách phù hợp", "Dụng cụ & mỹ phẩm cao cấp", "Chỉnh sửa trong suốt buổi chụp"],
    process: [
      { no: "01", title: "Tư vấn concept", desc: "Trao đổi nhu cầu, phong cách và ý tưởng phù hợp với khách hàng." },
      { no: "02", title: "Chuẩn bị buổi chụp", desc: "Sắp xếp thời gian, địa điểm, trang phục và các chi tiết cần thiết." },
      { no: "03", title: "Chụp và chỉnh ảnh", desc: "Thực hiện buổi chụp, chọn ảnh và chỉnh sửa theo phong cách đã thống nhất." },
    ],
  },
  {
    slug: "cho-thue-trang-phuc",
    name: "Cho Thuê Trang Phục", price: "200.000đ", emoji: "👗",
    desc: "Thuê váy cưới, vest hoặc trang phục concept.",
    img: "https://images.pexels.com/photos/35304403/pexels-photo-35304403.jpeg", hero: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&h=600&fit=crop&auto=format",
    duration: "1 giờ", category: "Trang Điểm & Trang Phục",
    fullDesc: "Kho trang phục đa dạng của HBT Studio gồm váy cưới, áo dài, vest, trang phục concept Hàn Quốc, vintage và nhiều phong cách khác. Phù hợp cho mọi loại buổi chụp từ cá nhân đến nhóm.",
    includes: ["Váy cưới, áo dài, vest đa dạng", "Phụ kiện đi kèm (khăn, vương miện...)", "Hỗ trợ mặc trang phục", "Thay trang phục không giới hạn trong buổi chụp"],
    process: [
      { no: "01", title: "Tư vấn concept", desc: "Trao đổi nhu cầu, phong cách và ý tưởng phù hợp với khách hàng." },
      { no: "02", title: "Chuẩn bị buổi chụp", desc: "Sắp xếp thời gian, địa điểm, trang phục và các chi tiết cần thiết." },
      { no: "03", title: "Chụp và chỉnh ảnh", desc: "Thực hiện buổi chụp, chọn ảnh và chỉnh sửa theo phong cách đã thống nhất." },
    ],
  },
  {
    slug: "flycam",
    name: "Flycam", price: "1.500.000đ", emoji: "🚁",
    desc: "Quay flycam bổ sung cho bộ ảnh hoặc video.",
    img: "https://images.pexels.com/photos/20738492/pexels-photo-20738492.jpeg", hero: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1400&h=600&fit=crop&auto=format",
    duration: "1 giờ", category: "Quay Phim",
    fullDesc: "Góc nhìn từ trên cao tạo nên những khung hình ấn tượng và độc đáo cho bộ ảnh hay video của bạn. HBT Studio sử dụng flycam chuyên nghiệp, pilot có kinh nghiệm, đảm bảo an toàn tuyệt đối.",
    includes: ["30 phút bay flycam", "Ảnh/video từ góc nhìn máy bay", "Pilot chuyên nghiệp có giấy phép", "Kết hợp được với mọi gói dịch vụ"],
    process: [
      { no: "01", title: "Tư vấn concept", desc: "Trao đổi nhu cầu, phong cách và ý tưởng phù hợp với khách hàng." },
      { no: "02", title: "Chuẩn bị buổi chụp", desc: "Sắp xếp thời gian, địa điểm, trang phục và các chi tiết cần thiết." },
      { no: "03", title: "Chụp và chỉnh ảnh", desc: "Thực hiện buổi chụp, chọn ảnh và chỉnh sửa theo phong cách đã thống nhất." },
    ],
  },
  {
    slug: "in-anh",
    name: "In Ảnh", price: "20.000đ", emoji: "🖼️",
    desc: "In ảnh chất lượng cao theo kích thước yêu cầu.",
    img: "https://images.pexels.com/photos/29245008/pexels-photo-29245008.jpeg", hero: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=600&fit=crop&auto=format",
    duration: "1 giờ", category: "Hậu Kỳ & In Ấn",
    fullDesc: "Dịch vụ in ảnh của HBT Studio sử dụng máy in chuyên nghiệp với mực in cao cấp, giấy ảnh bền màu theo thời gian. Hỗ trợ đa dạng kích thước từ 10×15 đến poster khổ lớn.",
    includes: ["In trên giấy ảnh cao cấp", "Màu sắc trung thực, bền lâu", "Đa dạng kích thước theo yêu cầu", "Đóng gói cẩn thận trước khi giao"],
    process: [
      { no: "01", title: "Tư vấn concept", desc: "Trao đổi nhu cầu, phong cách và ý tưởng phù hợp với khách hàng." },
      { no: "02", title: "Chuẩn bị buổi chụp", desc: "Sắp xếp thời gian, địa điểm, trang phục và các chi tiết cần thiết." },
      { no: "03", title: "Chụp và chỉnh ảnh", desc: "Thực hiện buổi chụp, chọn ảnh và chỉnh sửa theo phong cách đã thống nhất." },
    ],
  },
  {
    slug: "chinh-anh",
    name: "Chỉnh Ảnh", price: "50.000đ", emoji: "🎨",
    desc: "Chỉnh màu, retouch và xuất ảnh chất lượng cao.",
    img: "https://images.pexels.com/photos/32458841/pexels-photo-32458841.jpeg", hero: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=1400&h=600&fit=crop&auto=format",
    duration: "1 giờ", category: "Hậu Kỳ & In Ấn",
    fullDesc: "Dịch vụ chỉnh ảnh chuyên nghiệp của HBT Studio bao gồm chỉnh màu (color grading), làm mịn da, xử lý background và tối ưu ánh sáng. Phù hợp cho cá nhân lẫn doanh nghiệp cần ảnh đẹp nhanh.",
    includes: ["Chỉnh màu & tone theo yêu cầu", "Retouch da, xử lý khuyết điểm", "Tách/thay background nếu cần", "Xuất file JPG/PNG chất lượng cao"],
    process: [
      { no: "01", title: "Tư vấn concept", desc: "Trao đổi nhu cầu, phong cách và ý tưởng phù hợp với khách hàng." },
      { no: "02", title: "Chuẩn bị buổi chụp", desc: "Sắp xếp thời gian, địa điểm, trang phục và các chi tiết cần thiết." },
      { no: "03", title: "Chụp và chỉnh ảnh", desc: "Thực hiện buổi chụp, chọn ảnh và chỉnh sửa theo phong cách đã thống nhất." },
    ],
  },
];

export interface AlbumItem {
  slug: string;
  title: string;
  category: string;
  img: string;
  hero: string;
  desc: string;
  concept: string;
  photos: string[];
}

export const PORTFOLIO: AlbumItem[] = [
  {
    slug: "hoa-xinh",
    title: "Hoa Xinh", category: "Cá nhân",
    img: hoaXinhImg,
    hero: hoaXinhImg,
    concept: "Thiên nhiên · Hoa lá · Tự nhiên",
    desc: "Bộ ảnh Hoa Xinh được thực hiện giữa khung cảnh thiên nhiên tươi mát, nơi từng bông hoa trở thành người bạn đồng hành dịu dàng. Chúng tôi chọn ánh sáng buổi chiều vàng để tôn lên vẻ đẹp trong sáng, nhẹ nhàng của nhân vật.",
    photos: [
      hoaXinhImg,
      "https://images.unsplash.com/photo-1487530811015-780780490d18?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1000&fit=crop&auto=format",
    ],
  },
  {
    slug: "hoang-hon-va-em",
    title: "Hoàng Hôn Và Em", category: "Couple",
    img: hoangHonImg,
    hero: hoangHonImg,
    concept: "Hoàng hôn · Lãng mạn · Ngoại cảnh",
    desc: "Hoàng hôn là khoảnh khắc đẹp nhất trong ngày — khi ánh nắng cuối chiều nhuộm vàng tất cả. Bộ ảnh này ghi lại tình yêu của hai người trong ánh sáng dịu dàng đó, nơi mỗi nụ cười, mỗi cái nắm tay đều trở nên lung linh và đáng nhớ mãi.",
    photos: [
      hoangHonImg,
      hoangHonRingImg,
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800&h=600&fit=crop&auto=format",
    ],
  },
  {
    slug: "ca-nha-cung-vui",
    title: "Cả Nhà Cùng Vui", category: "Gia đình",
    img: "https://images.unsplash.com/photo-1760633549227-901e0c3cf9d3?w=600&h=800&fit=crop&auto=format",
    hero: "https://images.unsplash.com/photo-1760633549227-901e0c3cf9d3?w=1400&h=700&fit=crop&auto=format",
    concept: "Gia đình · Ngoại cảnh · Hạnh phúc",
    desc: "Không có gì quý hơn những khoảnh khắc sum vầy bên gia đình. Bộ ảnh Cả Nhà Cùng Vui ghi lại tiếng cười, những cái ôm ấm áp và ánh mắt yêu thương — tất cả hòa quyện trong khung cảnh thiên nhiên tươi xanh, tạo nên một tác phẩm đong đầy cảm xúc.",
    photos: [
      "https://images.unsplash.com/photo-1760633549227-901e0c3cf9d3?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1602576907053-e143c69d432d?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1593100126453-19b562a800c1?w=800&h=600&fit=crop&auto=format",
    ],
  },
  {
    slug: "tuoi-18",
    title: "Tuổi 18", category: "Cá nhân",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop&auto=format",
    hero: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1400&h=700&fit=crop&auto=format",
    concept: "Trẻ trung · Rực rỡ · Kỷ niệm",
    desc: "Tuổi 18 — cột mốc đáng nhớ nhất trong cuộc đời mỗi người. Bộ ảnh được thực hiện với năng lượng tươi trẻ, rực rỡ, ghi lại vẻ đẹp thanh xuân đầy sức sống và những ước mơ đang chờ phía trước.",
    photos: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1487530811015-780780490d18?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&auto=format",
    ],
  },
  {
    slug: "marry-me",
    title: "Marry Me", category: "Cưới",
    img: marryMeImg,
    hero: marryMeImg,
    concept: "Cưới · Hoa · Lãng mạn",
    desc: "Ngày cưới là ngày đẹp nhất trong cuộc đời. Bộ ảnh Marry Me ghi lại trọn vẹn cảm xúc của khoảnh khắc thiêng liêng đó — từ chiếc nhẫn đính hôn long lanh đến nụ hôn đầu tiên của đôi vợ chồng, tất cả đều được lưu giữ trong từng khung hình.",
    photos: [
      marryMeImg,
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800&h=600&fit=crop&auto=format",
    ],
  },
  {
    slug: "khai-truong",
    title: "Khai Trương", category: "Doanh nghiệp",
    img: khaiTruongImg,
    hero: khaiTruongImg,
    concept: "Sự kiện · Doanh nghiệp · Chuyên nghiệp",
    desc: "Lễ khai trương là bước khởi đầu của một hành trình mới. Bộ ảnh phóng sự ghi lại toàn bộ không khí náo nhiệt, niềm vui và những khoảnh khắc đáng nhớ của ngày trọng đại — tư liệu quý giá cho thương hiệu của bạn.",
    photos: [
      khaiTruongImg,
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=1000&fit=crop&auto=format",
    ],
  },
  {
    slug: "tam-biet-tuoi-hoc-tro",
    title: "Tạm Biệt Tuổi Học Trò", category: "Nhóm",
    img: "https://images.pexels.com/photos/32121122/pexels-photo-32121122.jpeg",
    hero: "https://images.pexels.com/photos/32121122/pexels-photo-32121122.jpeg",
    concept: "Kỷ yếu · Bạn bè · Ký ức",
    desc: "Những năm tháng học trò là quãng thời gian đẹp nhất — và bộ ảnh kỷ yếu này là cách để lưu giữ mãi mãi. Từng khuôn mặt rạng rỡ, từng nụ cười hồn nhiên đều được ghi lại trọn vẹn, trở thành ký ức không phai của cả nhóm.",
    photos: [
      "https://images.pexels.com/photos/32121122/pexels-photo-32121122.jpeg",
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=1000&fit=crop&auto=format",
    ],
  },
  {
    slug: "cot-moc",
    title: "Cột Mốc", category: "Couple",
    img: cotMocImg,
    hero: cotMocImg,
    concept: "Tình yêu · Kỷ niệm · Cột mốc",
    desc: "Mỗi tình yêu đều có những cột mốc riêng — ngày đầu hẹn hò, kỷ niệm một năm, hay những khoảnh khắc bình dị nhưng đong đầy yêu thương. Bộ ảnh Cột Mốc được thực hiện để tôn vinh những khoảnh khắc đó.",
    photos: [
      cotMocImg,
      cotMoc2Img,
      "https://images.pexels.com/photos/28731158/pexels-photo-28731158.jpeg",
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1602576907053-e143c69d432d?w=800&h=600&fit=crop&auto=format",
    ],
  },
];

export const STATS = [
  { target: 500, suffix: "+", label: "Khách hàng hài lòng", icon: "🌿" },
  { target: 10, suffix: "+", label: "Concept độc đáo", icon: "🎨" },
  { target: 2019, suffix: "", label: "Năm thành lập", icon: "✦" },
  { target: 100, suffix: "%", label: "Tận tâm phục vụ", icon: "💚" },
];

export const TESTIMONIALS = [
  { name: "Nguyễn Minh Châu", role: "Cô dâu", text: "Studio chụp tuyệt vời! Ekip rất chuyên nghiệp và thân thiện. Bộ ảnh cưới vượt ngoài mong đợi, từng khoảnh khắc đều được ghi lại tinh tế và đầy cảm xúc.", rating: 5, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format" },
  { name: "Trần Quốc Hùng", role: "Chủ doanh nghiệp", text: "Chụp ảnh doanh nghiệp cho team ở đây. Ảnh ra rất đẹp, chuyên nghiệp. Cách xử lý ánh sáng và góc chụp rất xuất sắc, mình rất hài lòng.", rating: 5, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format" },
  { name: "Lê Thị Hương", role: "Khách hàng", text: "Đặt lịch chụp concept Hoàng hôn và Em, ekip rất nhiệt tình hỗ trợ từ trang phục đến tạo dáng. Mình sẽ quay lại cho các dịp đặc biệt khác!", rating: 5, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format" },
];

// ── Hooks
export function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export function useCountUp(target: number, duration = 1600, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return count;
}

// ── Shared components
export function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.85s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.85s cubic-bezier(.22,1,.36,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export function BranchDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-2">
      <span className="h-px flex-1 max-w-[80px]" style={{ background: C.sageMain, opacity: 0.4 }} />
      <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
        <path d="M2 10 Q12 2 24 10 Q36 18 46 10" stroke={C.sageMain} strokeWidth="1.5" fill="none" />
        <circle cx="24" cy="10" r="2.5" fill={C.pink} />
        <circle cx="14" cy="6.5" r="1.5" fill={C.champagne} />
        <circle cx="34" cy="13.5" r="1.5" fill={C.pink} />
      </svg>
      <span className="h-px flex-1 max-w-[80px]" style={{ background: C.sageMain, opacity: 0.4 }} />
    </div>
  );
}

export function SectionBanner({ title, subtitle, img, align = "center" }: {
  title: string; subtitle?: string; img: string; align?: "left" | "center";
}) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 280 }}>
      <img src={img} alt={title} className="w-full h-full object-cover" style={{ filter: "brightness(0.45) saturate(1.1)" }} />
      <div className="absolute inset-0" style={{ background: align === "center" ? "linear-gradient(to bottom, rgba(52,78,65,0.3) 0%, rgba(52,78,65,0.6) 100%)" : "linear-gradient(to right, rgba(52,78,65,0.75) 0%, rgba(52,78,65,0.2) 70%)" }} />
      <svg className="absolute left-0 bottom-0 pointer-events-none" width="120" height="120" viewBox="0 0 120 120" fill="none" style={{ opacity: 0.18 }}>
        <path d="M10 110 Q30 60 80 20" stroke="#D4E0D0" strokeWidth="1.2" fill="none" />
        <ellipse cx="40" cy="72" rx="14" ry="8" transform="rotate(-40 40 72)" fill={C.sageMain} />
        <ellipse cx="62" cy="48" rx="12" ry="7" transform="rotate(-50 62 48)" fill={C.sageMain} />
      </svg>
      <svg className="absolute right-0 top-0 pointer-events-none" width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.15, transform: "scaleX(-1)" }}>
        <path d="M10 90 Q40 50 90 10" stroke="#D4E0D0" strokeWidth="1.2" fill="none" />
        <ellipse cx="35" cy="65" rx="12" ry="7" transform="rotate(-45 35 65)" fill={C.sageMain} />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-end pb-10 px-8" style={{ alignItems: align === "center" ? "center" : "flex-start", textAlign: align }}>
        {subtitle && (
          <div className="flex items-center gap-2 mb-2" style={{ justifyContent: align === "center" ? "center" : "flex-start" }}>
            <span className="inline-block w-5 h-px" style={{ background: C.champagne }} />
            <span className="text-xs tracking-widest uppercase font-medium" style={{ color: C.champagne, letterSpacing: "0.18em" }}>{subtitle}</span>
            <span className="inline-block w-5 h-px" style={{ background: C.champagne }} />
          </div>
        )}
        <h1 className="font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1 }}>
          {title}
        </h1>
        <div className="mt-3 h-0.5 w-12 rounded-full" style={{ background: `linear-gradient(to right, ${C.peach}, ${C.champagne})` }} />
      </div>
    </div>
  );
}

export function StatCard({ target, suffix, label, icon, delay }: { target: number; suffix: string; label: string; icon: string; delay: number }) {
  const { ref, visible } = useInView(0.3);
  const count = useCountUp(target, 1600, visible);
  return (
    <div
      ref={ref}
      className="relative text-center py-10 px-6 rounded-2xl overflow-hidden cursor-default group"
      style={{
        background: "rgba(255,255,255,0.6)",
        border: `1.5px solid ${C.sageLight}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(36px) scale(0.94)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, box-shadow 0.3s, border-color 0.3s`,
      }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = `0 12px 40px rgba(52,78,65,0.13)`; el.style.borderColor = C.sageMain; el.style.transform = "translateY(-6px) scale(1.02)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "none"; el.style.borderColor = C.sageLight; el.style.transform = "translateY(0) scale(1)"; }}
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 0%, rgba(163,177,138,0.18) 0%, transparent 70%)` }} />
      <div className="text-2xl mb-3 select-none">{icon}</div>
      <div className="font-bold leading-none mb-2 tabular-nums" style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.2rem", color: C.forest, lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div className="mx-auto mb-3 rounded-full" style={{ height: 2, background: `linear-gradient(to right, ${C.peach}, ${C.champagne})`, width: visible ? "40px" : "0px", transition: `width 0.8s cubic-bezier(.22,1,.36,1) ${delay + 0.3}s` }} />
      <div className="text-sm font-medium" style={{ color: C.forestMid }}>{label}</div>
    </div>
  );
}

export function ServiceCard({ s, onBook, onDetail }: { s: ServiceDetail; onBook: () => void; onDetail?: () => void }) {
  return (
    <div
      className="group rounded-2xl border overflow-hidden cursor-pointer"
      style={{ borderColor: C.sageLight, background: C.white, transition: "border-color 0.4s, box-shadow 0.4s, transform 0.4s" }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.sageMain; el.style.boxShadow = `0 12px 48px rgba(52,78,65,0.12)`; el.style.transform = "translateY(-5px)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.sageLight; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; }}
    >
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        {s.img ? (
          <img src={s.img} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${C.sageLight} 0%, rgba(212,224,208,0.5) 60%, rgba(233,196,106,0.15) 100%)` }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute" style={{ width: 160, height: 160, borderRadius: "50%", border: `1px solid rgba(52,78,65,0.08)`, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
              <div className="absolute" style={{ width: 110, height: 110, borderRadius: "50%", border: `1px solid rgba(52,78,65,0.06)`, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
              <svg className="absolute top-2 left-2" width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.22 }}>
                <path d="M4 44 Q8 20 30 8 Q18 28 4 44Z" fill={C.forestMid} />
                <path d="M4 44 Q16 32 30 8" stroke={C.forest} strokeWidth="0.8" fill="none" />
              </svg>
              <svg className="absolute bottom-2 right-2" width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.18, transform: "rotate(180deg)" }}>
                <path d="M4 44 Q8 20 30 8 Q18 28 4 44Z" fill={C.forestMid} />
              </svg>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-2 px-6 py-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.7)" }}>
              <span style={{ fontSize: 28, lineHeight: 1 }}>{s.emoji}</span>
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: C.sageMain, letterSpacing: "0.14em" }}>Ảnh sắp cập nhật</span>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100" style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%)", transition: "opacity 0.5s" }} />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(255,255,255,0.7), transparent)", backdropFilter: "blur(2px)" }} />
      </div>
      <div className="p-6">
        <h3 className="font-semibold mb-1.5 text-base" style={{ fontFamily: "'Playfair Display', serif", color: C.forest }}>{s.name}</h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: C.sageMain }}>{s.desc}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg" style={{ color: C.peach }}>{s.price}</span>
          <div className="flex items-center gap-2">
            {onDetail && (
              <button onClick={onDetail} className="text-xs font-semibold flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105" style={{ background: C.sageLight, color: C.forest }}>
                Chi tiết <ArrowRight size={11} />
              </button>
            )}
            <button onClick={onBook} className="text-xs font-semibold flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105" style={{ background: C.peach, color: C.white }}>
              Đặt lịch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioCard({ p, onClick }: { p: AlbumItem; onClick?: () => void }) {
  return (
    <div
      className="group relative overflow-hidden cursor-pointer"
      style={{ borderRadius: "12px", background: C.sageLight, transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = "0 16px 40px rgba(52,78,65,0.25)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
      onClick={onClick}
    >
      <img src={p.img} alt={p.title} className="w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" style={{ height: "260px" }} />
      <div className="absolute inset-0 transition-opacity duration-700 opacity-70 group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(34, 56, 44, 0.9) 0%, rgba(34, 56, 44, 0) 65%)" }} />
      <div className="absolute inset-0 flex flex-col justify-end p-5 transition-transform duration-500 ease-out translate-y-3 group-hover:translate-y-0">
        <div className="text-xs font-semibold tracking-widest uppercase transition-all duration-500" style={{ color: C.champagne }}>{p.category}</div>
        <div className="font-semibold text-base mt-1 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{p.title}</div>
        <div className="h-0 opacity-0 overflow-hidden group-hover:h-5 group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 ease-out">
          <button className="text-xs text-white/90 flex items-center gap-1 hover:text-white transition-colors">
            Xem album <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="p-8 rounded-2xl border relative overflow-hidden" style={{ borderColor: C.sageLight, background: C.white }}>
      <svg className="absolute top-0 right-0 pointer-events-none" width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ opacity: 0.3 }}>
        <circle cx="50" cy="10" r="10" fill={C.pink} />
        <circle cx="38" cy="4" r="5" fill={C.champagne} />
        <path d="M45 8 Q52 20 46 35" stroke={C.sageMain} strokeWidth="1.5" fill="none" />
      </svg>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} fill={C.peach} color={C.peach} />)}
      </div>
      <p className="leading-relaxed mb-6 text-sm italic" style={{ color: C.forestMid }}>"{t.text}"</p>
      <div className="flex items-center gap-3">
        <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" style={{ border: `2px solid ${C.sageLight}` }} />
        <div>
          <div className="text-sm font-semibold" style={{ color: C.forest }}>{t.name}</div>
          <div className="text-xs" style={{ color: C.sageMain }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export const globalStyles = `
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes bounce { 0%,100% { transform:translateX(-50%) translateY(0); } 50% { transform:translateX(-50%) translateY(7px); } }
  @keyframes shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
  ::placeholder { color: #A3B18A; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #D4E0D0; border-radius: 2px; }
`;
