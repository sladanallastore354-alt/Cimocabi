// Memasukkan HTML Kebab Menu ke dalam titik kumpul di index.html
document.getElementById('tempat-kebab-menu').innerHTML = `
    <div id="kebab-container" class="relative inline-block text-left ml-3">
        <button onclick="toggleMenu()" class="text-gray-600 hover:text-purple-600 focus:outline-none p-2">
            <i class="fas fa-ellipsis-v text-2xl"></i>
        </button>
        <button onclick="kembaliBahasaAsli()">  Indonesia </button>

        <div id="dropdown-menu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-[2000]">
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
                
                <div class="border-t border-gray-100"></div>
                
                <div class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors">
                    <div id="google_translate_element"></div>
                </div>
            </div>
        </div>
    </div>
`;

// Fungsi Klik Kebab Menu
function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.classList.toggle('hidden');
}

// Menutup menu otomatis jika klik di luar kotak
window.addEventListener('click', function(e) {

    const menu = document.getElementById('dropdown-menu');
    const kebabContainer = document.getElementById('kebab-container');

    if (
        menu &&
        kebabContainer &&
        !kebabContainer.contains(e.target)
    ) {
        menu.classList.add('hidden');
    }

});
/* =========================
   GOOGLE TRANSLATE
========================= */

function googleTranslateElementInit() {

    new google.translate.TranslateElement(
        {
            pageLanguage: 'id',
            includedLanguages: 'id,en,ja,ko,ar,ms,zh-CN',
            autoDisplay: false,
            layout: google.translate.TranslateElement.InlineLayout.VERTICAL
        },
        'google_translate_element'
    );

}


/* =========================
   HAPUS BANNER GOOGLE
========================= */

const hideGoogleBanner = setInterval(() => {

    const banner = document.querySelector('.goog-te-banner-frame');

    if (!banner) return;

    banner.style.display = 'none';

    document.body.style.top = '0px';

}, 1000);


/* =========================
   KEMBALI KE BAHASA ASLI
========================= */

function kembaliBahasaAsli() {

    document.cookie =
        "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";

    document.cookie =
        "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=" + location.hostname;

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

    if (
        savedLang &&
        savedLang !== combo.value
    ) {

        combo.value = savedLang;

        combo.dispatchEvent(
            new Event('change')
        );

    }

    combo.addEventListener('change', () => {

        if (combo.value) {

            localStorage.setItem(
                'selectedLanguage',
                combo.value
            );

        } else {

            localStorage.removeItem(
                'selectedLanguage'
            );

        }

    });

}, 500);