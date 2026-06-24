// ========================================================
// FUNGSI JEMBATAN UNTUK TRANSFER DATA KERANJANG KE FORM CHECKOUT
// (DENGAN VALIDASI HARGA RP0 & COMING SOON)
// ========================================================
function lanjutKeCheckout() {
    // 1. Pastikan keranjang tidak kosong
    if (
    typeof cart === 'undefined' ||
    !Array.isArray(cart) ||
    cart.length === 0
) {

    alert(
        "Keranjang belanja Anda masih kosong! Silakan pilih menu Cimocabi terlebih dahulu sebelum checkout."
    );

    return;

}

    // 2. Cek setiap produk di dalam keranjang
    let adaProdukTidakValid = false;

    for (const item of cart) {

    if (!item) continue;

if (!item) continue;
        
        // Ambil nilai harga 
        let hargaProduk =
    item.price ?? item.harga ?? 0;
        
        // Ubah format harga ke angka bulat (berjaga-jaga jika formatnya string)
        if (typeof hargaProduk === 'string') {
            hargaProduk = parseInt(hargaProduk.replace(/[^0-9]/g, '')) || 0; 
        }

        // 3. PERBAIKAN BUG: Ambil kategori langsung dari array 'products' berdasarkan ID
        let kategoriProduk = "";

if (
    typeof products !== 'undefined' &&
    Array.isArray(products)
) {

    const produkAsli =
        products.find(
            p => p.id === item.id
        );

    if (
        produkAsli &&
        produkAsli.category
    ) {

        kategoriProduk =
            produkAsli.category;

    }

}
        
        // Fallback (cadangan) jika tidak ditemukan di database products utama
        if (!kategoriProduk) {
            kategoriProduk = item.category || item.kategori || item.label || "";
        }
        kategoriProduk = String(kategoriProduk);
    
        kategoriProduk = String(kategoriProduk).toLowerCase();

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
    try {

    localStorage.setItem(
        'cimocabi_cart_data',
        JSON.stringify(cart)
    );

    window.location.href = 'checkout.html';

} catch (error) {

    console.error(
        "Gagal menyimpan data keranjang:",
        error
    );

    alert(
        "Terjadi masalah saat memproses keranjang belanja."
    );

}