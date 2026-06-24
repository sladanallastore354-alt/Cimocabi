/* ==========================================================
   CIMOCABI INTERACTIVE TOUR (FONT SIZE OPTIMIZED)
   file : tour.js
========================================================== */

const TOUR_KEY = "cimocabiTourStep";
const TOUR_DONE = "cimocabiTourDone";

const tourData = [
    {
        selector: "header",
        title: "Selamat datang di CIMOCABI 👋",
        text: "Frozen Food & Cemilan Praktis dengan sistem pre-order."
    },
{
    selector: "#product-grid div",
    title: "Pilih produk favoritmu 🍽️",
    text: "Klik produk yang akan kamu beli untuk melihat foto, deskripsi, stok, dan informasi lengkap."
},
    {
        selector: "footer",
        title: "Hubungi dan ikuti kami 📱",
        text: "Kamu juga bisa melihat informasi terbaru melalui media sosial kami."
    },
    {
        selector: "button[onclick='toggleTerms()']",
        title: "Ketentuan Penggunaan",
        text: "Silakan baca ketentuan terlebih dahulu sebelum berbelanja."
    },
{
    selector: "#detail-container",
    title: "Informasi Produk 📦",
    text: "Setelah produk dibuka, kamu dapat melihat foto, deskripsi, harga dan stok."
},
    {
        selector: "input[value='Tetap Frozen']",
        title: "Pilih Varian",
        text: "Pilih varian penyajian sesuai keinginanmu."
    },
    {
        selector: "#detail-qty",
        title: "Jumlah Pesanan",
        text: "Atur jumlah pesanan yang ingin dibeli."
    },
{
    selector: "button[onclick='addFromModalToCart()']",
    title: "Tambah ke Keranjang 🛒",
    text: "Produk akan dimasukkan ke keranjang belanja."
},
    {
        selector: "button[onclick='lanjutKeCheckout()']",
        title: "Lanjut Bayar",
        text: "Klik Lanjut Bayar untuk menuju halaman checkout."
    },
    {
        selector: "#buyerName",
        title: "Form Pengiriman",
        text: "Masukkan data pembeli dengan lengkap."
    },
{
    selector: "#btnSubmitOrder",
    title: "🎉 Pesanan Siap Dikirim!",
    text: "Pastikan semua data sudah benar. Pesanan akan dikirim ke admin melalui WhatsApp.<br><br>Terima kasih telah berbelanja di CIMOCABI ❤️"
}
];

let currentStep = 0;

/* ========= create ui ========= */
document.body.insertAdjacentHTML("beforeend", `
<div id="tour-overlay"></div>
<div id="tour-tooltip">
    <div class="tour-progress"></div>
    <h3 class="tour-title"></h3>
    <div class="tour-text"></div>
    <div class="tour-buttons">
        <button id="tour-prev">Prev</button>
        <button id="tour-next">Next</button>
        <button id="tour-skip">Skip</button>
    </div>
</div>
<button id="tour-start-btn">🚀</button>
`);

/* ========= css (font diperkecil) ========= */
const style = document.createElement("style");
style.innerHTML = `
#tour-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.65); display: none; z-index: 99998; backdrop-filter: blur(2px); }
#tour-tooltip { 
    position: fixed; width: 260px; max-width: 85vw; background: #9333EA; color: white; 
    padding: 12px; border-radius: 16px; display: none; z-index: 99999; box-shadow: 0 10px 30px rgba(0,0,0,.3);
}
.tour-title { font-size: 14px; font-weight: bold; margin: 0 0 5px 0; }
.tour-text { font-size: 12px; line-height: 1.4; opacity: 0.9; }
.tour-progress { font-size: 10px; margin-bottom: 5px; opacity: 0.7; }
.tour-highlight { position: relative; z-index: 99999 !important; box-shadow: 0 0 0 4px rgba(147,51,234,.5); border-radius: 12px; }
#tour-start-btn:hover{
    position: fixed;
    left: 15px;
    bottom: 15px;

    background: rgba(147,51,234,.8);
    transform: scale(1.05);
    backdrop-filter: blur(8px);

    color: white;
    border: 1px solid rgba(255,255,255,.2);

    padding: 8px 12px;

    border-radius: 999px;

    cursor: pointer;

    z-index: 99997;

    font-size: 12px;

    transition: all .25s ease;
}
.tour-buttons { display: flex; gap: 6px; margin-top: 12px; }
.tour-buttons button { 
    flex: 1; padding: 6px; border: none; border-radius: 8px; cursor: pointer; 
    font-weight: bold; font-size: 11px;
    background-color: white !important; color: #9333EA !important; 
    transition: transform 0.1s;
}
`;
document.head.append(style);

/* ========= fungsi logika (tetap sama, posisi sudah dioptimalkan) ========= */
const overlay = document.getElementById("tour-overlay");
const tooltip = document.getElementById("tour-tooltip");

function clearHighlight() {

    const highlights =
        document.querySelectorAll(".tour-highlight");

    if (!highlights.length) return;

    highlights.forEach(el => {

        el.classList.remove("tour-highlight");

    });

}

