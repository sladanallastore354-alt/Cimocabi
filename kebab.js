// Memasukkan HTML Kebab Menu ke dalam titik kumpul di index.html
document.getElementById('tempat-kebab-menu').innerHTML = `
    <div id="kebab-container" class="relative inline-block text-left ml-3">
        <button onclick="toggleKebabMenu(event)" class="text-gray-600 hover:text-purple-600 focus:outline-none p-2">
            <i class="fas fa-ellipsis-v text-2xl"></i>
        </button>

        <div id="dropdown-menu" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-[2000]">
            <div class="py-1">
                <a href="about.html" class="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">
                    <i class="fas fa-store mr-2 w-5 text-center"></i> Tentang Kami
                </a>
                <a href="ongkir.html" class="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">
                    <i class="fas fa-motorcycle mr-2 w-5 text-center"></i> Cek Ongkir
                </a>
                <a href="faq.html" class="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">
                    <i class="fas fa-question-circle mr-2 w-5 text-center"></i> FAQ
                </a>

                <hr class="border-gray-200 my-1">

                <div class="px-4 py-2">
                    <p class="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Pilih Bahasa</p>
                    <div class="translate-wrapper">
                        <div id="google_translate_element"></div>
                    </div>
                </div>

                <button onclick="kembaliBahasaAsli()" class="w-full text-left block px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors translate-reset-btn">
                    <i class="fas fa-undo mr-2 w-5 text-center"></i> Kembali ke Indonesia
                </button>
            </div>
        </div>
    </div>
`;

/* =========================
   TOGGLE DROPDOWN MENU
========================= */
function toggleKebabMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('dropdown-menu');
    menu.classList.toggle('hidden');
}

// Menutup menu jika user klik di luar area dropdown
document.addEventListener('click', function(event) {
    const container = document.getElementById('kebab-container');
    const menu = document.getElementById('dropdown-menu');
    if (container && !container.contains(event.target)) {
        menu.classList.add('hidden');
    }
});

/* =========================
   BANNER GOOGLE OVERRIDE
========================= */
const hideGoogleBanner = setInterval(() => {
    const banner = document.querySelector('.goog-te-banner-frame');
    if (banner) {
        banner.style.display = 'none';
    }
    // Mencegah body turun karena Google Translate
    if (document.body.style.top !== '0px') {
        document.body.style.top = '0px';
    }
}, 500);

/* =========================
   KEMBALI KE BAHASA ASLI
========================= */
function kembaliBahasaAsli() {
    document.cookie = "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    document.cookie = "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=" + location.hostname;
    localStorage.removeItem('selectedLanguage');
    location.reload();
}

/* =========================
   SIMPAN BAHASA TERAKHIR
========================= */
const translateWatcher = setInterval(() => {
    const combo = document.querySelector('.goog-te-combo');
    if (!combo) return;

    clearInterval(translateWatcher);

    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang && savedLang !== combo.value) {
        combo.value = savedLang;
        combo.dispatchEvent(new Event('change'));
    }

    combo.addEventListener('change', () => {
        if (combo.value) {
            localStorage.setItem('selectedLanguage', combo.value);
        } else {
            localStorage.removeItem('selectedLanguage');
        }
    });
}, 1000);