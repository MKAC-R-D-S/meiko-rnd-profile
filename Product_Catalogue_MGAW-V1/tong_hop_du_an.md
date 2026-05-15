# Dự án IOTD260301 – Hệ thống Loa & Đèn Cảnh Báo IP (Industrial IoT Audio & Light Alert System)

## 1. Tổng quan dự án

### Mã dự án
- IOTD260301

### Tên dự án
- Hệ thống Loa & Đèn Cảnh Báo IP IoT
- Industrial IoT Audio & Light Alert System

### Mục tiêu dự án
Phát triển bộ thiết bị cảnh báo công nghiệp sử dụng nền tảng IoT, hỗ trợ:
- Phát âm thanh cảnh báo qua loa
- Điều khiển đèn cảnh báo / đèn tháp / còi đèn
- Kết nối mạng IP / MQTT
- Tích hợp hệ thống CCTV AI / Fire Alarm / SCADA / BMS
- Quản lý tập trung từ nền tảng cloud hoặc server nội bộ
- Hỗ trợ OTA firmware update
- Dễ mở rộng và sản xuất hàng loạt

### Định hướng sử dụng
- Nhà máy sản xuất
- Kho vận / logistics
- Tòa nhà thông minh
- Hệ thống PCCC
- Hệ thống AI Camera
- Cảnh báo an toàn công nghiệp
- Smart Factory / Industry 4.0

---

# 2. Danh mục thiết bị

## 2.1 Loa cảnh báo IP

### Model
- MGSP-V1

### Chức năng chính
- Phát âm thanh cảnh báo từ hệ thống trung tâm
- Nhận lệnh điều khiển qua MQTT/IP
- Phát file audio cục bộ hoặc TTS
- Điều khiển từ nền tảng cloud/server
- Hỗ trợ OTA update
- Tích hợp AI/CCTV/Fire Alarm

### Ứng dụng
- Cảnh báo khu vực nguy hiểm
- Cảnh báo AI camera
- Cảnh báo cháy
- Hướng dẫn sơ tán
- Thông báo vận hành

---

## 2.2 Đèn cảnh báo IP

### Chức năng chính
- Điều khiển đèn cảnh báo qua IP/MQTT
- Điều khiển đèn tháp và còi đèn ngoài
- Chớp nháy theo trạng thái hệ thống
- Đồng bộ với loa cảnh báo
- Điều khiển từ server hoặc cloud

### Ứng dụng
- Cảnh báo sự cố
- Cảnh báo máy móc
- Cảnh báo an toàn
- Hiển thị trạng thái vận hành

---

# 3. Định vị sản phẩm

## Tên gọi tổng quát đề xuất
### Industrial IoT Audio & Light Alert Device

### Đặc điểm
- Industrial-grade
- IP Network-based
- MQTT/IoT Ready
- Audio + Light integrated
- Easy deployment
- Centralized management

---

# 4. Kiến trúc hệ thống

## 4.1 Thành phần hệ thống

### Thiết bị Edge
- Loa cảnh báo IP
- Đèn cảnh báo IP
- Gateway IoT
- Camera AI
- Fire Alarm System

### Hạ tầng mạng
- Ethernet
- Wi-Fi
- LTE/4G
- VPN
- MQTT Broker

### Server / Cloud
- Dashboard giám sát
- Event processing
- Device management
- OTA server
- Media/audio management
- Logging system

---

## 4.2 Luồng hoạt động

### Ví dụ hoạt động AI Camera
1. Camera AI phát hiện sự kiện
2. Server xử lý event
3. Gửi MQTT command
4. Loa phát cảnh báo
5. Đèn kích hoạt chớp/còi
6. Ghi log hệ thống

### Ví dụ hoạt động Fire Alarm
1. Hệ thống báo cháy kích hoạt
2. Middleware nhận dữ liệu
3. MQTT/Event trigger
4. Loa phát thông báo sơ tán
5. Đèn cảnh báo kích hoạt
6. Trung tâm giám sát hiển thị cảnh báo

---

# 5. Công nghệ sử dụng

## Phần cứng
- ESP32-S3
- LTE Module
- Ethernet
- Audio Amplifier
- Relay / MOSFET output
- LED driver
- Speaker industrial
- Tower light interface

## Giao thức
- MQTT
- HTTP/HTTPS
- TCP/IP
- Modbus
- BACnet

## Firmware
- PlatformIO
- OTA Update
- MQTT Client
- Watchdog
- Logging
- Secure communication

## Backend
- MQTT Broker
- Dashboard Web
- Event Processing
- API Integration
- Device Monitoring

---

# 6. Yêu cầu kỹ thuật chính

## Functional Requirements

### Loa cảnh báo
- Phát âm thanh theo lệnh
- Điều chỉnh âm lượng
- Hỗ trợ nhiều file âm thanh
- Hỗ trợ TTS
- Trạng thái online/offline

### Đèn cảnh báo
- Điều khiển màu sắc
- Điều khiển nháy/chớp
- Điều khiển còi
- Mapping trạng thái sự cố

### Hệ thống
- OTA firmware
- Device management
- Event logging
- Health monitoring
- Remote configuration

---

## Non-functional Requirements
- Hoạt động ổn định 24/7
- Độ trễ thấp
- Bảo mật tốt
- Dễ mở rộng
- Dễ bảo trì
- Dễ sản xuất hàng loạt
- Chịu môi trường công nghiệp

---

# 7. Tích hợp hệ thống

