// assets/js/checkout.js
import { submitOrder } from './api.js';
import { updateCartCount } from './main.js';

let cart = [];

function loadCart() {
  cart = JSON.parse(localStorage.getItem('cart') || '[]');
  renderOrderSummary();
}

function renderOrderSummary() {
  const container = document.getElementById('summary-items');
  let total = 0;
  let html = '';

  cart.forEach(item => {
    const qty = item.quantity || 1;
    const subtotal = item.price * qty;
    total += subtotal;
    html += `
      <div class="summary-item">
        <div><strong>\( {item.name}</strong><br><small> \){qty} x Rp ${item.price.toLocaleString('id-ID')}</small></div>
        <span>Rp ${subtotal.toLocaleString('id-ID')}</span>
      </div>
    `;
  });

  container.innerHTML = html;
  document.getElementById('grand-total').textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

document.getElementById('checkout-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  if (cart.length === 0) return alert("Keranjang kosong!");

  const nama = document.getElementById('nama').value.trim();
  const wa = document.getElementById('wa').value.trim();
  const alamat = document.getElementById('alamat').value.trim();
  const catatan = document.getElementById('catatan').value.trim();

  const orderData = { nama, wa, alamat, items: cart, total: cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0), catatan };

  const success = await submitOrder(orderData);
  if (success) {
    localStorage.removeItem('cart');
    updateCartCount();
    alert("Pesanan berhasil dikirim ke admin via WhatsApp!");
    window.location.href = 'index.html';
  }
});

document.addEventListener('DOMContentLoaded', loadCart);