function showStep(step) {
    clearHighlight();
    const currentStep = tourData[step];

const el = document.querySelector(
    currentStep.selector
);

if (!el || !el.isConnected) {

    if (overlay)
        overlay.style.display = "none";

    if (tooltip)
        tooltip.style.display = "none";

    return;

}

    document.querySelector(".tour-progress").innerHTML = (step + 1) + " / " + tourData.length;
    document.querySelector(".tour-title").innerHTML = tourData[step].title;
    document.querySelector(".tour-text").innerHTML = tourData[step].text;

    el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    el.classList.add("tour-highlight");
    overlay.style.display = "block";
    tooltip.style.display = "block";

    setTimeout(() => {
    if (!el || !el.isConnected) {

    overlay.style.display = "none";
    tooltip.style.display = "none";

    return;

}
        let rect = el.getBoundingClientRect();
        let screenWidth = window.innerWidth;
        let tooltipWidth = tooltip.offsetWidth || 260;
        let posLeft = rect.left;
        if (posLeft + tooltipWidth > screenWidth) posLeft = screenWidth - tooltipWidth - 10;
        tooltip.style.left = Math.max(10, posLeft) + "px";
        let posTop = rect.top - tooltip.offsetHeight - 20;
        if (posTop < 20) posTop = rect.bottom + 15;
        tooltip.style.top = posTop + "px";
    }, 500);
}

document.getElementById("tour-next").onclick = () => (currentStep < tourData.length - 1) ? showStep(currentStep + 1) : finishTour();
document.getElementById("tour-prev").onclick = () => (currentStep > 0) ? showStep(currentStep - 1) : null;
document.getElementById("tour-skip").onclick = finishTour;
document.getElementById("tour-start-btn").onclick = () => showStep(0);

function finishTour() {

    clearHighlight();

    if (overlay) {
        overlay.style.display = "none";
    }

    if (tooltip) {
        tooltip.style.display = "none";
    }

    localStorage.setItem(TOUR_DONE, true);

    localStorage.removeItem(TOUR_KEY);

}

function jalankanTurOtomatis() {
    if(localStorage.getItem(TOUR_DONE)) return;
    let saved = parseInt(localStorage.getItem(TOUR_KEY) || 0);
    setTimeout(() => showStep(saved), 1200);
}

if (document.readyState === "complete") jalankanTurOtomatis(); else window.addEventListener("load", jalankanTurOtomatis);

document.addEventListener("click", (e) => {
    if (currentStep === 3 && e.target.innerText.includes("Saya Mengerti")) setTimeout(() => showStep(4), 500);
    if (currentStep === 7 && e.target.closest("button[onclick='addFromModalToCart()']")) setTimeout(() => showStep(8), 700);
    if (currentStep === 8 && e.target.closest("button[onclick='lanjutKeCheckout()']")) localStorage.setItem(TOUR_KEY, 9);
});
/* ==========================================================
   FITUR TOMBOL TUR BISA DIGESER (DRAGGABLE) & LEBIH TINGGI
========================================================== */
const tourBtn = document.getElementById("tour-start-btn"); // Sesuaikan ID jika berbeda

if (tourBtn) {
    // 1. Buat tombol lebih tinggi dari posisi awal (naik menjadi 150px dari bawah)
    tourBtn.style.bottom = "150px"; 
    tourBtn.style.touchAction = "none"; // Mencegah layar ikut ter-scroll saat tombol digeser di HP
    
    let isDragging = false;
    let isMoved = false; // Penanda untuk membedakan antara 'klik' dan 'geser'
    let startX, startY, initialLeft, initialTop;

    // Fungsi mulai geser
    const startDrag = (e) => {
        isDragging = true;
        isMoved = false;
        
        // Ambil koordinat kursor atau sentuhan jari
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        startX = clientX;
        startY = clientY;

        // Ambil posisi awal tombol
        const rect = tourBtn.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        // Matikan transisi hover sementara agar pergerakan mulus mengikuti kursor
        tourBtn.style.transition = "none";
    };

    // Fungsi saat tombol sedang digeser
    const onDrag = (e) => {
        if (!isDragging) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const dx = clientX - startX;
        const dy = clientY - startY;

        // Jika digeser lebih dari 5px, anggap sedang ditarik (bukan diklik)
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            isMoved = true;
            e.preventDefault(); // Cegah layar ikut scroll saat geser tombol di mobile
        }

        // Hitung posisi baru
        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        // Pastikan tombol tidak keluar dari batas layar
        const btnWidth = tourBtn.offsetWidth;
        const btnHeight = tourBtn.offsetHeight;

        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + btnWidth > window.innerWidth) newLeft = window.innerWidth - btnWidth;
        if (newTop + btnHeight > window.innerHeight) newTop = window.innerHeight - btnHeight;

        // Terapkan posisi baru, reset atribut bottom/right bawaan CSS
        tourBtn.style.left = newLeft + "px";
        tourBtn.style.top = newTop + "px";
        tourBtn.style.right = "auto";
        tourBtn.style.bottom = "auto";
    };

    // Fungsi berhenti geser
const stopDrag = () => {
    if (!isDragging) return;

    isDragging = false;

    const rect = tourBtn.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;

    tourBtn.style.transition = "all .25s ease";

    // magnet kiri kanan
    if (centerX < window.innerWidth / 2) {

        tourBtn.style.left = "8px";

    } else {

        tourBtn.style.left =
            (window.innerWidth - rect.width - 8) + "px";

    }
};
    // --- EVENT LISTENER MOUSE (Desktop) ---
    tourBtn.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", onDrag, { passive: false });
    document.addEventListener("mouseup", stopDrag);

    // --- EVENT LISTENER TOUCH (Mobile) ---
    tourBtn.addEventListener("touchstart", startDrag, { passive: false });
    document.addEventListener("touchmove", onDrag, { passive: false });
    document.addEventListener("touchend", stopDrag);

    // --- MENCEGAH KLIK SAAT TOMBOL DIGESER ---
    // Agar tur tidak tiba-tiba terbuka saat kita selesai menggeser tombol
    tourBtn.addEventListener("click", (e) => {
        if (isMoved) {
            e.preventDefault();
            e.stopImmediatePropagation(); // Membatalkan event onclick tur
        }
    }, true); 
}