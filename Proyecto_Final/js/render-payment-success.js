function generarNumeroPedido() {
  return String(Math.floor(100000000 + Math.random() * 899999999));
}

document.addEventListener('DOMContentLoaded', () => {
  //Capturamos el total antes de vaciar el carrito, para poder mostrarlo.
  const total = calcularSubtotalCarrito();

  const hoy = new Date();
  const fecha = hoy.toLocaleDateString('es-CR');

  document.getElementById('pedido-fecha').textContent = fecha;
  document.getElementById('pedido-numero').textContent = generarNumeroPedido();
  document.getElementById('pedido-total').textContent = `$${total.toFixed(2)}`;

  vaciarCarrito();
  actualizarBadgeCarrito();
});
