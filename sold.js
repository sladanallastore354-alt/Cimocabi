// ====================== SOLD.JS ======================
// Menghubungkan jumlah produk terjual dengan Google Sheets

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxkEtrVVD3r9TuFYZXSoL3EZw6zy57R7HMsQnGJu5GomNHrEsWNSjhJ8wsdEkzq8GrIDQ/exec';

// Fungsi utama untuk fetch data penjualan
async function fetchSoldData() {
    try {
        const response = await fetch(`${SCRIPT_URL}?action=getSoldData`);
        if (!response.ok) throw new Error('Gagal mengambil data');
        
        const data = await response.json();
        
        // Update produkCimocabi dengan data terjual terbaru
        if (Array.isArray(data)) {
            data.forEach(item => {
                const product = produkCimocabi.find(p => p.id === item.id || p.name === item.name);
                if (product) {
                    product.sold = parseInt(item.sold) || product.sold;
                }
            });
            
            // Refresh tampilan produk
            if (typeof renderProducts === 'function') {
                const currentFilter = document.querySelector('.category-buttons button.active')?.getAttribute('onclick') || 'semua';
                const filterValue = currentFilter.includes('semua') ? 'semua' : 
                                  currentFilter.match(/'([^']+)'/) ? currentFilter.match(/'([^']+)'/)[1] : 'semua';
                renderProducts(filterValue);
            }
        }
    } catch (error) {
        console.warn('⚠️ Tidak bisa mengambil data sold:', error);
        // Gunakan data default jika gagal
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
            console.log(`✅ Sold updated: \( {product.name} + \){qty}`);
            
            // Refresh tampilan
            if (typeof renderProducts === 'function') renderProducts('semua');
        }
    } catch (error) {
        console.error('❌ Gagal update sold count:', error);
    }
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Fetch data sold setiap halaman dimuat
    fetchSoldData();
    
    // Refresh data sold setiap 30 detik (opsional)
    setInterval(fetchSoldData, 30000);
});

// Export fungsi agar bisa dipakai di file lain
window.fetchSoldData = fetchSoldData;
window.updateSoldCount = updateSoldCount;