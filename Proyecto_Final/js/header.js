function actualizarBadgeCarrito() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = contarItemsCarrito();
  }
}

document.addEventListener('DOMContentLoaded', actualizarBadgeCarrito);
