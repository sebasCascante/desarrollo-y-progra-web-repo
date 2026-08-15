document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('grid-equipo');
  if (!contenedor) return;

  contenedor.innerHTML = '';
  EQUIPO.forEach(persona => {
    const li = document.createElement('li');
    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.src = persona.imagen || 'IMG.jpg';
    img.alt = persona.nombre;

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = persona.nombre;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    li.appendChild(figure);
    contenedor.appendChild(li);
  });
});
