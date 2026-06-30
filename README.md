# CIMOCABI - Cireng & Cimol Special

Website e-commerce sederhana untuk produk Cireng & Cimol Depok.

## Fitur
- Tampilan responsif dengan tema purple
- Keranjang belanja
- Checkout via WhatsApp
- Admin panel sederhana
- Integrasi Google Sheets sebagai database
- Validasi stok & ID produk

## Struktur Folder

/cimocabi/
├── index.html                 # Landing Page / Home
├── menu.html                  # Halaman Menu & Produk
├── product-detail.html        # Detail Produk (modal atau page terpisah)
├── cart.html                  # Keranjang
├── checkout.html              # Checkout
├── admin/
│   ├── login.html
│   ├── dashboard.html         # Admin Dashboard
│   ├── products.html          # Kelola Produk
│   ├── orders.html            # Kelola Pesanan
│   ├── discounts.html         # Diskon & Promo
│   └── stock.html             # Stok Management
├── assets/
│   ├── css/
│   │   ├── style.css          # Global styles
│   │   ├── admin.css
│   │   └── components.css
│   ├── js/
│   │   ├── main.js            # Config global, utils
│   │   ├── api.js             # Semua fungsi Google Sheets + fetch
│   │   ├── cart.js
│   │   ├── products.js
│   │   └── admin.js
│   ├── images/                # logo, produk, dll
│   └── icons/
├── data/                      # (opsional untuk static fallback)
│   └── products.json
├── .github/workflows/         # CI/CD (opsional)
├── README.md
├── LICENSE
└── CNAME                      # Untuk custom domain

## Cara Deploy
1. Upload ke GitHub
2. Aktifkan GitHub Pages
3. Deploy Google Apps Script sebagai Web App
4. Masukkan Web App URL ke `assets/js/api.js`

## Password Admin
`admin123`

## Kontak
WhatsApp Admin: +62 899-1183-100

---
Dibuat dengan ❤️ menggunakan HTML, CSS, JS + Google Sheets