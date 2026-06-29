// =============================================
// SOLD.JS - Integrasi Data Penjualan (Google Sheets)
// =============================================

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxkEtrVVD3r9TuFYZXSoL3EZw6zy57R7HMsQnGJu5GomNHrEsWNSjhJ8wsdEkzq8GrIDQ/exec';

// Fungsi utama untuk mengambil data jumlah terjual dari Google Sheets
async function fetchSoldData() {
    try {
        const response = await fetch(`${SCRIPT_URL}?action=getSoldData`);
        if (!response.ok) throw new Error('Gagal mengambil data dari server');
        
        const data = await response.json();
        
        // Update data produkCimocabi dengan data terjual terbaru
        if (Array.isArray(data)) {
            data.forEach(item => {
                // Mencocokkan data berdasarkan ID atau Nama
                const product = produkCimocabi.find(p => p.id === item.id || p.name === item.name);
                if (product) {
                    product.sold = parseInt(item.sold) || product.sold;
                }
            });
            
            // Refresh tampilan produk jika fungsi renderProducts tersedia
            if (typeof renderProducts === 'function') {
                // Mendapatkan kategori aktif saat ini agar tidak ter-reset ke 'semua'
                const activeBtn = document.querySelector('.category-buttons button.active');
                const currentFilter = activeBtn ? activeBtn.getAttribute('onclick') : 'filterCategory(\'semua\')';
                
                // Ekstraksi nilai kategori dari string onclick
                const match = currentFilter.match(/'([^']+)'/);
                const filterValue = match ? match[1] : 'semua';
                
                renderProducts(filterValue);
            }
        }
    } catch (error) {
        console.warn('⚠️ Tidak bisa mengambil data sold:', error);
    }
}

// Fungsi untuk update jumlah terjual setelah checkout berhasil
async function updateSoldCount(productId, qty = 1) {
    try {
        const product = produkCimocabi.find(p => p.id === productId);
        if (!product) return;

        const payload = {
            action: 'updateSold',
            id: product.id,
            name: product.name,
            qty: qty
        };

        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (result.success) {
            product.sold = (product.sold || 0) + qty;
            // PENTING: Perbaikan Sintaks Template Literal
            console.log(`✅ Sold updated: ${product.name} + ${qty}`);
            
            // Refresh tampilan jika fungsi tersedia
            if (typeof renderProducts === 'function') {
                renderProducts('semua');
            }
        }
    } catch (error) {
        console.error('❌ Gagal update sold count:', error);
    }
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Ambil data penjualan pertama kali
    fetchSoldData();
    
    // Refresh data otomatis setiap 30 detik agar stok/sold selalu update
    setInterval(fetchSoldData, 30000);
});

// Export fungsi agar bisa diakses secara global
window.fetchSoldData = fetchSoldData;
window.updateSoldCount = updateSoldCount;
