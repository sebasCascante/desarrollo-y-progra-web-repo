function renderizarTablaAdmin() {
  const cuerpo = document.getElementById('admin-products-body');
  const vacio = document.getElementById('admin-empty-msg');
  const productos = obtenerProductosAdmin();

  cuerpo.innerHTML = '';

  if (productos.length === 0) {
    vacio.classList.remove('oculto');
    return;
  }
  vacio.classList.add('oculto');

  productos.forEach(producto => {
    const tr = document.createElement('tr');
    tr.dataset.id = producto.id;

    const tdNombre = document.createElement('td');
    tdNombre.textContent = producto.nombre;

    const tdColeccion = document.createElement('td');
    tdColeccion.textContent = producto.coleccion;

    const tdPrecio = document.createElement('td');
    tdPrecio.textContent = `$${producto.precio.toFixed(2)}`;

    const tdStock = document.createElement('td');
    tdStock.textContent = producto.enStock ? 'Disponible' : 'Agotado';

    const tdAccion = document.createElement('td');
    const btnEliminar = document.createElement('button');
    btnEliminar.type = 'button';
    btnEliminar.className = 'boton-peligro btn-eliminar-admin';
    btnEliminar.textContent = 'Eliminar';
    tdAccion.appendChild(btnEliminar);

    tr.appendChild(tdNombre);
    tr.appendChild(tdColeccion);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdStock);
    tr.appendChild(tdAccion);
    cuerpo.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarTablaAdmin();

  const form = document.getElementById('admin-form');
  const mensaje = document.getElementById('admin-msg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('admin-nombre').value.trim();
    const imagen = document.getElementById('admin-imagen').value.trim();
    const coleccion = document.getElementById('admin-coleccion').value;
    const tipo = document.getElementById('admin-tipo').value;
    const precio = parseFloat(document.getElementById('admin-precio').value);
    const precioOfertaRaw = document.getElementById('admin-precio-oferta').value;
    const precioOferta = precioOfertaRaw === '' ? null : parseFloat(precioOfertaRaw);
    const descripcion = document.getElementById('admin-descripcion').value.trim();
    const enStock = document.getElementById('admin-en-stock').checked;
    const destacado = document.getElementById('admin-destacado').checked;

    if (!nombre || isNaN(precio)) {
      mensaje.style.color = 'var(--error)';
      mensaje.textContent = 'Completa al menos el nombre y el precio.';
      return;
    }

    const nuevoProducto = {
      id: generarIdProducto(),
      nombre,
      tipo,
      imagen,
      precio,
      precioOferta,
      enOferta: precioOferta != null,
      enStock,
      coleccion,
      destacado,
      descripcion: descripcion || `${nombre}, pieza de la coleccion ${coleccion}.`
    };

    agregarProductoAdmin(nuevoProducto);
    renderizarTablaAdmin();
    form.reset();
    document.getElementById('admin-en-stock').checked = true;

    mensaje.style.color = 'var(--exito)';
    mensaje.textContent = `"${nombre}" se agrego al catalogo.`;
  });

  //Delegacion de eventos para eliminar productos agregados desde este panel
  document.getElementById('admin-products-body').addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn-eliminar-admin')) return;
    const fila = e.target.closest('tr');
    const id = Number(fila.dataset.id);
    eliminarProductoAdmin(id);
    renderizarTablaAdmin();
  });
});
