function crearTestimonio(testimonio) {
  const section = document.createElement('section');
  section.className = 'testimonio';
  section.setAttribute('aria-label', 'Testimonio de cliente');

  const img = document.createElement('img');
  img.src = testimonio.imagen || 'IMG.jpg';
  img.alt = `Foto de ${testimonio.nombre}`;

  const blockquote = document.createElement('blockquote');
  const p = document.createElement('p');
  p.textContent = testimonio.cita;
  const footer = document.createElement('footer');
  const cite = document.createElement('cite');
  cite.textContent = testimonio.nombre;
  footer.appendChild(cite);
  footer.appendChild(document.createTextNode(`, ${testimonio.pais}`));

  blockquote.appendChild(p);
  blockquote.appendChild(footer);

  section.appendChild(img);
  section.appendChild(blockquote);
  return section;
}
