function obtenerIdDeURL() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get('id'));
}

function renderizarDetalle(producto) {
  document.title = `${producto.nombre} - Darling`;
  document.getElementById('miga-producto').textContent = producto.nombre;

  document.getElementById('detail-img').src = producto.imagen || 'IMG.jpg';
  document.getElementById('detail-img').alt = producto.nombre;
  document.getElementById('detail-collection').textContent = producto.coleccion;
  document.getElementById('detail-name').textContent = producto.nombre;
  document.getElementById('detail-desc').textContent = producto.descripcion;

  const precioEl = document.getElementById('detail-price');
  precioEl.innerHTML = '';
  if (producto.enOferta && producto.precioOferta != null) {
    const viejo = document.createElement('span');
    viejo.className = 'precio-anterior';
    viejo.textContent = `$${producto.precio.toFixed(2)}`;
    const nuevo = document.createElement('span');
    nuevo.className = 'precio-oferta';
    nuevo.textContent = `$${producto.precioOferta.toFixed(2)}`;
    precioEl.appendChild(viejo);
    precioEl.appendChild(nuevo);
  } else {
    precioEl.textContent = `$${producto.precio.toFixed(2)}`;
  }

  const stockEl = document.getElementById('detail-stock');
  const addBtn = document.getElementById('add-to-cart-btn');
  if (producto.enStock) {
    stockEl.textContent = 'En stock, listo para envio';
    stockEl.className = 'detalle-stock stock-si';
    addBtn.disabled = false;
  } else {
    stockEl.textContent = 'Agotado por el momento';
    stockEl.className = 'detalle-stock stock-no';
    addBtn.disabled = true;
    document.getElementById('qty-row').querySelectorAll('input, button').forEach(el => {
      if (el !== addBtn) el.disabled = true;
    });
  }
}

function renderizarRelacionados(producto, productos) {
  const contenedor = document.getElementById('related-products');
  const relacionados = productos
    .filter(p => p.coleccion === producto.coleccion && p.id !== producto.id)
    .slice(0, 4);

  contenedor.innerHTML = '';
  relacionados.forEach(p => contenedor.appendChild(crearTarjetaProducto(p)));

  document.getElementById('related-section').classList.toggle('oculto', relacionados.length === 0);
}

document.addEventListener('DOMContentLoaded', () => {
  const id = obtenerIdDeURL();
  const productos = obtenerTodosLosProductos();
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    document.getElementById('migas-producto-nav').classList.add('oculto');
    document.getElementById('product-detail').classList.add('oculto');
    document.getElementById('related-section').classList.add('oculto');
    document.getElementById('product-not-found').classList.remove('oculto');
    return;
  }

  renderizarDetalle(producto);
  renderizarRelacionados(producto, productos);

  const contenedorTestimonio = document.getElementById('testimonio-producto');
  if (contenedorTestimonio && TESTIMONIOS.length > 1) {
    contenedorTestimonio.replaceWith(crearTestimonio(TESTIMONIOS[1]));
  }

  const qtyInput = document.getElementById('qty-input');
  document.getElementById('qty-minus').addEventListener('click', () => {
    qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    qtyInput.value = Math.min(10, Number(qtyInput.value) + 1);
  });

  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const cantidad = Math.max(1, Number(qtyInput.value) || 1);
    const agregado = agregarAlCarrito(producto.id, cantidad);
    const mensaje = document.getElementById('detail-msg');

    if (agregado) {
      mensaje.textContent = `Se agregaron ${cantidad} pieza(s) al carrito.`;
      actualizarBadgeCarrito();
    } else {
      mensaje.textContent = 'Este producto no tiene stock disponible.';
    }
  });
});
