function startTour() {
    alert("Selamat Datang di CIMOCABI Tour! \n\nLangkah 1: Scroll ke bawah untuk melihat aneka camilan kami (Food, Frozen, Bundling).");
    window.scrollTo({ top: document.querySelector('.filter-section').offsetTop - 50, behavior: 'smooth' });
    
    setTimeout(() => {
        alert("Langkah 2: Ingin order? Klik tombol hijau 'Masukkan Keranjang'. Lalu klik ikon Keranjang 🛒 di pojok kanan atas.");
    }, 4000);
    
    setTimeout(() => {
        alert("Langkah 3: Baca Syarat & Ketentuan sebelum checkout, ada di bagian bawah (Footer). Happy Shopping!");
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 8000);
}
