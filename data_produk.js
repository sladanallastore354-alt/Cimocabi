// Database Produk CIMOCABI
const produkCimocabi = [
    {
        id: 1, name: "PAKET HEMAT (Cireng + Cimol)", price: 23000, originalPrice: 27000,
        category: ["tersedia", "bundling"], jenis: ["food", "frozen"],
        options: { kondisi: ["Frozen", "Matang"] },
        desc: "Hampers ngemil asik! 1 bungkus cireng ayam pedas + 1 bungkus cimol Crunchy maknyus. Sensasi pedas dan gurih yang meledak di mulut!",
        images: ["images/paket_hemat.jpg", "images/comingsoon.jpg"],
        stock: 100, rating: 5, sold: 30, location: "Depok,Jawa Barat,Indonesia", status: "tersedia"
    },
    {
        id: 2, name: "PAKET KELUARGA (Cireng + Cimol)", price: 46000, originalPrice: 54000,
        category: ["tersedia", "bundling"], jenis: ["food", "frozen"],
        options: { kondisi: ["Frozen", "Matang"] },
        desc: "Ngemil bareng keluarga makin seru! 2 bungkus cireng ayam pedas + 2 bungkus cimol Crunchy. Porsi pas, dijamin semua anggota keluarga kebagian.",
        images: ["images/paket_keluarga.jpg", "images/comingsoon.jpg"],
        stock: 100, rating: 4.9, sold: 30, location: "Depok,Jawa Barat,Indonesia", status: "tersedia"
    },
    {
        id: 3, name: "PAKET ARISAN (Cireng + Cimol)", price: 115000, originalPrice: 125000,
        category: ["tersedia", "bundling"], jenis: ["food", "frozen"],
        options: { kondisi: ["Frozen", "Matang"] },
        desc: "Suguhan andalan ibu-ibu! 5 bungkus cireng ayam pedas + 5 bungkus cimol Crunchy. Bikin acara kumpul arisan atau pengajian makin hangat.",
        images: ["images/paket_arisan.jpg", "images/comingsoon.jpg"],
        stock: 100, rating: 4.8, sold: 30, location: "Depok,Jawa Barat,Indonesia", status: "tersedia"
    },
    {
        id: 4, name: "PAKET LAPAR", price: 145000, originalPrice: 150000,
        category: ["tersedia", "bundling"], jenis: ["food"],
        options: { kondisi: ["Frozen", "Matang"] },
        desc: "Puas maksimal! 6 bungkus cireng ayam pedas + 6 bungkus cimol Crunchy. Senjata utama untuk menaklukkan perut keroncongan.",
        images: ["images/paket_lapar.jpg", "images/comingsoon.jpg"],
        stock: 100, rating: 4.9, sold: 30, location: "Depok,Jawa Barat,Indonesia", status: "tersedia"
    },
    {
        id: 5, name: "Cireng isi Ayam / Cireng isi Keju", price: 10000, originalPrice: 12000,
        category: ["tersedia"], jenis: ["camilan", "frozen"],
        options: { kondisi: ["Frozen", "Matang"], varian: ["Ayam Pedas", "Keju"] },
        desc: "1 bungkus cireng isi 4pcs. Tekstur kulit luar yang super krispi berpadu dengan isian lumer. Awas nagih!",
        images: ["images/cireng_isi_ayam.jpg", "images/cireng_isi_keju.jpg"],
        stock: 100, rating: 4.9, sold: 30, location: "Depok,Jawa Barat,Indonesia", status: "tersedia"
    },
    {
        id: 6, name: "Cimol Keju", price: 15000, originalPrice: 17000,
        category: ["tersedia"], jenis: ["camilan", "frozen"],
        options: { kondisi: ["Frozen", "Matang"] },
        desc: "1 bungkus cimol Crunchy maknyus berisi 25 butir. Chewy di luar, kenyal di dalam, dengan isian keju yang pecah di mulut!",
        images: ["images/cimol_isi_keju.jpg", "images/cimol_keju.jpg"],
        stock: 100, rating: 4.9, sold: 30, location: "Depok,Jawa Barat,Indonesia", status: "tersedia"
    },
    {
        id: 7, name: "Dimsum Original", price: 0, originalPrice: 0,
        category: ["comingsoon"], jenis: ["camilan", "food"],
        options: { saus: ["Chilli Oil", "Saus Sambal + Mayonaise"], jumlah: ["4 pcs", "6 pcs", "8 pcs"] },
        desc: "Perpaduan daging pilihan dan tepung premium racikan rahasia bumbu tradisional. Lembut dan juicy!",
        images: ["images/dimsum_ayam.jpg"],
        stock: 0, rating: 0, sold: 0, location: "Depok,Jawa Barat,Indonesia", status: "comingsoon"
    },
    {
        id: 8, name: "Dimsum Mentai", price: 0, originalPrice: 0,
        category: ["comingsoon"], jenis: ["camilan", "food"],
        options: { saus: ["Chilli Oil", "Saus Sambal + Mayonaise"], jumlah: ["4 pcs", "6 pcs", "8 pcs"] },
        desc: "Sensasi dimsum premium yang dibakar dengan saus mentai gurih lumer. Cita rasa modern berpadu resep tradisional.",
        images: ["images/dimsum_mentai.jpg"],
        stock: 0, rating: 0, sold: 0, location: "Depok,Jawa Barat,Indonesia", status: "comingsoon"
    },
    {
        id: 9, name: "Keju Aroma", price: 0, originalPrice: 0,
        category: ["comingsoon"], jenis: ["camilan", "food"],
        options: { jumlah: ["4 pcs", "6 pcs", "8 pcs"] },
        desc: "Stik keju manis gurih! Potongan keju premium yang dibalut kulit lumpia super Crunchy. Cocok untuk teman ngopi.",
        images: ["images/kwju_aroma.jpg"],
        stock: 0, rating: 0, sold: 0, location: "Depok,Jawa Barat,Indonesia", status: "comingsoon"
    },
    {
        id: 10, name: "Cooler Bag", price: 5000, originalPrice: 6000,
        category: ["Add-on"], jenis: ["none"],
        options: {},
        desc: "Tas pendingin andalan! Mengamankan paket frozen food agar tetap dingin, beku, dan awet selama perjalanan jauh.",
        images: ["images/cooler_bag.jpg"],
        stock: 50, rating: 4.9, sold: 12, location: "Depok,Jawa Barat,Indonesia", status: "tersedia"
    },
    {
        id: 11, name: "Bubble Wrap Extra", price: 2000, originalPrice: 3000,
        category: ["Add-on"], jenis: ["none"],
        options: {},
        desc: "Perlindungan maksimal! Paket jauh tetap aman, anti remuk, dengan lapisan bubble wrap tambahan.",
        images: ["images/bubble_wrap.jpg"],
        stock: 10, rating: 5, sold: 6, location: "Depok,Jawa Barat,Indonesia", status: "tersedia"
    },
    {
        id: 12, name: "Mie Ayam", price: 0, originalPrice: 0,
        category: ["comingsoon"], jenis: ["camilan", "food"],
        options: { saus: ["Chilli Oil", "Saus Sambal"] },
        desc: "Sensasi mie ayam kenyal dengan ayam gurih manis ditambah saus sambal pedas. Resep tradisional tak terlupakan.",
        images: ["images/mie_ayam.jpg"],
        stock: 0, rating: 0, sold: 0, location: "Depok,Jawa Barat,Indonesia", status: "comingsoon"
    }
];

