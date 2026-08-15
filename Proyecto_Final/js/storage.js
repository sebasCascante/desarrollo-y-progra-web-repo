const CLAVE_PRODUCTOS_ADMIN = 'darling_productos_admin';
const CLAVE_CARRITO = 'darling_carrito';

/* ---------------------- Productos (admin) ---------------------- */

function obtenerProductosAdmin() {
  const datos = localStorage.getItem(CLAVE_PRODUCTOS_ADMIN);
  return datos ? JSON.parse(datos) : [];
}

function guardarProductosAdmin(productos) {
  localStorage.setItem(CLAVE_PRODUCTOS_ADMIN, JSON.stringify(productos));
}

function agregarProductoAdmin(producto) {
  const productos = obtenerProductosAdmin();
  productos.push(producto);
  guardarProductosAdmin(productos);
}

function eliminarProductoAdmin(id) {
  const productos = obtenerProductosAdmin().filter(p => p.id !== id);
  guardarProductosAdmin(productos);
}

//Combina el catalogo base con lo agregado desde el panel admin.
//Esta funcion es la fuente de verdad para TODAS las vistas del sitio.
function obtenerTodosLosProductos() {
  return [...PRODUCTOS_BASE, ...obtenerProductosAdmin()];
}

function generarIdProducto() {
  const todos = obtenerTodosLosProductos();
  const maxId = todos.reduce((max, p) => Math.max(max, p.id), 0);
  return maxId + 1;
}

/* ------------------------------ Carrito ------------------------------ */

function obtenerCarrito() {
  const datos = localStorage.getItem(CLAVE_CARRITO);
  return datos ? JSON.parse(datos) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function agregarAlCarrito(idProducto, cantidad) {
  const producto = obtenerTodosLosProductos().find(p => p.id === idProducto);
  if (!producto || !producto.enStock) return false; //no se agrega sin stock

  const carrito = obtenerCarrito();
  const itemExistente = carrito.find(item => item.id === idProducto);

  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    carrito.push({ id: idProducto, cantidad });
  }

  guardarCarrito(carrito);
  return true;
}

function actualizarCantidadCarrito(idProducto, cantidad) {
  let carrito = obtenerCarrito();
  if (cantidad <= 0) {
    carrito = carrito.filter(item => item.id !== idProducto);
  } else {
    const item = carrito.find(i => i.id === idProducto);
    if (item) item.cantidad = cantidad;
  }
  guardarCarrito(carrito);
}

function eliminarDelCarrito(idProducto) {
  const carrito = obtenerCarrito().filter(item => item.id !== idProducto);
  guardarCarrito(carrito);
}

function vaciarCarrito() {
  guardarCarrito([]);
}

//Devuelve los items del carrito ya combinados con los datos del producto,
//usando el precio de oferta cuando corresponde.
function obtenerDetalleCarrito() {
  const carrito = obtenerCarrito();
  const productos = obtenerTodosLosProductos();

  return carrito
    .map(item => {
      const producto = productos.find(p => p.id === item.id);
      if (!producto) return null;
      const precioUnitario = producto.enOferta && producto.precioOferta != null
        ? producto.precioOferta
        : producto.precio;
      return {
        ...producto,
        cantidad: item.cantidad,
        precioUnitario,
        subtotal: precioUnitario * item.cantidad
      };
    })
    .filter(Boolean);
}

function contarItemsCarrito() {
  return obtenerCarrito().reduce((total, item) => total + item.cantidad, 0);
}

function calcularSubtotalCarrito() {
  return obtenerDetalleCarrito().reduce((total, item) => total + item.subtotal, 0);
}
