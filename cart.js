// ====================== CART.JS ======================
let cart = JSON.parse(localStorage.getItem('cimocabi_cart')) || [];
const waAdminNumber = "6281326916315"; // Nomor admin checkout

function toggleCart() {
    const overlay = document.getElementById('cart-overlay');
    if (!overlay) return;

    if (overlay.classList.contains('overlay-hidden')) {
        overlay.classList.remove('overlay-hidden');
        overlay.style.display = 'block';
        updateCartUI();
    } else {
        overlay.classList.add('overlay-hidden');
        overlay.style.display = 'none';
    }
}

function addToCart(id) {
    const product = produkCimocabi.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    alert(`${product.name} berhasil ditambahkan ke keranjang!`);
}

function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += change;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }

    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('cimocabi_cart', JSON.stringify(cart));

    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    }
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('total-price');

    if (!container) return;

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; margin-top:20px; color:#999;">Keranjang masih kosong</p>';
        if (totalEl) totalEl.innerText = 'Rp 0';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        let subtotal = item.price * item.qty;
        total += subtotal;

        container.innerHTML += `
            <div class="cart-item">
                <div style="flex:1;">
                    <p style="font-weight:bold; font-size:14px;">${item.name}</p>
                    <p style="color:#e67e22; font-size:13px;">Rp ${item.price.toLocaleString('id-ID')}</p>
                </div>
                <div class="cart-controls">
                    <button onclick="updateQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="updateQty(${item.id}, 1)">+</button>
                    <button onclick="updateQty(${item.id}, -item.qty)" style="color:red; font-size:12px;">Hapus</button>
                </div>
            </div>
        `;
    });

    if (totalEl) totalEl.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

function checkoutWA() {
    if (cart.length === 0) {
        alert("Ops! Tambahkan barang dulu ke keranjang sebelum checkout.");
        return;
    }

    const nama = document.getElementById('buyer-name').value.trim();
    const alamat = document.getElementById('buyer-address').value.trim();
    const telp = document.getElementById('buyer-phone').value.trim();
    const notes = document.getElementById('buyer-note').value.trim();

    if (!nama || !alamat || !telp) {
        alert("Mohon lengkapi Nama, Alamat, dan No. Telepon!");
        return;
    }

    let pesananTeks = cart.map((item, index) => 
        `${index + 1}. \( {item.name} ( \){item.qty}x) - Rp ${(item.price * item.qty).toLocaleString('id-ID')}`
    ).join("%0A");

    let totalHarga = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    let pesanWA = `Halo Admin CIMOCABI, saya mau pesan:%0A%0A${pesananTeks}%0A%0A*Total: Rp ${totalHarga.toLocaleString('id-ID')}*%0A%0A*Data Pengiriman:*%0ANama: ${nama}%0AAlamat: ${alamat}%0ANo WA: ${telp}%0ACatatan: ${notes || '-'}%0A%0AMohon info total tagihan beserta ongkirnya ya. Terima kasih!`;

    // Buka WhatsApp dengan pesan lengkap
    window.open(`https://wa.me/\( {waAdminNumber}?text= \){pesanWA}`, '_blank');

    // Update jumlah terjual (jika sold.js sudah ada)
    if (typeof updateSoldCount === 'function') {
        cart.forEach(item => {
            updateSoldCount(item.id, item.qty);
        });
    }

    // Reset keranjang
    cart = [];
    saveCart();
    toggleCart();
}

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
    saveCart();
});