## Hệ thống hỗ trợ tích hợp

### CCTV AI
- Phát hiện người
- PPE detection
- Intrusion detection
- Fire/smoke detection

### Fire Alarm System
- Modbus
- BACnet
- Polling software log
- Event capture

### SCADA/BMS
- Alarm integration
- Status monitoring
- Remote control

---

# 8. Phương án tích hợp hệ báo cháy

## Phương án 1
### Giao thức tiêu chuẩn
- Modbus
- BACnet

Ưu điểm:
- Ổn định
- Chuẩn công nghiệp
- Dễ bảo trì

---

## Phương án 2
### Polling log từ phần mềm FACP

Ưu điểm:
- Không cần can thiệp sâu hệ thống
- Tương thích nhiều hệ thống cũ

---

## Phương án 3
### Capture event / middleware

Ưu điểm:
- Linh hoạt
- Tùy biến cao
- Hỗ trợ hệ thống đặc thù

---

# 9. Quản lý phát triển sản phẩm

## Phương pháp quản lý
- Agile Scrum
- Sprint planning
- Product backlog
- Iterative development

## Mục tiêu quản lý
- Phát hiện lỗi sớm
- Tăng tốc độ phát triển
- Đảm bảo chất lượng pilot
- Tối ưu cho mass production

---

# 10. CI/CD và Automation Test

## Công cụ sử dụng
- GitHub
- Jenkins
- Docker
- PlatformIO

## Mục tiêu
- Build firmware tự động
- Unit test
- Integration test
- OTA validation
- MQTT testing
- Regression testing

## Kiểm thử chính
- Audio playback
- MQTT communication
- OTA update
- Power stability
- Network recovery
- Alarm response
- Device reboot recovery

---

# 11. Testcase cơ bản

## Nhóm kiểm thử chức năng

### Audio
- Phát âm thanh thành công
- Chuyển đổi file audio
- Điều chỉnh volume

### MQTT
- Subscribe topic
- Receive command
- Reconnect broker

### OTA
- Update firmware thành công
- Rollback khi lỗi

### Đèn cảnh báo
- Chuyển trạng thái màu
- Chớp đúng chế độ
- Đồng bộ loa + đèn

---

## Nhóm kiểm thử hệ thống
- Mất điện đột ngột
- Khởi động lại
- Mất mạng
- Recover sau lỗi
- Long-run test
- Nhiệt độ môi trường

---

# 12. Hướng phát triển sản phẩm

## Giai đoạn hiện tại
- Hoàn thiện pilot
- Test tích hợp
- Tối ưu firmware

## Giai đoạn tiếp theo
- Mass production
- Dashboard hoàn chỉnh
- Device provisioning
- AI integration
- Cloud analytics

---

# 13. Rủi ro chính

## Kỹ thuật
- Mất kết nối mạng
- OTA lỗi
- Nhiễu audio
- Tương thích hệ báo cháy

## Triển khai
- Hệ thống camera không đồng nhất
- Hạ tầng mạng yếu
- Thiết bị cũ không tương thích

## Sản xuất
- Nguồn cung linh kiện
- EMC/EMI
- Chất lượng loa

---

# 14. Định hướng tiêu chuẩn chất lượng

## Mục tiêu
- Industrial-grade reliability
- EMC compliance
- Safety compliance
- Stable long-term operation

## Thị trường mục tiêu
- Việt Nam
- Nhật Bản
- Nhà máy FDI

---

# 15. Định hướng thương mại

## Điểm mạnh sản phẩm
- Tích hợp Audio + Light
- MQTT/IoT native
- OTA ready
- Dễ tích hợp AI/CCTV
- Chi phí tối ưu
- Thiết kế linh hoạt ODM/OEM

## Mô hình kinh doanh
- ODM
- OEM
- SI integration
- Smart Factory solution

---

# 16. Gợi ý model và naming

## Một số model đề xuất
- MGAA-V1
- MGSP-V1
- MGAA-Pro
- MGAL-V1
- MGAudioLight-V1

## Ý nghĩa MGAA
- Meiko Gateway Audio Alert
- Meiko General Alarm Audio
- Meiko Industrial Audio Alert

---

# 17. Định hướng mở rộng tương lai

## Chức năng tương lai
- AI edge processing
- Local automation
- Voice announcement scheduling
- Multi-language TTS
- Mobile app control
- Cloud analytics
- Energy monitoring

## Hệ sinh thái mở rộng
- Smart Factory
- Smart Building
- Smart Safety
- AI Monitoring Platform

---

# 18. Tài liệu liên quan

## Tài liệu kỹ thuật
- Hardware schematic
- PCB design
- Firmware architecture
- MQTT topic design
- API specification
- OTA architecture

## Tài liệu quản lý
- Product backlog
- Sprint planning
- Test report
- Risk assessment
- Installation guideline

---

# 19. Tóm tắt ngắn gọn sản phẩm

## Tiếng Việt
Thiết bị Loa & Đèn Cảnh Báo IP công nghiệp sử dụng nền tảng IoT, hỗ trợ phát âm thanh, điều khiển đèn cảnh báo, kết nối MQTT/IP, tích hợp AI Camera và hệ thống báo cháy, phù hợp cho Smart Factory và hệ thống an toàn công nghiệp.

## English
Industrial IoT Audio & Light Alert Device supporting IP/MQTT communication, audio alarm playback, warning light control, AI CCTV integration, fire alarm integration, and centralized monitoring for smart factory and industrial safety applications.

