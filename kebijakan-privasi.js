// =============================================
// kebijakan-privasi.js - Kebijakan Privasi
// =============================================

const privacyText = `
    <h3>Kebijakan Privasi CIMOCABI</h3>
    <p style="margin: 12px 0; color:#555; font-size:14px;">Kami menghargai dan melindungi privasi Anda.</p>
    
    <ol style="margin-left:20px; line-height:1.75; font-size:14.5px;">
        <li><strong>Pengumpulan Data:</strong> Kami hanya mengumpulkan data yang diperlukan untuk memproses pesanan (nama, alamat, nomor telepon).</li>
        <li><strong>Penggunaan Data:</strong> Data digunakan semata-mata untuk keperluan pemesanan, pengiriman, dan komunikasi terkait pesanan Anda.</li>
        <li><strong>Perlindungan Data:</strong> Data pribadi Anda disimpan dengan aman dan tidak akan dijual, disewakan, atau dibagikan kepada pihak ketiga tanpa izin.</li>
        <li><strong>Penyimpanan:</strong> Data akan disimpan selama diperlukan untuk keperluan bisnis dan sesuai ketentuan hukum yang berlaku.</li>
    </ol>
    
    <p style="margin-top:20px; font-size:13.5px; color:#666; text-align:center;">
        Dengan menggunakan layanan kami, Anda menyetujui kebijakan privasi ini.
    </p>
    <button onclick="closePrivacy()" style="width: 100%; margin-top: 15px; padding: 10px; background: #6f42c1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Tutup</button>
`;

function showPrivacy() {
    // Pastikan di index.html sudah ada div id="privacy-modal"
    const modal = document.getElementById('privacy-modal');
    const container = document.getElementById('privacy-text');
    if (modal && container) {
        container.innerHTML = privacyText;
        modal.style.display = 'flex';
        modal.classList.remove('modal-hidden');
    }
}

function closePrivacy() {
    const modal = document.getElementById('privacy-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.add('modal-hidden');
    }
}
