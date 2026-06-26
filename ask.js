function askAdmin() {
    const adminAskNumber = "628991183100"; // Nomor admin khusus tanya produk
    const pesan = "Halo admin CIMOCABI, saya mau tanya produk...";
    window.open(`https://wa.me/${adminAskNumber}?text=${encodeURIComponent(pesan)}`, '_blank');
}
