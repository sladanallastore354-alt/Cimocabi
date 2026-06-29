// =============================================
// term.js - Syarat dan Ketentuan
// =============================================

const termText = `
    <h3>Syarat dan Ketentuan CIMOCABI</h3>
    <p style="margin: 12px 0; color:#555; font-size:14px;">Mohon dibaca dengan seksama sebelum melakukan pemesanan.</p>
    
    <ol style="margin-left:20px; line-height:1.75; font-size:14.5px;">
        <li><strong>Sistem Pemesanan:</strong> Pre-order. Semua produk dibuat fresh setelah pesanan masuk. Estimasi pengiriman minimal 2 hari kerja setelah konfirmasi pembayaran.</li>
        <li><strong>Area Pengiriman & Kurir:</strong><br>
            • Jabodetabek: Rekomendasi Grab/Gojek (Instan/Sameday).<br>
            • Luar Jabodetabek: Rekomendasi Lion Parcel & Paxel (gunakan Cold Storage untuk produk frozen).
        </li>
        <li><strong>Pembayaran:</strong> Transfer bank. Kirim bukti transfer (screenshot) ke admin. Pesanan diproses sesuai urutan transfer yang diterima.</li>
        <li><strong>Refund & Pengembalian:</strong><br>
            • Kerusakan selama pengiriman adalah tanggung jawab ekspedisi.<br>
            • Kesalahan dari pihak kami dapat direfund dengan menyertakan video unboxing lengkap.<br>
            • Ongkir pengembalian ditanggung oleh pembeli.
        </li>
    </ol>
    
    <p style="margin-top:20px; font-size:13.5px; color:#666; text-align:center;">
        Dengan melanjutkan pemesanan, Anda dianggap telah menyetujui semua syarat dan ketentuan di atas.
    </p>
    <button onclick="closeTerm()" style="width: 100%; margin-top: 15px; padding: 10px; background: #6f42c1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Saya Mengerti</button>
`;

function showTerm() {
    const modal = document.getElementById('term-modal');
    const container = document.getElementById('term-text');
    if (modal && container) {
        container.innerHTML = termText;
        modal.style.display = 'flex';
        modal.classList.remove('modal-hidden');
    }
}

function closeTerm() {
    const modal = document.getElementById('term-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.add('modal-hidden');
    }
    // Simpan status kunjungan agar tidak muncul terus setiap buka halaman
    localStorage.setItem('hasVisited', 'true');
}
