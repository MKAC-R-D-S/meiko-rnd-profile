# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Nhà máy / kỹ sư sản xuất, bảo trì: tìm giải pháp IoT giám sát năng lượng, trạng thái máy, cảnh báo tại hiện trường.
- Đơn vị tích hợp hệ thống / đại lý: cần thông số kỹ thuật để đưa thiết bị vào dự án.
- Đối tác ODM/OEM: muốn Meiko thiết kế và sản xuất phần cứng riêng.

Dòng thiết bị y tế (BiPAP, CPAP) có trong repo nhưng bệnh viện chưa được xác nhận là đối tượng chính.

## Product Purpose

Website doanh nghiệp công nghệ và kỹ thuật (corporate technology & engineering) của Meiko Automation R&D: giới thiệu năng lực nghiên cứu, thiết kế, phát triển sản phẩm, cùng các giải pháp và sản phẩm đã phát triển. Không chỉ là catalogue sản phẩm và không chỉ là website IoT Smart Factory. Thành công là khách gửi yêu cầu tư vấn / báo giá, hoặc đặt lịch demo kỹ thuật với đội R&D.

Hành trình dẫn dắt khách: năng lực R&D → giải pháp → sản phẩm → ứng dụng → liên hệ tư vấn/báo giá.

## Positioning

Meiko Automation R&D là đơn vị có năng lực nghiên cứu, thiết kế và phát triển sản phẩm công nghệ: Embedded Hardware, Firmware, Industrial IoT, Automation và ODM/OEM. Tự thiết kế phần cứng, firmware và kiểm thử (JIG ICT/FCT, DFM/DFT), đi từ ý tưởng đến sản xuất và triển khai thực tế, không chỉ bán thiết bị.

Smart Factory / Industrial IoT là một nhóm giải pháp trọng tâm, không phải toàn bộ hoạt động R&D. Cấu trúc nội dung phải còn chỗ mở rộng cho lĩnh vực và sản phẩm khác (hiện có Tool/JIG, TingBox, thiết bị y tế).

## Operating Context

Nhóm giải pháp Smart Factory / Industrial IoT, luồng: thu thập tín hiệu (MESI-V1, MTSI-V1) → kết nối hệ thống (MGWI-V1) → phản hồi tại hiện trường (MGAW-V1). Truyền thông LoRa, Modbus RTU.

## Capabilities and Constraints

- Stack hiện có: site tĩnh Jekyll trên GitHub Pages, HTML/CSS/JS thuần, giao diện song ngữ VI/EN (`data-t`), SEO/OG đã làm, service worker `sw.js`.
- Dòng sản phẩm: MESI-V1, MTSI-V1, MGWI-V1, MGAW-V1, IOTPLC-A02, TingBox, Tool/JIG, BiPAP. `mgwi-v1` và `mtsi-v1` chưa có trang.
- Thuật ngữ (GLOSSARY.md): "Yêu cầu tư vấn / báo giá"; "Nội dung tạm" phải rà soát trước khi xuất bản; "Thông số dự kiến" phải kèm ghi chú "Thông số dự kiến — cần xác nhận", không gọi là thông số chính thức; "Hình minh họa" không phải bằng chứng hình dáng thiết bị đã sản xuất.

## Brand Commitments

Logo Meiko Automation tại `company/brand/` và `assets/`.

Ràng buộc thị giác do người dùng chỉ định (ghi nhận nguyên văn, chưa mở rộng): hướng Premium Industrial Technology kết hợp Engineering Minimalism; cảm giác hiện đại, tinh tế, sang trọng, có chiều sâu, công nghệ cao, đáng tin cậy. Tránh giao diện SaaS template đại trà, hiệu ứng quá mức và hình ảnh không đúng sản phẩm thực tế. Ưu tiên typography, bố cục, khoảng trắng, màu nhất quán, product photography, 3D render, micro-interaction và responsive.

## Evidence on Hand

- Ảnh và render sản phẩm: `products/*/images`, `research/assets_Meiko_Automation/`.
- Catalogue và tài liệu: `products/_shared/catalogue/`, `research/assets_Meiko_Automation/` (Company Profile, Smart Factory, IoT System).
- Ảnh hiện trường triển khai (ví dụ `Real_Application_Images`): người dùng xác nhận dùng được, cần kiểm tra từng ảnh là ảnh thật trước khi gắn nhãn là triển khai thực tế.
- Chưa có trong repo: số dự án, số năm, khách hàng, chứng nhận. Không được tự thêm; người dùng sẽ cung cấp.

## Product Principles

1. Không khẳng định điều chưa xác thực: thông số và số liệu phải có nguồn.
2. Dẫn dắt từ năng lực R&D, rồi giải pháp, sản phẩm, ứng dụng; thiết bị là một phần của giải pháp, Smart Factory là một nhóm trong nhiều nhóm.
3. Năng lực R&D được thể hiện qua quy trình và tài liệu kỹ thuật thật.
4. Mọi trang đều dẫn tới "Yêu cầu tư vấn / báo giá" hoặc đặt lịch demo.
5. Cấu trúc và nội dung phải mở rộng được sang lĩnh vực, sản phẩm mới mà không phải dựng lại.
6. Hình ảnh phải đúng sản phẩm thực; hình minh họa luôn được gắn nhãn là hình minh họa.
7. Giữ song ngữ VI/EN và SEO hiện có.
