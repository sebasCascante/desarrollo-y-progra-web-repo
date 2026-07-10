//Práctica 7 - Variables, tipos y DOM básico
//script.js

//Variables con tipos diferentes
const nombre = "Sebastian Cascante"; //string
let visitas = 0; //numero
let disponible = true; //boolean

//Selección de elementos con querySelector
const visitasEl = document.querySelector("#visitas");
const estadoEl = document.querySelector("#estado");
const mensajeEl = document.querySelector("#mensaje");

//Botones
const btnVisita = document.querySelector("#btnVisita");
const btnEstado = document.querySelector("#btnEstado");

console.log(`Tarjeta cargada para ${nombre}`);

//Evento: sumar visita
btnVisita.addEventListener("click", () => {
  visitas = visitas + 1;

  //Template combinando variables
  const texto = `${nombre} recibió ${visitas} visita(s).`;

  visitasEl.textContent = visitas;
  mensajeEl.textContent = texto;

  console.log(`Visitas actualizadas: ${visitas}`);
});

//Evento: cambiar disponibilidad
btnEstado.addEventListener("click", () => {
  disponible = !disponible;

  estadoEl.textContent = disponible ? "disponible" : "ocupado";
  estadoEl.classList.toggle("ocupado", !disponible);

  mensajeEl.textContent = `Estado cambiado a: ${estadoEl.textContent}`;

  console.log(`Disponibilidad actual: ${disponible}`);
});