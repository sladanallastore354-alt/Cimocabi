// =============================================
// CART.JS - Logika Keranjang & Checkout
// =============================================

let cart = JSON.parse(localStorage.getItem('cimocabi_cart')) || [];
const waAdminNumber = "6281326916315"; // Nomor admin checkout

// Fungsi untuk membuka/menutup panel keranjang
function toggleCart() {
    const overlay = document.getElementById('cart-overlay');
    if (!overlay) return;

    if (overlay.classList.contains('overlay-hidden')) {
        overlay.classList.remove('overlay-hidden');
        overlay.style.display = 'block';
        updateCartUI(); // Segarkan tampilan saat keranjang dibuka
    } else {
        overlay.classList.add('overlay-hidden');
        overlay.style.display = 'none';
    }
}

// Menyimpan data keranjang ke penyimpanan lokal browser (Local Storage)
function saveCart() {
    localStorage.setItem('cimocabi_cart', JSON.stringify(cart));

    // Update angka badge merah di ikon keranjang header
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    }
}

// Fungsi mengubah jumlah barang (+ atau -) berdasarkan Index
function updateQty(index, change) {
    if (index < 0 || index >= cart.length) return;

    cart[index].qty += change;
    
    // Jika jumlah jadi 0 atau kurang, hapus barang dari keranjang
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    updateCartUI();
}

// Fungsi khusus untuk menghapus barang sepenuhnya
function removeCartItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

// Memperbarui tampilan isi keranjang belanja
function updateCartUI() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('total-price');

    if (!container) return;
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; margin-top:20px; color:#999;">Keranjang masih kosong 🛒</p>';
        if (totalEl) totalEl.innerText = 'Rp 0';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        let subtotal = item.price * item.qty;
        total += subtotal;

        // PENTING: Sinkronisasi dengan class di style.css agar rapi
        container.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <p class="cart-item-title">${item.name}</p>
                    <p class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="updateQty(${index}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="updateQty(${index}, 1)">+</button>
                    <button onclick="removeCartItem(${index})" style="background: #ff4757; color: white; width: auto; padding: 4px 8px; border-radius: 4px; font-size: 11px;">Hapus</button>
                </div>
            </div>
        `;
    });

    if (totalEl) totalEl.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

// Fungsi untuk proses checkout pesanan ke WhatsApp
function checkoutWA() {
    if (cart.length === 0) {
        if(typeof showCustomAlert === 'function') {
            showCustomAlert("Ops! Tambahkan barang dulu ke keranjang sebelum checkout.");
        } else {
            alert("Ops! Tambahkan barang dulu ke keranjang sebelum checkout.");
        }
        return;
    }

    const nama = document.getElementById('buyer-name').value.trim();
    const alamat = document.getElementById('buyer-address').value.trim();
    const telp = document.getElementById('buyer-phone').value.trim();
    const notes = document.getElementById('buyer-note').value.trim();

    if (!nama || !alamat || !telp) {
        if(typeof showCustomAlert === 'function') {
            showCustomAlert("Mohon lengkapi Nama, Alamat, dan No. Telepon / WA pengiriman!");
        } else {
            alert("Mohon lengkapi Nama, Alamat, dan No. Telepon / WA pengiriman!");
        }
        return;
    }

    // PENTING: Perbaikan Sintaks Template Literal pada perulangan pesanan
    let pesananTeks = cart.map((item, index) => 
        `${index + 1}. ${item.name} (${item.qty}x) - Rp ${(item.price * item.qty).toLocaleString('id-ID')}`
    ).join("%0A");

    let totalHarga = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Format pesan untuk WhatsApp
    let pesanWA = `Halo Admin CIMOCABI, saya mau pesan:%0A%0A${pesananTeks}%0A%0A*Total Pesanan: Rp ${totalHarga.toLocaleString('id-ID')}*%0A%0A*Data Pengiriman:*%0ANama: ${nama}%0AAlamat: ${alamat}%0ANo WA: ${telp}%0ACatatan: ${notes || '-'}%0A%0AMohon info total tagihan beserta ongkos kirimnya ya. Terima kasih!`;

    // PENTING: Perbaikan Sintaks Template Literal pada window.open
    window.open(`https://wa.me/${waAdminNumber}?text=${pesanWA}`, '_blank');

    // Update jumlah terjual ke server / Google Sheets (jika sold.js aktif)
    if (typeof updateSoldCount === 'function') {
        cart.forEach(item => {
            updateSoldCount(item.id, item.qty);
        });
    }

    // Reset keranjang setelah selesai dilempar ke WA
    cart = [];
    saveCart();
    
    // Tutup tampilan form keranjang
    toggleCart();
    
    // Bersihkan form input
    document.getElementById('buyer-name').value = '';
    document.getElementById('buyer-address').value = '';
    document.getElementById('buyer-phone').value = '';
    document.getElementById('buyer-note').value = '';
}

// Inisialisasi awal saat website pertama kali dibuka
document.addEventListener("DOMContentLoaded", () => {
    saveCart(); // Pastikan badge keranjang menampilkan jumlah yang benar
});
