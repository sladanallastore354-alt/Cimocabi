function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-content');
    if(dropdown.classList.contains('dropdown-hidden')){
        dropdown.classList.remove('dropdown-hidden');
        dropdown.innerHTML = `
            <a href="components/aboutme.html">📖 About Me</a>
            <a href="components/ongkir.html">🚚 Cek Ongkir</a>
            <a href="components/FAQ.html">❓ FAQ</a>
            <a href="#" id="translate-btn" onclick="initTranslate()">🌐 Translate Bahasa</a>
        `;
    } else {
        dropdown.classList.add('dropdown-hidden');
    }
}

// Tutup dropdown jika klik di luar
window.onclick = function(event) {
    if (!event.target.matches('.kebab-menu') && !event.target.matches('.kebab-menu *')) {
        document.getElementById('dropdown-content')?.classList.add('dropdown-hidden');
    }
}