function renderProducts(filter = 'semua') {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';

    produkCimocabi.forEach(produk => {
        let isMatch = filter === 'semua' || 
                      produk.category.some(c => c.toLowerCase().includes(filter.toLowerCase())) || 
                      produk.jenis.some(j => j.toLowerCase().includes(filter.toLowerCase())) ||
                      produk.name.toLowerCase().includes(filter.toLowerCase());
        
        if (!isMatch) return;

        let diskonBadge = (produk.originalPrice > produk.price && produk.price > 0) 
            ? `<div class="badge-diskon">-${Math.round(((produk.originalPrice - produk.price) / produk.originalPrice) * 100)}%</div>` : '';
        let larisBadge = produk.sold >= 30 ? `<div class="badge-laris">Paling Laris 🔥</div>` : '';
        let imagesHTML = produk.images.map((img, i) => `<img src="${img}" class="${i === 0 ? 'active' : ''}" onerror="this.src='https://via.placeholder.com/150'">`).join('');

        let isComingSoon = produk.status === 'comingsoon' || produk.stock === 0;
        let formatHarga = produk.price > 0 ? `Rp ${produk.price.toLocaleString('id-ID')}` : 'Belum Rilis';
        let formatCoret = produk.originalPrice > 0 && produk.price > 0 ? `Rp ${produk.originalPrice.toLocaleString('id-ID')}` : '';

        let varianHTML = '';
        if (Object.keys(produk.options).length > 0 && !isComingSoon) {
            varianHTML += `<div class="varian-container">`;
            for (const [key, values] of Object.entries(produk.options)) {
                varianHTML += `<select class="select-varian" id="var-${produk.id}-${key}">
                    <option value="" disabled selected>Pilih ${key}</option>
                    ${values.map(val => `<option value="${val}">${val}</option>`).join('')}
                </select>`;
            }
            varianHTML += `</div>`;
        }

        let btnAction = isComingSoon 
            ? `<button class="btn-add btn-disabled" onclick="alertComingSoon()">Segera Hadir</button>` 
            : `<button class="btn-add" onclick="validateAndAddToCart(${produk.id})">🛒 Masukkan Keranjang</button>`;

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            ${larisBadge}
            ${diskonBadge}
            <div class="img-slider" id="slider-${produk.id}" onclick="nextImage(${produk.id})">
                ${imagesHTML}
            </div>
            <div class="product-info">
                <div class="product-title">${produk.name}</div>
                <div class="product-price">${formatHarga} <span class="product-price-coret">${formatCoret}</span></div>
                <div style="font-size: 11px; margin-top: 5px; color: #7f8c8d; line-height: 1.4;">${produk.desc}</div>
                ${varianHTML}
                <div class="product-meta">
                    <span>${"⭐".repeat(Math.round(produk.rating))} ${produk.rating} | Terjual ${produk.sold}</span>
                    <span>📍 ${produk.location}</span>
                </div>
                ${btnAction}
            </div>
        `;
        grid.appendChild(card);
    });
}

function searchProduct() {
    let input = document.getElementById('searchInput').value;
    renderProducts(input);
}

function filterCategory(cat) {
    document.querySelectorAll('.category-buttons button').forEach(btn => btn.classList.remove('active'));
    if (window.event && window.event.target) window.event.target.classList.add('active');
    renderProducts(cat);
}

function alertComingSoon() {
    alert("Produk ini belum dirilis! Stay tune di sosmed CIMOCABI ya!");
}

function nextImage(productId) {
    const slider = document.getElementById(`slider-${productId}`);
    if (!slider) return;
    const images = slider.querySelectorAll('img');
    if(images.length <= 1) return;
    let activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    images[activeIndex].classList.remove('active');
    let nextIndex = (activeIndex + 1) % images.length;
    images[nextIndex].classList.add('active');
}

function validateAndAddToCart(id) {
    const product = produkCimocabi.find(p => p.id === id);
    let selectedVariants = [];
    let isVariantMissing = false;

    if (Object.keys(product.options).length > 0) {
        for (const key of Object.keys(product.options)) {
            let selectElement = document.getElementById(`var-${id}-${key}`);
            if (selectElement && selectElement.value === "") {
                isVariantMissing = true;
                break;
            } else if (selectElement) {
                selectedVariants.push(selectElement.value);
            }
        }
    }

    if (isVariantMissing) {
        alert("Mohon pilih varian produk terlebih dahulu.");
        return;
    }

    let finalName = product.name + (selectedVariants.length > 0 ? ` (${selectedVariants.join(', ')})` : "");
    
    if (typeof cart !== 'undefined') {
        const existing = cart.find(item => item.name === finalName);
        if (existing) existing.qty++;
        else cart.push({ id: product.id, name: finalName, price: product.price, qty: 1 });
        saveCart();
        alert(`${finalName} berhasil ditambahkan!`);
    } else {
        alert("File cart.js belum terload.");
    }
}

document.addEventListener("DOMContentLoaded", () => renderProducts('semua'));
