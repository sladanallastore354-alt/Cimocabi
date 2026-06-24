// cart.js

const CART_KEY = 'cimocabi_cart_data';

// 1. Ambil data dari localStorage
function getCart() {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
}

// 2. Simpan data ke localStorage
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// 3. Fungsi Tambah/Kurangi (+/-)
function changeCartQty(cartKey, change) {
    let cart = getCart();
    const index = cart.findIndex(item => item.cartKey === cartKey);

    if (index !== -1) {
        cart[index].qty += change;
        
        // Jika 0 atau kurang, hapus item
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        
        saveCart(cart);
        // Panggil fungsi render di index.html jika ada
        if (typeof updateCart === 'function') updateCart(); 
    }
}

// 4. Fungsi Input Manual (Ubah angka ketik manual)
function setManualQuantity(cartKey, newQty) {
    let cart = getCart();
    const index = cart.findIndex(item => item.cartKey === cartKey);

    if (index !== -1) {
        const qty = parseInt(newQty);
        // Jika input tidak valid atau 0, kembalikan ke 1 agar aman
        cart[index].qty = isNaN(qty) || qty <= 0 ? 1 : qty;
        
        saveCart(cart);
        if (typeof updateCart === 'function') updateCart();
    }
}

// 5. Fungsi Hapus (Tong Sampah)
function removeItem(cartKey) {
    let cart = getCart();
    cart = cart.filter(item => item.cartKey !== cartKey);
    saveCart(cart);
    if (typeof updateCart === 'function') updateCart();
}
