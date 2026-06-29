// =============================================
// TOUR.JS - Panduan Penggunaan Website
// =============================================

let tourStep = 0;
const tourSteps = [
    {
        title: "Selamat Datang di CIMOCABI Tour! 🎉",
        message: "Langkah 1: Scroll ke bawah untuk melihat berbagai camilan kami (Food, Frozen, Bundling).",
        scrollTo: '.filter-section'
    },
    {
        title: "Langkah 2: Cara Order",
        message: "Klik tombol hijau <strong>🛒 Masukkan Keranjang</strong> pada produk yang diinginkan.<br>Kemudian klik ikon keranjang 🛒 di pojok kanan atas.",
        scrollTo: null // Tidak scroll, tetap di posisi saat ini
    },
    {
        title: "Langkah 3: Checkout",
        message: "Setelah memasukkan ke keranjang, isi form data pengiriman lalu klik <strong>Kirim Pesanan ke WhatsApp</strong>.<br>Jangan lupa baca Syarat & Ketentuan di bawah ya!",
        scrollTo: 'footer'
    }
];

// Memulai Tour dari langkah pertama
function startTour() {
    tourStep = 0;
    showTourStep();
}

// Menampilkan popup panduan sesuai langkah saat ini
function showTourStep() {
    const step = tourSteps[tourStep];
    if (!step) {
        closeTour();
        return;
    }

    // Scroll otomatis ke bagian yang dijelaskan
    if (step.scrollTo) {
        const el = document.querySelector(step.scrollTo);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Susun isi pesan beserta tombol navigasi khusus Tour
    const htmlMessage = `
        <strong style="font-size: 18px; color: #6f42c1;">${step.title}</strong><br><br>
        <span style="font-size: 14.5px; color: #333; line-height: 1.5;">${step.message}</span><br><br>
        <small style="color: #7f8c8d; font-weight: bold;">Langkah ${tourStep + 1} dari ${tourSteps.length}</small>
        
        <div style="margin-top: 20px; display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
            ${tourStep > 0 ? `<button onclick="prevTourStep()" style="background:#95a5a6; padding:8px 16px; border:none; border-radius:6px; color:white; font-weight:bold; cursor:pointer;">Prev</button>` : ''}
            
            <button onclick="${tourStep === tourSteps.length - 1 ? 'closeTour()' : 'nextTourStep()'}" style="background:#27ae60; padding:8px 16px; border:none; border-radius:6px; color:white; font-weight:bold; cursor:pointer;">
                ${tourStep === tourSteps.length - 1 ? 'Selesai 🎉' : 'Next'}
            </button>
            
            ${tourStep < tourSteps.length - 1 ? `<button onclick="closeTour()" style="background:#e74c3c; padding:8px 16px; border:none; border-radius:6px; color:white; font-weight:bold; cursor:pointer;">Skip Tour</button>` : ''}
        </div>
    `;

    // Tampilkan menggunakan fungsi alert bawaan di index.html
    if (typeof showCustomAlert === 'function') {
        showCustomAlert(htmlMessage);
    }

    // Sembunyikan sementara tombol default "Saya Mengerti" agar tidak dobel
    const alertBox = document.getElementById('custom-alert');
    if (alertBox) {
        // Mencari tombol langsung di bawah custom-alert-content
        const defaultBtn = alertBox.querySelector('.custom-alert-content > button');
        if (defaultBtn) {
            defaultBtn.style.display = 'none';
        }
    }
}

// Lanjut ke langkah berikutnya
function nextTourStep() {
    tourStep++;
    showTourStep();
}

// Kembali ke langkah sebelumnya
function prevTourStep() {
    if (tourStep > 0) {
        tourStep--;
        showTourStep();
    }
}

// Menutup Tour dan mengembalikan kondisi alert ke semula
function closeTour() {
    if (typeof closeCustomAlert === 'function') {
        closeCustomAlert();
    }
    
    tourStep = 0;
    
    // Kembalikan tombol default "Saya Mengerti" agar bisa dipakai oleh fitur keranjang
    const alertBox = document.getElementById('custom-alert');
    if (alertBox) {
        const defaultBtn = alertBox.querySelector('.custom-alert-content > button');
        if (defaultBtn) {
            defaultBtn.style.display = 'inline-block';
        }
    }
}
