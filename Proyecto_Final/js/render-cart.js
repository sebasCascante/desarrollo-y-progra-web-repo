const CODIGOS_VOUCHER = { 'DARLING15': 15 };
let descuentoAplicado = 0;

function formatearPrecio(numero) {
  return `$${numero.toFixed(2)}`;
}

function crearFilaCarrito(item) {
  const tr = document.createElement('tr');
  tr.dataset.id = item.id;

  const tdProducto = document.createElement('td');
  const infoDiv = document.createElement('div');
  infoDiv.className = 'producto-fila';

  const miniImagen = document.createElement('span');
  miniImagen.className = 'mini-imagen';
  const img = document.createElement('img');
  img.src = item.imagen || 'IMG.jpg';
  img.alt = item.nombre;
  miniImagen.appendChild(img);

  const textos = document.createElement('span');
  const nombre = document.createElement('span');
  nombre.style.display = 'block';
  nombre.textContent = item.nombre;
  const coleccion = document.createElement('span');
  coleccion.className = 'tarjeta-coleccion';
  coleccion.textContent = item.coleccion;
  textos.appendChild(nombre);
  textos.appendChild(coleccion);

  infoDiv.appendChild(miniImagen);
  infoDiv.appendChild(textos);
  tdProducto.appendChild(infoDiv);

  const tdPrecio = document.createElement('td');
  tdPrecio.textContent = formatearPrecio(item.precioUnitario);

  const tdCantidad = document.createElement('td');
  const control = document.createElement('span');
  control.className = 'control-cantidad';

  const btnMenos = document.createElement('button');
  btnMenos.type = 'button';
  btnMenos.className = 'qty-menos';
  btnMenos.textContent = '-';

  const inputCantidad = document.createElement('input');
  inputCantidad.type = 'number';
  inputCantidad.className = 'qty-input-carrito';
  inputCantidad.value = item.cantidad;
  inputCantidad.min = '1';

  const btnMas = document.createElement('button');
  btnMas.type = 'button';
  btnMas.className = 'qty-mas';
  btnMas.textContent = '+';

  control.appendChild(btnMenos);
  control.appendChild(inputCantidad);
  control.appendChild(btnMas);
  tdCantidad.appendChild(control);

  const tdSubtotal = document.createElement('td');
  tdSubtotal.textContent = formatearPrecio(item.subtotal);

  const tdEliminar = document.createElement('td');
  const btnEliminar = document.createElement('button');
  btnEliminar.type = 'button';
  btnEliminar.className = 'boton-peligro btn-eliminar-item';
  btnEliminar.textContent = 'Eliminar';
  tdEliminar.appendChild(btnEliminar);

  tr.appendChild(tdProducto);
  tr.appendChild(tdPrecio);
  tr.appendChild(tdCantidad);
  tr.appendChild(tdSubtotal);
  tr.appendChild(tdEliminar);

  return tr;
}

function renderizarRelacionadosCarrito(detalle) {
  const contenedor = document.getElementById('related-cart-products');
  const seccion = document.getElementById('related-cart-section');
  if (!contenedor) return;

  const productos = obtenerTodosLosProductos();
  const idsEnCarrito = new Set(detalle.map(i => i.id));
  const sugeridos = productos.filter(p => !idsEnCarrito.has(p.id)).slice(0, 4);

  contenedor.innerHTML = '';
  sugeridos.forEach(p => contenedor.appendChild(crearTarjetaProducto(p)));
  seccion.classList.toggle('oculto', sugeridos.length === 0);
}

function renderizarCarrito() {
  const detalle = obtenerDetalleCarrito();
  const cuerpoTabla = document.getElementById('cart-items');
  const layout = document.getElementById('cart-layout');
  const vacio = document.getElementById('cart-empty');

  if (detalle.length === 0) {
    layout.classList.add('oculto');
    vacio.classList.remove('oculto');
    document.getElementById('related-cart-section').classList.add('oculto');
    actualizarBadgeCarrito();
    return;
  }

  layout.classList.remove('oculto');
  vacio.classList.add('oculto');

  cuerpoTabla.innerHTML = '';
  detalle.forEach(item => cuerpoTabla.appendChild(crearFilaCarrito(item)));

  const subtotal = calcularSubtotalCarrito();
  const total = Math.max(0, subtotal - descuentoAplicado);
  document.getElementById('cart-subtotal').textContent = formatearPrecio(subtotal);
  document.getElementById('cart-descuento').textContent = `-${formatearPrecio(descuentoAplicado)}`;
  document.getElementById('cart-total').textContent = formatearPrecio(total);

  renderizarRelacionadosCarrito(detalle);
  actualizarBadgeCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarCarrito();

  const cuerpoTabla = document.getElementById('cart-items');

  //Delegacion de eventos: un solo listener para +/- y eliminar en toda la tabla
  cuerpoTabla.addEventListener('click', (e) => {
    const fila = e.target.closest('tr');
    if (!fila) return;
    const id = Number(fila.dataset.id);

    if (e.target.classList.contains('btn-eliminar-item')) {
      eliminarDelCarrito(id);
      renderizarCarrito();
      return;
    }

    if (e.target.classList.contains('qty-mas') || e.target.classList.contains('qty-menos')) {
      const input = fila.querySelector('.qty-input-carrito');
      let cantidad = Number(input.value);
      cantidad = e.target.classList.contains('qty-mas') ? cantidad + 1 : cantidad - 1;
      actualizarCantidadCarrito(id, cantidad);
      renderizarCarrito();
    }
  });

  cuerpoTabla.addEventListener('change', (e) => {
    if (!e.target.classList.contains('qty-input-carrito')) return;
    const fila = e.target.closest('tr');
    const id = Number(fila.dataset.id);
    const cantidad = Math.max(0, Number(e.target.value) || 0);
    actualizarCantidadCarrito(id, cantidad);
    renderizarCarrito();
  });

  document.getElementById('voucher-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const codigo = document.getElementById('voucher-input').value.trim().toUpperCase();
    const mensaje = document.getElementById('voucher-msg');

    if (CODIGOS_VOUCHER[codigo] != null) {
      descuentoAplicado = CODIGOS_VOUCHER[codigo];
      mensaje.style.color = 'var(--exito)';
      mensaje.textContent = `Codigo aplicado: -$${descuentoAplicado.toFixed(2)}`;
    } else {
      descuentoAplicado = 0;
      mensaje.style.color = 'var(--error)';
      mensaje.textContent = 'Ese codigo no es valido.';
    }
    renderizarCarrito();
  });

  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (obtenerCarrito().length === 0) return;
    window.location.href = 'payment-method.html';
  });
});
