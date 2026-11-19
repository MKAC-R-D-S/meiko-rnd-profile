# Website Meiko: bản nâng cấp Con đường 3D

## Xem tại máy

Từ thư mục dự án: `python -m http.server 8080 --bind 127.0.0.1`, mở `http://127.0.0.1:8080/`.

## Chỉnh nội dung

- `assets/site-copy.mjs`: nội dung Việt, Anh, Nhật và dữ liệu sản phẩm mới.
- `scripts/build-site.mjs`: mẫu HTML trang chủ và ba trang sản phẩm mới. Chạy `node scripts/build-site.mjs` sau khi thay nội dung/mẫu để cập nhật HTML tĩnh.
- `assets/site.css`: giao diện mới; `assets/road.js`: canvas phối cảnh; `assets/site.js`: tương tác, ngôn ngữ và biểu mẫu.
- Các trang sản phẩm có sẵn vẫn giữ catalogue và bản dịch riêng. `products/shared/product-shell.js` nối tư vấn về trang chủ; `products/shared/product-road.css` đồng bộ giao diện.

HTML đã tạo được commit cùng mã nguồn và chạy trực tiếp trên GitHub Pages; không cần Node trên hosting. Không sửa tay HTML được tạo mà bỏ qua mẫu nguồn.

## Kiểm tra

Chạy server cục bộ rồi chạy `python scratch/check-road-site.py` (cần Python Playwright và Microsoft Edge). Kiểm thử không gửi email thật.

## Trước khi xuất bản

Rà soát `.scratch/website-upgrade/content-backlog.md`, xác nhận URL hosting và EmailJS, lấy duyệt nội dung/giao diện. Chỉ xuất bản khi người dùng yêu cầu.
