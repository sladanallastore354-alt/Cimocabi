// assets/js/cart.js
import { updateCartCount } from './main.js';

let cart = [];

function renderCart() {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const container = document.getElementById('cart-items');
    const summary = document.getElementById('cart-summary');
    const empty = document.getElementById('cart-empty');

    if (cart.length === 0) {
        empty.style.display = 'block';
        summary.style.display = 'none';
        container.innerHTML = '';
        return;
    }

    empty.style.display = 'none';
    summary.style.display = 'block';

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        const qty = item.quantity || 1;
        const itemTotal = item.price * qty;
        total += itemTotal;

        html += `
            <div class="cart-item">
                <img src="\( {item.images[0]}" alt=" \){item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>Rp ${item.price.toLocaleString('id-ID')}</p>
                    <div class="quantity-control">
                        <button onclick="changeQuantity(${index}, -1)">−</button>
                        <span>${qty}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    Rp ${itemTotal.toLocaleString('id-ID')}
                    <button onclick="removeFromCart(${index})" class="remove-btn">🗑</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    document.getElementById('total-price').textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

window.changeQuantity = function(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart[index]) return;
    cart[index].quantity = Math.max(1, (cart[index].quantity || 1) + change);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
};

window.removeFromCart = function(index) {
    if (confirm("Hapus item ini dari keranjang?")) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
};

window.proceedToCheckout = function() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length > 0) {
        window.location.href = 'checkout.html';
    }
};

document.addEventListener('DOMContentLoaded', renderCart);

export { updateCartCount };