const termText = `
    <h3>Syarat dan Ketentuan CIMOCABI</h3>
    <ol style="margin-left:20px; margin-top:10px; line-height:1.6;">
        <li><b>Sistem Pemesanan:</b> Pre-order. Dibuat fresh saat pesanan masuk. Minimal pengiriman 2 hari setelah pesanan diproses.</li>
        <li><b>Area & Kurir:</b> 
            <br>- Jabodetabek: Rekomendasi Grab/Gojek Instan/Sameday.
            <br>- Luar Jabodetabek: Rekomendasi Lion Parcel & Paxel.
        </li>
        <li><b>Pembayaran:</b> Kirim bukti transfer (Screenshot). Pesanan diproses sesuai urutan transfer.</li>
        <li><b>Lain-lain:</b>
            <br>- Kerusakan saat pengiriman adalah tanggung jawab ekspedisi.
            <br>- Kesalahan jumlah/jenis produk dari kami bisa di-refund dengan menyertakan VIDEO UNBOXING.
            <br>- Jika refund barang, ongkir ditanggung pembeli.
        </li>
    </ol>
`;

function showTerm() {
    const modal = document.getElementById('term-modal');
    document.getElementById('term-text').innerHTML = termText;
    modal.style.display = 'flex';
}

function closeTerm() {
    document.getElementById('term-modal').style.display = 'none';
}
