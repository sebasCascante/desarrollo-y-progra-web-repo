document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('lista-colecciones');
  if (!contenedor) return;

  const productos = obtenerTodosLosProductos();
  const nombresColecciones = Object.keys(HISTORIAS_COLECCION);

  nombresColecciones.forEach(nombre => {
    const historia = HISTORIAS_COLECCION[nombre];
    const piezas = productos.filter(p => p.coleccion === nombre);

    const article = document.createElement('article');
    article.className = 'banda-coleccion';

    const img = document.createElement('img');
    img.src = historia.imagen || 'IMG.jpg';
    img.alt = `Coleccion ${nombre}`;

    const div = document.createElement('div');
    div.className = 'banda-texto';

    const h2 = document.createElement('h2');
    h2.textContent = nombre;

    const p = document.createElement('p');
    p.className = 'muted';
    p.textContent = historia.historia;

    const pPiezas = document.createElement('p');
    pPiezas.className = 'muted';
    pPiezas.textContent = `${piezas.length} pieza(s) disponibles`;

    const link = document.createElement('a');
    link.href = `collection-details.html?collection=${encodeURIComponent(nombre)}`;
    link.className = 'boton boton-contorno-oscuro';
    link.textContent = 'View Collection';

    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(pPiezas);
    div.appendChild(link);

    article.appendChild(img);
    article.appendChild(div);
    contenedor.appendChild(article);
  });
});
