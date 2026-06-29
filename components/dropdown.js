// =============================================
// components/dropdown.js - Menu Kebab
// =============================================

function toggleDropdown(event) {
    // Mencegah event merambat agar tidak tertutup otomatis oleh window.onclick
    if (event) event.stopPropagation();

    const dropdown = document.getElementById('dropdown-content');
    if (!dropdown) return;

    // Toggle kelas hidden
    dropdown.classList.toggle('dropdown-hidden');
    
    // Isi konten hanya jika dropdown terbuka (untuk efisiensi)
    if (!dropdown.classList.contains('dropdown-hidden')) {
        dropdown.innerHTML = `
            <a href="components/aboutme.html" style="display:block; padding:10px; text-decoration:none; color:#333;">📖 About Me</a>
            <a href="components/ongkir.html" style="display:block; padding:10px; text-decoration:none; color:#333;">🚚 Cek Ongkir</a>
            <a href="components/FAQ.html" style="display:block; padding:10px; text-decoration:none; color:#333;">❓ FAQ</a>
            <a href="#" id="translate-btn" onclick="if(typeof initTranslate === 'function') initTranslate()" style="display:block; padding:10px; text-decoration:none; color:#333;">🌐 Translate Bahasa</a>
        `;
    }
}

// Tutup dropdown jika klik di luar
window.onclick = function(event) {
    const dropdown = document.getElementById('dropdown-content');
    const kebab = document.querySelector('.kebab-menu');
    
    // Jika target klik bukan kebab menu, maka tutup dropdown
    if (dropdown && !dropdown.classList.contains('dropdown-hidden') && 
        !event.target.closest('.kebab-menu')) {
        dropdown.classList.add('dropdown-hidden');
    }
}
