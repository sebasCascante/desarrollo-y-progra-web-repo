function obtenerParametroURL(nombre) {
  const params = new URLSearchParams(window.location.search);
  return params.get(nombre);
}

document.addEventListener('DOMContentLoaded', () => {
  const nombreColeccion = obtenerParametroURL('collection');
  const productos = obtenerTodosLosProductos();
  const piezas = nombreColeccion ? productos.filter(p => p.coleccion === nombreColeccion) : [];

  const heroSection = document.getElementById('collection-hero');
  const grid = document.getElementById('collection-products');
  const mensajeNoEncontrado = document.getElementById('collection-not-found');

  if (!nombreColeccion || piezas.length === 0) {
    heroSection.classList.add('oculto');
    grid.classList.add('oculto');
    mensajeNoEncontrado.classList.remove('oculto');
    return;
  }

  document.title = `${nombreColeccion} - Darling`;
  document.getElementById('collection-nombre').textContent = nombreColeccion;

  const historia = HISTORIAS_COLECCION[nombreColeccion];
  document.getElementById('collection-historia').textContent = historia
    ? historia.historia
    : `Piezas de la coleccion ${nombreColeccion}.`;

  const heroImg = document.getElementById('collection-hero-img');
  heroImg.src = (historia && historia.imagen) || 'IMG.jpg';
  heroImg.alt = `Coleccion ${nombreColeccion}`;

  grid.innerHTML = '';
  piezas.forEach(producto => grid.appendChild(crearTarjetaProducto(producto)));
});
