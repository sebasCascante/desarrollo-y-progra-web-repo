/** TODO: Hay imagenes que se repiten porque queria que todas fueran de la misma fuente y con un formato de link parecido, 
 * pero que fueran gratis no habian muchas, esa es la razon */

const PRODUCTOS_BASE = [
  { id: 1, nombre: 'Lorraine Charm Ring', tipo: 'Anillos', imagen: 'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&w=800&h=800&q=80', precio: 80.75, precioOferta: 65.00, enOferta: true, enStock: true, coleccion: 'Summer', destacado: true,
    descripcion: 'Anillo tallado en oro de 18k con un diseno de lineas fluidas inspirado en las tardes de verano.' },
  { id: 2, nombre: 'Sunlit Hoop Earrings', tipo: 'Aretes', imagen: 'https://images.unsplash.com/photo-1680968921717-4abbbe793bb3?auto=format&fit=crop&w=800&h=800&q=80', precio: 45.00, precioOferta: null, enOferta: false, enStock: true, coleccion: 'Summer', destacado: true,
    descripcion: 'Aretes de aro en bano de oro con un acabado satinado.' },
  { id: 3, nombre: 'Golden Wave Bracelet', tipo: 'Pulseras', imagen: 'https://images.unsplash.com/photo-1602527428055-a2526fabdc9f?auto=format&fit=crop&w=800&h=800&q=80', precio: 95.50, precioOferta: 79.00, enOferta: true, enStock: false, coleccion: 'Summer', destacado: false,
    descripcion: 'Pulsera de eslabones ondulados que evocan el movimiento del agua.' },
  { id: 4, nombre: 'Citrus Drop Necklace', tipo: 'Collares', imagen: 'https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=800&h=800&q=80', precio: 68.00, precioOferta: null, enOferta: false, enStock: true, coleccion: 'Summer', destacado: false,
    descripcion: 'Collar delicado con un dije colgante en forma de gota, cadena fina de 45 cm.' },
  { id: 5, nombre: 'Eleanor Pearl Necklace', tipo: 'Collares', imagen: 'https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?auto=format&fit=crop&w=800&h=800&q=80', precio: 210.00, precioOferta: null, enOferta: false, enStock: true, coleccion: 'Classic', destacado: true,
    descripcion: 'Collar de perlas cultivadas engarzadas a mano sobre una cadena de oro.' },
  { id: 6, nombre: 'Heritage Signet Ring', tipo: 'Anillos', imagen: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?auto=format&fit=crop&w=800&h=800&q=80', precio: 120.00, precioOferta: null, enOferta: false, enStock: true, coleccion: 'Classic', destacado: false,
    descripcion: 'Anillo sello de lineas rectas y superficie pulida, pensado para grabarse con iniciales.' },
  { id: 7, nombre: 'Classic Tennis Bracelet', tipo: 'Pulseras', imagen: 'https://images.unsplash.com/photo-1602527428055-a2526fabdc9f?auto=format&fit=crop&w=800&h=800&q=80', precio: 340.00, precioOferta: 299.00, enOferta: true, enStock: true, coleccion: 'Classic', destacado: true,
    descripcion: 'Pulsera de linea continua con engastes circulares.' },
  { id: 8, nombre: 'Monogram Stud Earrings', tipo: 'Aretes', imagen: 'https://images.unsplash.com/photo-1680968921717-4abbbe793bb3?auto=format&fit=crop&w=800&h=800&q=80', precio: 55.00, precioOferta: null, enOferta: false, enStock: true, coleccion: 'Classic', destacado: false,
    descripcion: 'Aretes de boton con grabado sutil, para llevarse todos los dias.' },
  { id: 9, nombre: 'Eternal Vow Ring', tipo: 'Anillos', imagen: 'https://images.unsplash.com/photo-1631982686092-e6561a853187?auto=format&fit=crop&w=800&h=800&q=80', precio: 450.00, precioOferta: null, enOferta: false, enStock: true, coleccion: 'Bridal', destacado: true,
    descripcion: 'Anillo de compromiso con montura clasica de cuatro garras.' },
  { id: 10, nombre: 'Bridal Halo Earrings', tipo: 'Aretes', imagen: 'https://images.unsplash.com/photo-1680968921717-4abbbe793bb3?auto=format&fit=crop&w=800&h=800&q=80', precio: 180.00, precioOferta: null, enOferta: false, enStock: false, coleccion: 'Bridal', destacado: false,
    descripcion: 'Aretes con halo de piedras menudas alrededor de un punto central.' },
  { id: 11, nombre: 'Whisper Pearl Necklace', tipo: 'Collares', imagen: 'https://images.unsplash.com/photo-1685970731194-e27b477e87ba?auto=format&fit=crop&w=800&h=800&q=80', precio: 260.00, precioOferta: 220.00, enOferta: true, enStock: true, coleccion: 'Bridal', destacado: false,
    descripcion: 'Gargantilla de perla unica suspendida en una cadena casi invisible.' },
  { id: 12, nombre: 'Promise Band Ring', tipo: 'Anillos', imagen: 'https://images.unsplash.com/photo-1705326455036-0fab8ecba04d?auto=format&fit=crop&w=800&h=800&q=80', precio: 96.00, precioOferta: null, enOferta: false, enStock: true, coleccion: 'Bridal', destacado: false,
    descripcion: 'Banda delgada y continua, pensada para apilarse o llevarse sola.' }
];

const HISTORIAS_COLECCION = {
  Summer: { subtitulo: 'Luz de temporada', imagen: 'https://images.unsplash.com/photo-1593193611972-437ce4d601c6?auto=format&fit=crop&w=800&h=800&q=80', historia: 'Summer nacio de los reflejos del mediodia sobre el agua: piezas ligeras y un brillo que acompana al sol en vez de competir con el.' },
  Classic: { subtitulo: 'Lo que no pasa de moda', imagen: 'https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?auto=format&fit=crop&w=800&h=800&q=80', historia: 'Classic reune las siluetas que Darling ha repetido desde su primera coleccion: el sello, la perla, la linea de tenis.' },
  Bridal: { subtitulo: 'Para el si', imagen: 'https://images.unsplash.com/photo-1627293509201-cd0c780043e6?auto=format&fit=crop&w=800&h=800&q=80', historia: 'Bridal se disena pensando en un solo dia que se recuerda para siempre.' }
};

const TESTIMONIOS = [
  { imagen: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&h=800&q=80', cita: 'El anillo llego exactamente como se veia en las fotos. Se siente mucho mas caro de lo que pague.', nombre: 'Camila Rodriguez', pais: 'Costa Rica' },
  { imagen: 'https://images.unsplash.com/photo-1543949806-2c9935e6aa78?auto=format&fit=crop&w=800&h=800&q=80', cita: 'Pedi el collar de perlas para mi mama y el empaque solo ya se sentia como un regalo especial.', nombre: 'Maria Mora', pais: 'Costa Rica' }
];

//Equipo (About us)
const EQUIPO = [
  { imagen: 'https://images.unsplash.com/photo-1592621385612-4d7129426394?auto=format&fit=crop&w=800&h=800&q=80', nombre: 'Jennifer Robinson' },
  { imagen: 'https://images.unsplash.com/photo-1699899657680-421c2c2d5064?auto=format&fit=crop&w=800&h=800&q=80', nombre: 'Amanda Anderson' },
  { imagen: 'https://images.unsplash.com/photo-1627161683077-e34782c24d81?auto=format&fit=crop&w=800&h=800&q=80', nombre: 'Briana Taylor' }
];
