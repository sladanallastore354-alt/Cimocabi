// ========================================================
// FUNGSI JEMBATAN UNTUK TRANSFER DATA KERANJANG KE FORM CHECKOUT
// (DENGAN VALIDASI HARGA RP0 & COMING SOON)
// ========================================================
function lanjutKeCheckout() {
    // 1. Pastikan keranjang tidak kosong
    if (typeof cart === 'undefined' || cart.length === 0) {
        alert("Keranjang belanja Anda masih kosong! Silakan pilih menu Cimocabi terlebih dahulu sebelum checkout.");
        return;
    }

    // 2. Cek setiap produk di dalam keranjang
    let adaProdukTidakValid = false;

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        
        // Ambil nilai harga 
        let hargaProduk = item.price !== undefined ? item.price : item.harga;
        
        // Ubah format harga ke angka bulat (berjaga-jaga jika formatnya string)
        if (typeof hargaProduk === 'string') {
            hargaProduk = parseInt(hargaProduk.replace(/[^0-9]/g, '')) || 0; 
        }

        // 3. PERBAIKAN BUG: Ambil kategori langsung dari array 'products' berdasarkan ID
        let kategoriProduk = "";
        
        // Cek apakah array products tersedia (untuk keamanan)
        if (typeof products !== 'undefined') {
            // Cocokkan ID produk di keranjang dengan ID di database
            let produkAsli = products.find(p => p.id === item.id);
            if (produkAsli && produkAsli.category) {
                kategoriProduk = produkAsli.category;
            }
        }
        
        // Fallback (cadangan) jika tidak ditemukan di database products utama
        if (!kategoriProduk) {
            kategoriProduk = item.category || item.kategori || item.label || "";
        }
        
        kategoriProduk = kategoriProduk.toLowerCase();

        // 4. Logika Pemblokiran: Jika harga = 0 ATAU ada kata "comingsoon" di kategori
        if (hargaProduk === 0 || kategoriProduk.includes('comingsoon') || kategoriProduk.includes('coming soon')) {
            adaProdukTidakValid = true;
            break; // Hentikan pengecekan, sudah ketemu minimal 1 pelanggaran
        }
    }

    // 5. Munculkan Alert jika ada produk yang dilarang
    if (adaProdukTidakValid) {
        alert("Tidak bisa di beli untuk saat ini, silahkan tunggu updatenya melalui sosial media kami.");
        return; // Batalkan proses checkout, tetap di halaman yang sama
    }
    
    // 6. Jika semua aman, simpan ke memori dan pindah ke halaman checkout
    localStorage.setItem('cimocabi_cart_data', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}