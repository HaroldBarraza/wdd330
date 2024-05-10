import { ShoppingCart } from './ShoppingCart.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const cart = new ShoppingCart();
    cart.renderCartContents();
});
