// assets/js/main.js
import './api.js';
import './products.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    updateCartCount();
    
    // Render featured products jika ada container
    if (document.getElementById('products') || document.getElementById('product-grid')) {
        renderFeaturedProducts();
    }
});

function loadHeader() {
    const header = document.getElementById('header');
    if (header) {
        header.innerHTML = `
            <nav class="navbar">
                <div class="logo">
                    <h2>CIMOCABI</h2>
                </div>
                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="menu.html">Menu</a>
                    <a href="cart.html">Keranjang</a>
                    <a href="admin/login.html">Admin</a>
                </div>
                <button onclick="window.location.href='cart.html'" class="btn-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <span id="cart-count">0</span>
                </button>
            </nav>
        `;
    }
}

function loadFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = `
            <footer class="main-footer">
                <!-- Cara Pesan -->
                <div class="footer-section purple-bg">
                    <h2>Cara Pesan</h2>
                    <p>Gampang banget, cuma 4 langkah! ✨</p>
                    <div class="steps">
                        <div class="step-item">
                            <div class="step-icon">💬</div>
                            <p>Chat Admin WA</p>
                        </div>
                        <div class="step-item">
                            <div class="step-icon">🛒</div>
                            <p>Pilih Produk</p>
                        </div>
                        <div class="step-item">
                            <div class="step-icon">✅</div>
                            <p>Konfirmasi & Bayar</p>
                        </div>
                        <div class="step-item">
                            <div class="step-icon">🚚</div>
                            <p>Pesanan Dikirim</p>
                        </div>
                    </div>
                    <button onclick="window.open('https://wa.me/628991183100', '_blank')" class="btn-whatsapp">
                        <i class="fab fa-whatsapp"></i> Chat Admin WhatsApp
                    </button>
                </div>

                <!-- Kenapa Wajib Coba -->
                <div class="footer-section">
                    <h2>Kenapa Wajib Coba?</h2>
                    <p>Ini alasannya! ❤️</p>
                    <div class="benefits">
                        <div class="benefit-item">
                            <span class="emoji">❄️</span>
                            <p>Frozen<br><small>Tahan Lama & Praktis</small></p>
                        </div>
                        <div class="benefit-item">
                            <span class="emoji">🔥</span>
                            <p>Tinggal Goreng<br><small>Matang dalam Menit</small></p>
                        </div>
                        <div class="benefit-item">
                            <span class="emoji">😋</span>
                            <p>Enak Banget<br><small>Gurih & Bikin Nagih</small></p>
                        </div>
                        <div class="benefit-item">
                            <span class="emoji">🎁</span>
                            <p>Cocok Hampers<br><small>Arisan & Bekal</small></p>
                        </div>
                    </div>
                </div>

                <!-- Logo & Slogan -->
                <div class="footer-brand">
                    <img src="assets/images/logo.png" alt="CIMOCABI" class="footer-logo">
                    <h2>CIMOCABI</h2>
                    <p>Cireng & Cimol Spesial • Depok, Jawa Barat, Indonesia</p>
                </div>

                <!-- Social Media -->
                <div class="footer-social">
                    <p>Kunjungi dan ikuti kami :</p>
                    <div class="social-icons">
                        <a href="https://www.instagram.com/cimocabi?igsh=MTRhYzMwdGcxM2NjbQ==" target="_blank" class="social-btn instagram"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.facebook.com/share/18xwt1YSVq/" target="_blank" class="social-btn facebook"><i class="fab fa-facebook"></i></a>
                        <a href="https://www.tiktok.com/@spfirdaussyyy?_r=1&_t=ZS-97V3ZKwZxK8" target="_blank" class="social-btn tiktok"><i class="fab fa-tiktok"></i></a>
                        <a href="#" class="social-btn grabfood blur">GrabFood</a>
                        <a href="#" class="social-btn gofood blur">GoFood</a>
                    </div>
                </div>

                <!-- Copyright -->
                <div class="footer-bottom">
                    <p>&copy; 2025 CIMOCABI — Cireng & Cimol Spesial dari Depok ❤️</p>
                    <p>
                        <a href="#">Syarat & Ketentuan</a> | 
                        <a href="#">Kebijakan Privasi</a>
                    </p>
                </div>
            </footer>
        `;
    }
}

// Update cart count
export function updateCartCount() {
    const count = document.getElementById('cart-count');
    if (count) {
        count.textContent = JSON.parse(localStorage.getItem('cart') || '[]').length;
    }
}