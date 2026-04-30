// Cart Management System
const CART_STORAGE_KEY = "arami_cart";

function getCart() {
  const cart = localStorage.getItem(CART_STORAGE_KEY);
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(item) {
  const cart = getCart();
  const existingItem = cart.find((i) => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += item.quantity || 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
    });
  }

  saveCart(cart);
}

function removeFromCart(itemId) {
  let cart = getCart();
  cart = cart.filter((i) => i.id !== itemId);
  saveCart(cart);
}

function updateQuantity(itemId, quantity) {
  const cart = getCart();
  const item = cart.find((i) => i.id === itemId);

  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.textContent = count;
  }
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function formatPrice(price) {
  return `₦${price.toLocaleString()}`;
}

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", updateCartCount);
