// Array y fuente de verdad
let productos = [
  { id: 1, nombre: "Audifonos", precio: 12000, categoria: "Electronica" },
  { id: 2, nombre: "Lampara", precio: 17000, categoria: "Hogar" },
  { id: 3, nombre: "Camisa", precio: 14000, categoria: "Ropa" },
  { id: 4, nombre: "Cafe", precio: 3500, categoria: "Alimentos" },
  { id: 5, nombre: "Lego", precio: 500000, categoria: "Juguetes" }
];

let siguienteId = productos.length + 1;
let categoriaActual = "todas";

// Referencias al DOM
const listaProductos = document.getElementById("lista-productos");
const contador = document.getElementById("contador");
const formAgregar = document.getElementById("form-agregar");
const filtroCategoria = document.getElementById("filtro-categoria");

// renderizado
function renderizar() {
  const productosFiltrados = categoriaActual === "todas"
    ? productos
    : productos.filter(p => p.categoria === categoriaActual);

  listaProductos.innerHTML = "";

  productosFiltrados.forEach(producto => {
    listaProductos.appendChild(crearElementoProducto(producto));
  });

  contador.textContent = `${productosFiltrados.length} productos`;
}

// Crea el <li> de un producto usando createElement
function crearElementoProducto(producto) {
  const li = document.createElement("li");
  li.className = "producto";
  li.dataset.id = producto.id;

  const texto = document.createElement("span");
  texto.textContent = `${producto.nombre} - ₡${producto.precio} (${producto.categoria})`;

  const btnEliminar = document.createElement("button");
  btnEliminar.className = "btn-eliminar";
  btnEliminar.textContent = "Eliminar";

  li.appendChild(texto);
  li.appendChild(btnEliminar);

  return li;
}

formAgregar.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("input-nombre").value.trim();
  const precio = parseFloat(document.getElementById("input-precio").value);
  const categoria = document.getElementById("input-categoria").value;

  if (!nombre || isNaN(precio) || !categoria) return;

  productos.push({ id: siguienteId++, nombre, precio, categoria });

  renderizar();
  formAgregar.reset();
});

listaProductos.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-eliminar")) return;

  const li = e.target.closest(".producto");
  const idAEliminar = Number(li.dataset.id);

  productos = productos.filter(p => p.id !== idAEliminar);

  renderizar();
});

filtroCategoria.addEventListener("change", (e) => {
  categoriaActual = e.target.value;
  renderizar();
});

renderizar();