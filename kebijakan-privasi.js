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
`;

function showPrivacy() {
    const modal = document.getElementById('privacy-modal');
    document.getElementById('privacy-text').innerHTML = privacyText;
    modal.style.display = 'flex';
}

function closePrivacy() {
    document.getElementById('privacy-modal').style.display = 'none';
}