// Memasukkan HTML Kebab Menu ke dalam titik kumpul di index.html
document.getElementById('tempat-kebab-menu').innerHTML = `
    <div class="relative inline-block text-left ml-3 z-50">
        <button onclick="toggleMenu()" class="text-gray-600 hover:text-purple-600 focus:outline-none p-2">
            <i class="fas fa-ellipsis-v text-2xl"></i>
        </button>

        <div id="dropdown-menu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
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
    if (menu) {
        const buttonBox = e.target.closest('.relative'); 
        if (!buttonBox && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        }
    }
});