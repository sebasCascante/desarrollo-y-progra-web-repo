const PRODUCTOS_POR_PAGINA = 8;

let tipoSeleccionado = 'todas';
let textoBusqueda = '';
let ordenPrecio = 'ninguno';
let paginaActual = 1;

function obtenerProductosFiltrados() {
  const productos = obtenerTodosLosProductos();

  let resultado = tipoSeleccionado === 'todas'
    ? productos
    : productos.filter(p => p.tipo === tipoSeleccionado);

  if (textoBusqueda.trim() !== '') {
    const texto = textoBusqueda.trim().toLowerCase();
    resultado = resultado.filter(p => p.nombre.toLowerCase().includes(texto));
  }

  if (ordenPrecio !== 'ninguno') {
    resultado = [...resultado].sort((a, b) => {
      const precioA = a.enOferta && a.precioOferta != null ? a.precioOferta : a.precio;
      const precioB = b.enOferta && b.precioOferta != null ? b.precioOferta : b.precio;
      return ordenPrecio === 'asc' ? precioA - precioB : precioB - precioA;
    });
  }

  return resultado;
}

function renderizarFiltros(productos) {
  const barra = document.getElementById('filter-bar');
  if (!barra) return;

  const tipos = ['todas', ...new Set(productos.map(p => p.tipo))];
  const ul = document.createElement('ul');

  tipos.forEach(tipo => {
    const li = document.createElement('li');
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip-filtro' + (tipo === tipoSeleccionado ? ' activo' : '');
    chip.textContent = tipo === 'todas' ? 'All' : tipo;
    chip.dataset.tipo = tipo;
    li.appendChild(chip);
    ul.appendChild(li);
  });

  barra.innerHTML = '';
  barra.appendChild(ul);
}

function renderizarPaginacion(totalProductos) {
  const nav = document.getElementById('paginacion');
  const totalPaginas = Math.max(1, Math.ceil(totalProductos / PRODUCTOS_POR_PAGINA));
  if (paginaActual > totalPaginas) paginaActual = totalPaginas;

  nav.innerHTML = '';
  if (totalPaginas <= 1) return;

  const btnAnterior = document.createElement('button');
  btnAnterior.type = 'button';
  btnAnterior.textContent = '<';
  btnAnterior.disabled = paginaActual === 1;
  btnAnterior.dataset.pagina = paginaActual - 1;
  nav.appendChild(btnAnterior);

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = String(i);
    btn.className = i === paginaActual ? 'activo' : '';
    btn.dataset.pagina = i;
    nav.appendChild(btn);
  }

  const btnSiguiente = document.createElement('button');
  btnSiguiente.type = 'button';
  btnSiguiente.textContent = '>';
  btnSiguiente.disabled = paginaActual === totalPaginas;
  btnSiguiente.dataset.pagina = paginaActual + 1;
  nav.appendChild(btnSiguiente);
}

function renderizarGrid() {
  const grid = document.getElementById('product-grid');
  const mensajeVacio = document.getElementById('no-results');
  if (!grid) return;

  const filtrados = obtenerProductosFiltrados();

  const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
  const productosPagina = filtrados.slice(inicio, inicio + PRODUCTOS_POR_PAGINA);

  grid.innerHTML = '';
  productosPagina.forEach(producto => grid.appendChild(crearTarjetaProducto(producto)));

  mensajeVacio.classList.toggle('oculto', filtrados.length > 0);
  renderizarPaginacion(filtrados.length);
}

document.addEventListener('DOMContentLoaded', () => {
  const productos = obtenerTodosLosProductos();
  renderizarFiltros(productos);
  renderizarGrid();

  //Delegacion de eventos: un solo listener para todos los chips de filtro
  document.getElementById('filter-bar').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip-filtro');
    if (!chip) return;
    tipoSeleccionado = chip.dataset.tipo;
    paginaActual = 1;
    renderizarFiltros(productos);
    renderizarGrid();
  });

  document.getElementById('orden-precio').addEventListener('change', (e) => {
    ordenPrecio = e.target.value;
    paginaActual = 1;
    renderizarGrid();
  });

  document.getElementById('form-busqueda').addEventListener('submit', (e) => {
    e.preventDefault();
    textoBusqueda = document.getElementById('input-busqueda').value;
    paginaActual = 1;
    renderizarGrid();
  });

  document.getElementById('input-busqueda').addEventListener('input', (e) => {
    textoBusqueda = e.target.value;
    paginaActual = 1;
    renderizarGrid();
  });

  //Delegacion de eventos para la paginacion
  document.getElementById('paginacion').addEventListener('click', (e) => {
    const boton = e.target.closest('button');
    if (!boton || boton.disabled) return;
    paginaActual = Number(boton.dataset.pagina);
    renderizarGrid();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
