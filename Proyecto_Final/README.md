Joyeria - Proyecto Final

Como agregar un producto nuevo

1. Abrir admin.html (el link esta en el pie de pagina de cualquier vista, dice "Admin")
2. Llenar el formulario: nombre, link de la imagen, coleccion, tipo de pieza, precio, precio de oferta si aplica, descripcion y si hay stock
3. En el campo Imagen hay que pegar el link de la foto
4. Al enviar el formulario el producto se guarda en el navegador, en localStorage, bajo la clave darling_productos_admin
5. El producto aparece automaticamente en el home, en el listado de productos, en las colecciones y en su propia pagina de detalle, porque todas esas vistas leen el catalogo combinado a traves de la funcion obtenerTodosLosProductos() que esta en js/storage.js.
6. Se puede eliminar el producto desde la misma tabla del panel de administracion, con el boton Eliminar.

Estructura del proyecto
  
index.html               ->   Homepage  
products.html            ->   Listado de productos, con busqueda, filtro por tipo, orden por precio y paginacion  
collections.html         ->   Listado de colecciones (Summer, Classic, Bridal)  
collection-details.html  ->   Detalle de una coleccion, con su historia y sus productos  
product.html             ->   Detalle de un producto (breadcrumb, cantidad, agregar al carrito, acordeones de info)  
cart.html                ->   Carrito y resumen de compra, con codigo de descuento  
payment-method.html      ->   Formulario de pago simulado  
payment-success.html     ->   Confirmacion de compra  
about.html               ->   Nosotros  
contact.html             ->   Formulario de contacto  
admin.html               ->   Panel para agregar y eliminar productos  
  
css/styles.css           ->   Todos los estilos de la web  
  
js/data.js                       ->   Catalogo base (arreglo de objetos) y datos de colecciones, testimonios y equipo  
js/storage.js                    ->   Funciones de localStorage: carrito y productos agregados desde el admin  
js/header.js                     ->   Actualiza el numero del carrito en el header  
js/product-card.js               ->   Genera la tarjeta de producto con createElement  
js/testimonial.js                ->   Genera el bloque de testimonio (blockquote)  
js/render-home.js                ->   Logica de index.html  
js/render-products.js            ->   Logica de products.html  
js/render-collections.js         ->   Logica de collections.html  
js/render-collection-details.js  ->   Logica de collection-details.html  
js/render-product.js             ->   Logica de product.html  
js/render-cart.js                ->   Logica de cart.html  
js/render-payment-method.js      ->   Validacion del formulario de pago  
js/render-payment-success.js     ->   Vacia el carrito al confirmar la compra  
js/render-about.js               ->   Renderiza el equipo en about.html  
js/render-admin.js               ->   Alta y baja de productos desde el panel admin  
js/render-contact.js             ->   Validacion del formulario de contacto  
  
Nota: El codigo de descuento que funciona en el carrito es DARLING15.
