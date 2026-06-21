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
        text: "Klik tombol Detail untuk melihat informasi produk."
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
        title: "Buka Produk",
        text: "Klik Detail untuk membuka produk."
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
        title: "Masukkan Keranjang",
        text: "Klik untuk memasukkan produk ke keranjang."
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
        title: "🎉 Selamat!",
        text: "Pesananmu siap dikirim ke admin melalui WhatsApp.<br><br>Terima kasih telah berbelanja di CIMOCABI ❤️"
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
<button id="tour-start-btn">❓ Tur</button>
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
#tour-start-btn { position: fixed; left: 15px; bottom: 15px; background: #9333EA; color: white; border: none; padding: 8px 12px; border-radius: 10px; cursor: pointer; z-index: 99997; font-size: 12px; }

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

function clearHighlight() { document.querySelectorAll(".tour-highlight").forEach(e => e.classList.remove("tour-highlight")); }

function showStep(step) {
    clearHighlight();
    currentStep = step;
    localStorage.setItem(TOUR_KEY, step);
    let el = document.querySelector(tourData[step].selector);
    if (!el) { overlay.style.display = "none"; tooltip.style.display = "none"; return; }

    document.querySelector(".tour-progress").innerHTML = (step + 1) + " / " + tourData.length;
    document.querySelector(".tour-title").innerHTML = tourData[step].title;
    document.querySelector(".tour-text").innerHTML = tourData[step].text;

    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("tour-highlight");
    overlay.style.display = "block";
    tooltip.style.display = "block";

    setTimeout(() => {
        let rect = el.getBoundingClientRect();
        let screenWidth = window.innerWidth;
        let tooltipWidth = tooltip.offsetWidth || 260;
        let posLeft = rect.left;
        if (posLeft + tooltipWidth > screenWidth) posLeft = screenWidth - tooltipWidth - 10;
        tooltip.style.left = Math.max(5, posLeft) + "px";
        let posTop = rect.top - tooltip.offsetHeight - 20;
        if (posTop < 20) posTop = rect.bottom + 20;
        tooltip.style.top = posTop + "px";
    }, 500);
}

document.getElementById("tour-next").onclick = () => (currentStep < tourData.length - 1) ? showStep(currentStep + 1) : finishTour();
document.getElementById("tour-prev").onclick = () => (currentStep > 0) ? showStep(currentStep - 1) : null;
document.getElementById("tour-skip").onclick = finishTour;
document.getElementById("tour-start-btn").onclick = () => showStep(0);

function finishTour() { clearHighlight(); overlay.style.display = "none"; tooltip.style.display = "none"; localStorage.setItem(TOUR_DONE, true); localStorage.removeItem(TOUR_KEY); }

function jalankanTurOtomatis() {
    if(localStorage.getItem(TOUR_DONE)) return;
    let saved = parseInt(localStorage.getItem(TOUR_KEY) || 0);
    setTimeout(() => showStep(saved), 1200);
}

if (document.readyState === "complete") jalankanTurOtomatis(); else window.addEventListener("load", jalankanTurOtomatis);

document.addEventListener("click", (e) => {
    if (currentStep === 3 && e.target.innerText.includes("Saya Mengerti")) setTimeout(() => showStep(4), 500);
    if (currentStep === 4 && e.target.innerText.includes("Detail")) setTimeout(() => showStep(5), 700);
    if (currentStep === 7 && e.target.closest("button[onclick='addFromModalToCart()']")) setTimeout(() => showStep(8), 700);
    if (currentStep === 8 && e.target.closest("button[onclick='lanjutKeCheckout()']")) localStorage.setItem(TOUR_KEY, 9);
});