function renderizarDestacados() {
  const contenedor = document.getElementById('featured-products');
  if (!contenedor) return;

  const productos = obtenerTodosLosProductos();
  const destacados = productos.filter(p => p.destacado).slice(0, 3);
  const lista = destacados.length > 0 ? destacados : productos.slice(0, 3);

  contenedor.innerHTML = '';
  lista.forEach(producto => contenedor.appendChild(crearTarjetaProducto(producto)));
}

function renderizarColeccionesHome() {
  const contenedor = document.getElementById('home-collections');
  if (!contenedor) return;

  const nombresColecciones = Object.keys(HISTORIAS_COLECCION);
  contenedor.innerHTML = '';

  nombresColecciones.forEach(nombre => {
    const historia = HISTORIAS_COLECCION[nombre];
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'tarjeta-coleccion-tile';
    a.href = `collection-details.html?collection=${encodeURIComponent(nombre)}`;

    const img = document.createElement('img');
    img.src = historia.imagen || 'IMG.jpg';
    img.alt = `Coleccion ${nombre}`;

    const caption = document.createElement('span');
    caption.className = 'tile-caption';
    caption.textContent = nombre;

    a.appendChild(img);
    a.appendChild(caption);
    li.appendChild(a);
    contenedor.appendChild(li);
  });
}

function renderizarTestimonioHome() {
  const contenedor = document.getElementById('testimonios-home');
  if (!contenedor || TESTIMONIOS.length === 0) return;
  contenedor.replaceWith(crearTestimonio(TESTIMONIOS[0]));
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarDestacados();
  renderizarColeccionesHome();
  renderizarTestimonioHome();
});
