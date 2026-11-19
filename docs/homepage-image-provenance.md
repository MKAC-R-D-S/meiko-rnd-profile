# Homepage image provenance (index.html)

Derived web copies live in `assets/home/`. Originals are untouched. All derivatives were produced locally with PIL / .NET (resize, crop, JPEG re-encode); no generative tooling was used.

| Derived file | Source (unchanged) | Operation | What it is | Status |
|---|---|---|---|---|
| `assets/home/pcb-mgwi-v1.jpg` | `products/mgwi-v1/images/MGWI-V1_PCBA.png` | resize 960px, JPEG q80 | 3D model of the MGWI-V1 PCB design (layer label `P_MGWI-V1.1`) | Design-data render; captioned "Mô hình 3D PCB". Callout part names (LoRa, ESP32, Ethernet, USB-C) are read from the render itself. |
| `assets/home/mesi-v1.jpg` | `products/mesi-v1/images/MESI-V1.jpg` | resize 1200px, JPEG q82 | Photograph of MESI-V1 with three CT sensors | Real photograph (Meiko-marked hardware). Origin and date to be confirmed by the owner. |
| `assets/home/site-alert-tower.jpg` | `products/mgaw-v1/images/Real_Application_Images.jpg` | crop top 1011x800, resize 1000px | Wall-mounted speaker, signal tower and junction box on a plant wall | Real installation photo; device model not asserted. Site name to be confirmed. |
| `assets/home/site-gateway.jpg` | `products/mgwi-v1/images/Setup_in_factory.jpg` | crop 1280x960 at (520,330), resize 1000px | Meiko "IoT Gateway" mounted on a wall | Real installation photo; the yellow IP-address label on the device was blurred in this derivative (original untouched). Model not asserted; shown only as a generic installation photo. |
| `assets/home/tingbox.jpg` | `products/tingbox/images/tingboxpro_2.JPG` | resize 760px, JPEG q80 | Photograph of a TingBox unit (mPOS-branded; bank logos blurred in the source) | Real photograph. Third-party branding is present in the source. |
| `assets/home/bipap.jpg` | `products/bipap/images/BiPAP_01.jpg` | resize 760px, JPEG q80 | Photograph of the BiPAP device on a cart | Real photograph. |
| `assets/home/logo-meiko.png` | `assets/Logo_Meiko.png` | resize 860px | Meiko Automation logo | Brand asset. |
| (referenced in place) `products/tool-jig/images/tool_jig.webp` | itself | none | CAD model of a test fixture | CAD render; captioned "Mô hình CAD". Not presented as a photo of a built fixture. |

Deliberately NOT used:
- `products/mesi-v1/images/exploded-view_3D_render_of_the_MESI-V1_device.png`: AI-style render that contains invented specifications and an enclosure that differs from the real photograph.
- `products/mtsi-v1/images/MTSI-V1_1.jpg`: the device cannot be identified as the product.
- IOTPLC-A02 images: the datasheet is an internal draft not yet released.
- All `Industrial_IoT*`, `Realistic_*`, `premium_*` files: generated imagery.

## v2 (Advanced Engineering Showcase) derivatives

| Derived file | Source (unchanged) | Operation | Status |
|---|---|---|---|
| `assets/home/pcb-board.jpg` | `products/mgwi-v1/images/MGWI-V1_PCBA.png` | crop to the board area (132,255)-(2398,3688) to drop the viewer background, resize 1100px | Design-data render, labelled "Mô hình 3D". Shown in CSS 3D perspective. |
| `assets/home/mesi-studio.jpg` | `products/mesi-v1/images/MESI-V1.jpg` | per-channel white balance so the backdrop reads #ecebe8, resize 1400px | Real photograph; colour balance only, device untouched. |
| `assets/home/jig-studio.jpg` | `products/tool-jig/images/tool_jig.jpg` | backdrop white balance, 985px | CAD model, labelled "Mô hình CAD". |
| `assets/home/tingbox-studio.jpg` | `products/tingbox/images/tingboxpro_2.JPG` | white balance, resize 900px | Real photograph (mPOS-branded unit). |
| `assets/home/bipap-studio.jpg` | `products/bipap/images/BiPAP_01.jpg` | white balance, resize 900px | Real photograph. |

The MGAW-V1 and MTSI-V1 tiles use abstract SVG compositions (sound rings with three light bars; a heat field), labelled "Hình minh họa · chưa có ảnh". They do not depict a device shape.

| `assets/home/tingbox-body.jpg` | `products/tingbox/images/tingboxpro_2.JPG` (via tingbox-studio) | white balance, crop rows 11.8%–57.5% to keep the device face and drop partner logos (mPOS, card schemes) | Real photograph; owner chose cropping over showing partner branding (2026-11-19). |

Owner confirmation (2026-11-19): the 'IoT Energy' unit photo is MESI-V1; both installation photos are Meiko's and approved for publication.
