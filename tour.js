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
        scrollTo: null
    },
    {
        title: "Langkah 3: Checkout",
        message: "Setelah memasukkan ke keranjang, isi data pengiriman lalu klik <strong>Kirim Pesanan ke WhatsApp</strong>.<br>Jangan lupa baca Syarat & Ketentuan di footer.",
        scrollTo: 'footer'
    }
];

function startTour() {
    tourStep = 0;
    showTourStep();
}

function showTourStep() {
    const step = tourSteps[tourStep];
    if (!step) {
        closeTour();
        return;
    }

    let scrollTarget = '';
    if (step.scrollTo) {
        const el = document.querySelector(step.scrollTo);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const html = `
        <strong>${step.title}</strong><br><br>
        ${step.message}<br><br>
        <small>Langkah ${tourStep + 1} dari ${tourSteps.length}</small>
    `;

    showCustomAlert(html);

    // Override tombol default custom alert agar ada Prev, Next, Skip
    const alertBox = document.getElementById('custom-alert');
    const content = alertBox.querySelector('.custom-alert-content');
    
    content.innerHTML = `
        <p>${html}</p>
        <div style="margin-top: 20px; display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
            ${tourStep > 0 ? `<button onclick="prevTourStep()" style="background:#95a5a6;">Prev</button>` : ''}
            <button onclick="nextTourStep()" style="background:#27ae60;">Next</button>
            <button onclick="closeTour()" style="background:#e74c3c;">Skip Tour</button>
        </div>
    `;
}

function nextTourStep() {
    tourStep++;
    showTourStep();
}

function prevTourStep() {
    if (tourStep > 0) {
        tourStep--;
        showTourStep();
    }
}

function closeTour() {
    closeCustomAlert();
    tourStep = 0;
}