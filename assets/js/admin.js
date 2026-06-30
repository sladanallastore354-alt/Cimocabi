// assets/js/admin.js
// Logic Admin Panel - CIMOCABI

import { productsData } from './products.js';

// Cek Status Login Admin
export function checkAdminLogin() {
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Render Produk di Admin Table
export function renderAdminProducts(tableId = 'product-table') {
    const tbody = document.getElementById(tableId);
    if (!tbody) return;

    tbody.innerHTML = '';

    productsData.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>Rp ${product.price.toLocaleString('id-ID')}</td>
            <td>${product.stock}</td>
            <td>
                <span class="${product.status === 'tersedia' ? 'status-active' : 'status-soon'}">
                    ${product.status}
                </span>
            </td>
            <td>
                <button class="btn-small edit-btn" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn-small delete-btn" onclick="deleteProduct(${product.id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Fungsi Edit Produk (Contoh)
window.editProduct = function(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;

    const newStock = prompt(`Update stok untuk ${product.name} (stok saat ini: ${product.stock})`, product.stock);
    
    if (newStock !== null) {
        product.stock = parseInt(newStock);
        alert(`Stok ${product.name} berhasil diupdate menjadi ${newStock}`);
        renderAdminProducts(); // refresh table
    }
};

// Fungsi Hapus Produk (Contoh)
window.deleteProduct = function(id) {
    if (confirm("Yakin ingin menghapus produk ini?")) {
        const index = productsData.findIndex(p => p.id === id);
        if (index !== -1) {
            productsData.splice(index, 1);
            alert("Produk berhasil dihapus");
            renderAdminProducts();
        }
    }
};

// Logout Admin
window.logoutAdmin = function() {
    if (confirm("Yakin ingin keluar dari Admin Panel?")) {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'login.html';
    }
};

// Inisialisasi Admin (dipanggil di setiap halaman admin)
export function initAdmin() {
    checkAdminLogin();
    console.log("✅ Admin Module Loaded - CIMOCABI");
}

// Auto init jika di-load
if (typeof window !== 'undefined') {
    window.addEventListener('load', initAdmin);
}