---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Homepage (index.html): brief

Mode: Persuade. Visitor: kỹ sư nhà máy, đơn vị tích hợp hệ thống/đại lý, đối tác ODM/OEM đang đánh giá năng lực Meiko.
Action: gửi "Yêu cầu tư vấn / báo giá" (form `#contact`, giữ EmailJS hiện có) hoặc đặt lịch demo kỹ thuật.

## Scope and boundaries
- Chỉ trang chủ, nhánh `redesign/homepage-premium`. Giữ Jekyll/GitHub Pages, song ngữ VI/EN (+ JP đang có), SEO/OG, form, `?product=` preset, service worker.
- Không đụng trang sản phẩm. Không cài dependency. Không commit/deploy.
- Cấu trúc: Hero → Năng lực R&D → Giải pháp → Sản phẩm → Ứng dụng → Liên hệ.
- Hero có 2 phương án để duyệt: A "Engineering Excellence" (năng lực R&D) và B "Technology in Action" (sản phẩm và giải pháp). Chọn bằng `?hero=a|b` (chỉ phục vụ duyệt; sau khi chốt thì xoá phương án còn lại).
- Mật độ thị giác: ~70% premium minimalism (khoảng trắng, ảnh sản phẩm, chữ), ~30% engineering blueprint (khung tên, đường kích thước, nhãn mono, số mục 01–05). Không phủ lưới kỹ thuật toàn trang.

## Real content and integrity
- Chỉ dùng ảnh đã kiểm kê và gắn nhãn; thiết bị chưa có ảnh thật dùng khung trung tính nhãn "Hình minh họa" (≥12px). Không vẽ hình dáng thiết bị giả.
- Thông số chỉ dùng khi có nguồn; còn lại gắn "Thông số dự kiến — cần xác nhận" hoặc bỏ. Không số liệu/khách hàng/chứng nhận bịa.
- Smart Factory/IoT là một nhóm giải pháp; TingBox, Tool/JIG, BiPAP là sản phẩm cùng hạng trong lưới, không phải "liên quan".

## Interaction and layout
- Điều hướng rõ: Năng lực · Giải pháp · Sản phẩm · Ứng dụng · Liên hệ + VI/EN/JP.
- Sản phẩm: gallery, mỗi sản phẩm một ô lớn (ảnh, mã mono, một dòng vai trò, "Xem chi tiết", "Yêu cầu tư vấn"). Giữ lọc nhóm.
- Giải pháp: nhóm có thể mở rộng (Smart Factory/IoT, Tool/JIG và kiểm thử, ODM/OEM), dựng từ một mảng dữ liệu, không mã cứng tab.
- Chuyển động: một khoảnh khắc có chủ đích (hero plate unveil + callout); phần còn lại chỉ đổi trạng thái khi hover/focus. Không reveal khi cuộn. `prefers-reduced-motion` tắt hết.
- Responsive 375/768/1440; chữ phụ tối thiểu 12px, thân 16px.

## Constraints / open decisions
- Hộp thư liên hệ chung thay email cá nhân: chờ người dùng (giữ nguyên tạm thời).
- Ảnh PCB/JIG/hiện trường: tuỳ kết quả kiểm kê; không dừng build nếu thiếu.

## Direction contract

THESIS: Meiko thiết kế và chế tạo phần cứng; trang là một buổi ra mắt sản phẩm: phần cứng thật được chiếu sáng như vật thể trưng bày, thay cho lưới thẻ IoT phẳng và dải màu phẳng xen kẽ.

OWN-WORLD: ba ngôn ngữ trong một hệ: Dark Cinematic (nền gần đen ấm, quầng sáng, bảng mạch nghiêng 3D có bóng sâu và một vệt sáng quét), Clean Premium (nền mist studio, ảnh được cân bằng về phông #ecebe8 và làm mềm mép, ảnh bối cảnh tràn khung), Industrial Intelligence (sơ đồ nút ảnh thật, dây nối có xung đỏ cam). Chữ Archivo 300 + 640, mono chỉ cho mã/nhãn loại ảnh; một màu nhấn #ef5a2a.

STORY: khách thấy ngay một doanh nghiệp làm phần cứng thật (bảng mạch), hiểu quy trình và bằng chứng (CAD JIG, PCB, số liệu có nguồn), thấy luồng giải pháp IoT, duyệt bộ sưu tập thiết bị, thấy ảnh lắp đặt thật, rồi gửi yêu cầu tư vấn / báo giá.

FIRST VIEWPORT: 1440x900: thanh tối với logo trắng; tiêu đề "Kỹ thuật phần cứng / cho công nghiệp." (nhạt / đậm) bên trái, mô tả, CTA đỏ cam + CTA viền; bảng mạch MGWI-V1 nghiêng 3D tràn mép phải; chú thích FIG.01 trái dưới; thanh 5 năng lực ở chân.

FORM: Hero 1 "Precision Object" + Gallery B "Collection Mosaic" + sơ đồ "Signal Architecture" cho mục Giải pháp, người dùng chọn từ vòng concept. seed: none (pinned) — "Đồng ý theo đề xuất của bạn." (Hero 1, Gallery B, Hero 2 làm mục Giải pháp).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
