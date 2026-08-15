function crearTarjetaProducto(producto) {
  const li = document.createElement('li');

  const article = document.createElement('article');
  article.className = 'tarjeta-producto' + (producto.enStock ? '' : ' agotado');

  const media = document.createElement('a');
  media.href = `product.html?id=${producto.id}`;
  media.className = 'tarjeta-imagen';

  if (producto.enOferta) {
    const etiqueta = document.createElement('span');
    etiqueta.className = 'etiqueta etiqueta-oferta';
    etiqueta.textContent = 'Oferta';
    media.appendChild(etiqueta);
  } else if (!producto.enStock) {
    const etiqueta = document.createElement('span');
    etiqueta.className = 'etiqueta etiqueta-agotado';
    etiqueta.textContent = 'Agotado';
    media.appendChild(etiqueta);
  }

  const img = document.createElement('img');
  img.src = producto.imagen || 'IMG.jpg';
  img.alt = producto.nombre;
  media.appendChild(img);

  const coleccion = document.createElement('span');
  coleccion.className = 'tarjeta-coleccion';
  coleccion.textContent = producto.coleccion;

  const nombre = document.createElement('h3');
  nombre.className = 'tarjeta-nombre';
  const nombreLink = document.createElement('a');
  nombreLink.href = `product.html?id=${producto.id}`;
  nombreLink.textContent = producto.nombre;
  nombre.appendChild(nombreLink);

  const precio = document.createElement('p');
  precio.className = 'tarjeta-precio';
  if (producto.enOferta && producto.precioOferta != null) {
    const viejo = document.createElement('span');
    viejo.className = 'precio-anterior';
    viejo.textContent = `$${producto.precio.toFixed(2)}`;
    const nuevo = document.createElement('span');
    nuevo.className = 'precio-oferta';
    nuevo.textContent = `$${producto.precioOferta.toFixed(2)}`;
    precio.appendChild(viejo);
    precio.appendChild(nuevo);
  } else {
    precio.textContent = `$${producto.precio.toFixed(2)}`;
  }

  article.appendChild(media);
  article.appendChild(coleccion);
  article.appendChild(nombre);
  article.appendChild(precio);
  li.appendChild(article);
  return li;
}
