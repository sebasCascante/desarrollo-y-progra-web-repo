// ======================================================
// Práctica 7 — Variables, tipos y DOM básico
// script.js
// ======================================================

// --- 1. Variables con tipos diferentes (const / let) ---
const nombre = "Ana Rodríguez";        // string
let visitas = 0;                       // number
let disponible = true;                 // boolean

// --- 2. Selección de elementos del DOM con querySelector ---
const visitsEl = document.querySelector("#visits");
const statusTextEl = document.querySelector("#statusText");
const statusDotEl = document.querySelector("#statusDot");
const logEl = document.querySelector("#log");
const cardEl = document.querySelector("#card");

// --- 3. Referencias a los botones ---
const btnVisit = document.querySelector("#btnVisit");
const btnAvailability = document.querySelector("#btnAvailability");
const btnTheme = document.querySelector("#btnTheme");

console.log(`Tarjeta cargada para ${nombre}. Disponibilidad inicial: ${disponible}`);

// ------------------------------------------------------
// Evento 1: sumar una visita a la tarjeta
// ------------------------------------------------------
btnVisit.addEventListener("click", () => {
  visitas = visitas + 1;

  // Template literal combinando variables de distinto tipo
  const mensaje = `${nombre} recibió ${visitas} visita(s) en esta tarjeta.`;

  // Modificación de textContent
  visitsEl.textContent = visitas;
  logEl.textContent = mensaje;

  console.log(`[visitas] contador actualizado a ${visitas}`);
});

// ------------------------------------------------------
// Evento 2: alternar disponibilidad (boolean)
// ------------------------------------------------------
btnAvailability.addEventListener("click", () => {
  disponible = !disponible;

  const textoEstado = disponible ? "disponible" : "ocupada";
  statusTextEl.textContent = textoEstado;

  // Modificación de classList según el valor booleano
  statusDotEl.classList.toggle("status__dot--off", !disponible);

  logEl.textContent = `Estado cambiado: ahora ${nombre} está ${textoEstado}.`;

  console.log(`[disponibilidad] valor booleano actual: ${disponible}`);
});

// ------------------------------------------------------
// Evento 3 (extra): cambiar el tema visual de la tarjeta
// ------------------------------------------------------
btnTheme.addEventListener("click", () => {
  cardEl.classList.toggle("card--light");

  const temaActual = cardEl.classList.contains("card--light") ? "claro" : "oscuro";
  logEl.textContent = `Tema visual cambiado a modo ${temaActual}.`;

  // Modificación directa de style además de classList
  cardEl.style.transition = "background 0.35s ease, border-color 0.35s ease";
});