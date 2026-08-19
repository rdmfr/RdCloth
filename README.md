# 🏛️ RdCloth — WEAR YOUR IDEA.
> **Modern Heavyweight Streetwear & Custom Apparel Studio infused with Neoclassical Stoic Philosophy.**
> *"ΓΝΩΘΙ ΣΕΑΥΤΟΝ — Know Thyself."*

---

## 📖 Overview

**RdCloth** is a premium modern apparel web application designed for an independent streetwear brand and custom garment workshop based in Bandung, Indonesia. Built around the ethos of *quiet strength, architectural heavyweight cotton, and personal expression*, the web application blends brutalist streetwear UI with timeless **Ancient Greek Neoclassical aesthetics**.

---

## ✨ Features & Highlights

### 🏛️ Neoclassical Greek Aesthetic Theme
- **The Thinker Statue Backdrop**: High-contrast, moody Hero background featuring a classical Greek marble philosopher statue with dark vignette gradients.
- **Monumental Serif Typography**: Google Fonts integration featuring `Cinzel` for classical headings & badges and `Cormorant Garamond` for Greek mottos (*Γνῶθι σεαυτόν*).
- **Greek Key / Meander Patterns**: Geometric Meandros borders, ticker separators, and antique gold (`#C5A059`) trim accents.
- **Neoclassical Dark Marble**: Luxury dark marble stone styling for statement banners and footer.

### 👕 Modern E-Commerce Storefront
- **Heavyweight Product Catalog**: Boxy graphic tees, 235 GSM 16s blanks, hoodies, oversized cuts, and accessories.
- **Interactive Product Modal & Quick Add**: Size selection (S - XXL), color swatches, stock availability, and image angle switcher.
- **Wishlist & Cart Drawer**: Slide-out cart drawer with instant subtotal and free shipping progress bar.

### 🎨 Custom Order Studio
- **Custom Print Builder**: Choose apparel type (Heavyweight Tee, Oversized, Hoodie, Tote, Cap), placement (Chest, Back, Pocket), and print technique (DTF, Plastisol, Embroidery).
- **Instant Price Estimator**: Real-time quantity tier price calculation.
- **Artwork Upload & WA Integration**: Upload custom PNG/PDF artwork files with direct admin WhatsApp quote sync.

### 🚚 Real-Time Order Tracking
- **Order Lookup**: Search orders by invoice code (e.g. `RDC-89214`).
- **Interactive Timeline**: Live status updates from `Pending` -> `Paid` -> `Processing` -> `QC` -> `Shipped` with courier resi numbers.

### ⚙️ Admin CMS & Operations Dashboard
- **Product & Inventory Management**: Add, edit, or archive products and variant stock.
- **CMS Control**: Live editor for homepage hero taglines, marquee ticker text, and brand manifesto statements.
- **Custom Order Pipeline**: Review incoming custom quotes, approve/reject orders, and update production stages.

---

## 📝 Recent Change History

| Date | Component / Module | Description of Changes |
| :--- | :--- | :--- |
| **2026-08-19** | **Neoclassical Greek Theme** | Added classical thinker statue background (`/thinker-bg.png`), `Cinzel` & `Cormorant Garamond` Google Fonts, meander borders, and antique gold accents. |
| **2026-08-19** | **Header & Footer** | Updated Header with Roman numeral badge (`MMXXIV`) and Greek motto. Redesigned Footer with dark marble backdrop and watermarked *ΓΝΩΘΙ ΣΕΑΥΤΟΝ*. |
| **2026-08-19** | **HomeView & AboutView** | Transformed Hero section and Brand Manifesto into a Neoclassical Stoic campaign featuring *The Thinker* visual workshop banner. |
| **2026-08-19** | **Product Card** | Enhanced card hover states with antique gold border highlight (`#C5A059`) and Neoclassical badge badges. |

---

## 🗺️ Future Roadmap: Path to Web Perfection

### 🔹 Phase 1: 3D Interactive Canvas & Studio Mockup (High Priority)
- [ ] **WebGL / Three.js 3D T-Shirt Viewer**: Allow users to rotate a 3D model of the heavyweight tee in real time.
- [ ] **Drag-and-Drop Texture Mapping**: Drag uploaded artwork onto front/back 3D mesh with realistic fabric folds and bump mapping.
- [ ] **AR Try-On Preview**: Mobile Augmented Reality preview of custom clothing.

### 🔹 Phase 2: Payment Gateway & Automated Notifications
- [ ] **Midtrans / Xendit QRIS Integration**: Seamless checkout with instant payment verification via Webhooks.
- [ ] **WhatsApp Automated Bot (Fonnte/Waba)**: Automatic WhatsApp receipt, invoice PDF generator, and resi shipping notifications.
- [ ] **Voucher & Discount Engine**: Promotional codes (e.g. `STOIC10` for 10% off).

### 🔹 Phase 3: Customer Portal & Loyalty Program
- [ ] **User Accounts (JWT / Supabase Auth)**: Saved shipping addresses, wishlist sync across devices, and order history.
- [ ] **Philosopher's VIP Club**: Tiered loyalty system (Stoic Novice -> Olympian Scholar) with points earned per purchase.

### 🔹 Phase 4: Multi-Currency & International Shipping
- [ ] **Currency Converter**: Dynamic IDR / USD currency toggle based on IP location.
- [ ] **International Shipping API**: Integration with RajaOngkir, DHL, and FedEx API for real-time worldwide shipping rate calculation.

### 🔹 Phase 5: PWA & Performance Perfection
- [ ] **Progressive Web App (PWA)**: Installable app on iOS/Android with offline caching.
- [ ] **Web Push Notifications**: Alert VIP members on limited small-batch drop releases.
- [ ] **Image Optimization**: WebP/AVIF automatic image transformation via Cloudinary or ImageKit.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, TailwindCSS v4, Motion (Framer Motion)
- **Icons**: Lucide React
- **Typography**: Syne, Plus Jakarta Sans, Space Grotesk, Cinzel, Cormorant Garamond
- **Bundler**: Vite
- **Server**: Express (Node.js)

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rdmfr/RdCloth.git
   cd RdCloth
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run dev server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---
*© 2026 RdCloth Apparel Studio. Wear Your Idea.*
