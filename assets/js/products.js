// assets/js/products.js
import { updateCartCount } from './main.js';

// ==================== DATA PRODUK ====================
const productsData = [
    {
        id: 1, name: "PAKET HEMAT (Cireng + Cimol)", price: 23000, originalPrice: 27000,
        category: ["tersedia", "bundling"], status: "tersedia",
        desc: "Hampers ngemil asik! 1 bungkus cireng ayam pedas + 1 bungkus cimol Crunchy maknyus.",
        images: ["images/paket_hemat.jpg"], stock: 100, rating: 5, sold: 30,
        highlight: "Paling Laris! ✅"
    },
    {
        id: 2, name: "PAKET KELUARGA (Cireng + Cimol)", price: 46000, originalPrice: 54000,
        category: ["tersedia", "bundling"], status: "tersedia",
        desc: "Ngemil bareng keluarga makin seru! 2 bungkus cireng + 2 bungkus cimol.",
        images: ["images/paket_keluarga.jpg"], stock: 100, rating: 4.9, sold: 30,
        highlight: "Rekomendasi Keluarga ❤️"
    },
    {
        id: 3, name: "PAKET ARISAN (Cireng + Cimol)", price: 115000, originalPrice: 125000,
        category: ["tersedia", "bundling"], status: "tersedia",
        desc: "Suguhan andalan untuk arisan & pengajian! 5 bungkus cireng + 5 bungkus cimol.",
        images: ["images/paket_arisan.jpg"], stock: 100, rating: 4.8, sold: 30,
        highlight: "Cocok Arisan & Hajatan"
    },
    {
        id: 4, name: "PAKET LAPAR", price: 145000, originalPrice: 150000,
        category: ["tersedia", "bundling"], status: "tersedia",
        desc: "Puas maksimal! 6 bungkus cireng ayam pedas + 6 bungkus cimol Crunchy.",
        images: ["images/paket_lapar.jpg"], stock: 100, rating: 4.9, sold: 30,
        highlight: "Super Besar & Hemat"
    },
    {
        id: 5, name: "Cireng Isi Ayam / Keju", price: 10000, originalPrice: 12000,
        category: ["tersedia"], status: "tersedia",
        desc: "1 bungkus (4 pcs). Krispi di luar, lumer di dalam. Pilih Ayam Pedas atau Keju.",
        images: ["images/cireng_isi_ayam.jpg"], stock: 100, rating: 4.9, sold: 30,
        highlight: "Best Seller"
    },
    {
        id: 6, name: "Cimol Keju", price: 15000, originalPrice: 17000,
        category: ["tersedia"], status: "tersedia",
        desc: "25 butir cimol crunchy dengan isian keju meleleh. Chewy di luar, kenyal di dalam!",
        images: ["images/cimol_keju.jpg"], stock: 100, rating: 4.9, sold: 30,
        highlight: "Viral & Nagih Banget"
    },
    // Coming Soon
    { id: 7, name: "Dimsum Original", price: 0, originalPrice: 0, category: ["comingsoon"], status: "comingsoon",
      desc: "Dimsum klasik dengan isian premium yang lembut dan juicy.", images: ["images/dimsum_ayam.jpg"], stock: 0, rating: 0, sold: 0, highlight: "Segera Hadir 🔥" },
    { id: 8, name: "Dimsum Mentai", price: 0, originalPrice: 0, category: ["comingsoon"], status: "comingsoon",
      desc: "Dimsum premium dengan saus mentai gurih lumer.", images: ["images/dimsum_mentai.jpg"], stock: 0, rating: 0, sold: 0, highlight: "Segera Hadir 🔥" },
    { id: 9, name: "Keju Aroma", price: 0, originalPrice: 0, category: ["comingsoon"], status: "comingsoon",
      desc: "Stik keju gurih dibalut kulit lumpia super crunchy.", images: ["images/keju_aroma.jpg"], stock: 0, rating: 0, sold: 0, highlight: "Segera Hadir 🔥" },
    { id: 12, name: "Mie Ayam", price: 0, originalPrice: 0, category: ["comingsoon"], status: "comingsoon",
      desc: "Mie ayam kenyal dengan topping ayam manis dan sambal pedas.", images: ["images/mie_ayam.jpg"], stock: 0, rating: 0, sold: 0, highlight: "Segera Hadir 🔥" },
    // Add-on
    {
        id: 10, name: "Cooler Bag", price: 5000, originalPrice: 6000,
        category: ["Add-on"], status: "tersedia",
        desc: "Tas pendingin untuk menjaga makanan frozen tetap dingin.", 
        images: ["images/cooler_bag.jpg"], stock: 50, rating: 4.9, sold: 12, highlight: "Add-on Wajib"
    },
    {
        id: 11, name: "Bubble Wrap Extra", price: 2000, originalPrice: 3000,
        category: ["Add-on"], status: "tersedia",
        desc: "Perlindungan ekstra agar paket tidak rusak saat pengiriman.", 
        images: ["images/bubble_wrap.jpg"], stock: 100, rating: 5, sold: 6, highlight: "Add-on Wajib"
    }
];

// ==================== RENDER PRODUK ====================
export function renderProducts(containerId = 'product-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const sortedProducts = [...productsData].sort((a, b) => {
        const aComing = a.status === 'comingsoon' || a.price === 0;
        const bComing = b.status === 'comingsoon' || b.price === 0;
        if (aComing && !bComing) return 1;
        if (!aComing && bComing) return -1;
        return 0;
    });

    sortedProducts.forEach(product => {
        const isComingSoon = product.status === 'comingsoon' || product.price === 0;
        const discount = product.originalPrice > product.price 
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        const card = `
            <div class="product-card">
                <div class="product-image">
                    <img src="\( {product.images[0]}" alt=" \){product.name}" 
                         onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}'">
                    \( {discount > 0 ? `<div class="discount-badge">- \){discount}%</div>` : ''}
                    \( {product.highlight ? `<div class="highlight"> \){product.highlight}</div>` : ''}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="desc">${product.desc}</p>
                    
                    <div class="price">
                        ${product.price > 0 
                            ? `<span class="current">Rp ${product.price.toLocaleString('id-ID')}</span>` 
                            : `<span class="coming-soon-price">Segera Hadir</span>`
                        }
                        ${product.originalPrice > product.price ? 
                            `<span class="original">Rp ${product.originalPrice.toLocaleString('id-ID')}</span>` : ''}
                    </div>

                    <div class="rating">⭐ ${product.rating} • Terjual ${product.sold}</div>

                    ${isComingSoon 
                        ? `<button class="btn-soon" disabled>Segera Hadir</button>` 
                        : `<button onclick="addToCart(${product.id})" class="btn-primary">Tambah ke Keranjang</button>`
                    }
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// ==================== ADD TO CART ====================
window.addToCart = function(id) {
    const product = productsData.find(p => p.id === id);
    if (!product || product.price === 0 || product.status === 'comingsoon') {
        alert("Maaf, produk ini belum tersedia.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === id);

    if (existing) existing.quantity = (existing.quantity || 1) + 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`✅ ${product.name} ditambahkan ke keranjang!`);
    updateCartCount();
};

export { productsData };