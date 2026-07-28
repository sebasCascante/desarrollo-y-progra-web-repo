const form = document.querySelector("form");

// Desactivamos la validación nativa del navegador para que
// sean nuestros mensajes personalizados los que se muestren.
form.noValidate = true;

const campoNombre = document.getElementById("nombre");
const campoEmail = document.getElementById("email");
const campoTelefono = document.getElementById("telefono");
const campoPersonas = document.getElementById("personas");
const campoFecha = document.getElementById("fecha");

function validarNombre(valor) {
  const regex = /^[A-Za-zÀ-ÿ\s]{2,60}$/;
  if (valor === "") {
    return { valido: false, mensaje: "El nombre es obligatorio." };
  }
  if (!regex.test(valor)) {
    return { valido: false, mensaje: "Ingrese solo letras (mínimo 2 caracteres)." };
  }
  return { valido: true, mensaje: "" };
}

function validarEmail(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (valor === "") {
    return { valido: false, mensaje: "El correo electrónico es obligatorio." };
  }
  if (!regex.test(valor)) {
    return { valido: false, mensaje: "Ingrese un correo válido, ej: nombre@dominio.com" };
  }
  return { valido: true, mensaje: "" };
}

function validarTelefono(valor) {
  const regex = /^\d{8}$/;
  if (valor === "") {
    return { valido: false, mensaje: "El teléfono es obligatorio." };
  }
  if (!regex.test(valor)) {
    return { valido: false, mensaje: "Debe tener exactamente 8 dígitos, sin espacios ni guiones." };
  }
  return { valido: true, mensaje: "" };
}

function validarPersonas(valor) {
  if (valor === "") {
    return { valido: false, mensaje: "Indique la cantidad de personas." };
  }
  const numero = Number(valor);
  if (!Number.isInteger(numero) || numero < 1 || numero > 20) {
    return { valido: false, mensaje: "Debe ser un número entero entre 1 y 20." };
  }
  return { valido: true, mensaje: "" };
}

function validarFecha(valor) {
  if (valor === "") {
    return { valido: false, mensaje: "Seleccione una fecha para la reservación." };
  }
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fechaElegida = new Date(valor + "T00:00:00");
  if (fechaElegida < hoy) {
    return { valido: false, mensaje: "La fecha no puede ser anterior a hoy." };
  }
  return { valido: true, mensaje: "" };
}

// Crea (una sola vez) el <span> de error justo después del campo
function obtenerElementoError(campo) {
  let span = campo.nextElementSibling;
  if (!span || !span.classList.contains("mensaje-error")) {
    span = document.createElement("span");
    span.className = "mensaje-error";
    campo.insertAdjacentElement("afterend", span);
  }
  return span;
}

function marcarInvalido(campo, mensaje) {
  campo.classList.remove("campo-valido");
  campo.classList.add("campo-invalido");
  obtenerElementoError(campo).textContent = mensaje;
}

function marcarValido(campo) {
  campo.classList.remove("campo-invalido");
  campo.classList.add("campo-valido");
  obtenerElementoError(campo).textContent = "";
}

// Ejecuta una función validadora sobre un campo y aplica el feedback
function validarCampo(campo, funcionValidadora) {
  const resultado = funcionValidadora(campo.value.trim());
  if (resultado.valido) {
    marcarValido(campo);
  } else {
    marcarInvalido(campo, resultado.mensaje);
  }
  return resultado.valido;
}

function obtenerMensajeExito() {
  let contenedor = document.getElementById("mensaje-exito-form");
  if (!contenedor) {
    contenedor = document.createElement("p");
    contenedor.id = "mensaje-exito-form";
    contenedor.className = "mensaje-exito-form oculto";
    form.appendChild(contenedor);
  }
  return contenedor;
}

function mostrarMensajeExito() {
  const nombre = campoNombre.value.trim();
  const fecha = campoFecha.value;
  const ocasionSeleccionada = document.querySelector('input[name="ocasion"]:checked').value;

  // Leemos los checkboxes marcados con .checked
  const restricciones = Array.from(document.querySelectorAll('input[name="restriccion"]'))
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  let detalle = `Reservación confirmada para ${nombre} el ${fecha}.`;
  if (ocasionSeleccionada !== "ninguna") {
    detalle += ` Ocasión: ${ocasionSeleccionada}.`;
  }
  if (restricciones.length > 0) {
    detalle += ` Restricciones: ${restricciones.join(", ")}.`;
  }

  const mensaje = obtenerMensajeExito();
  mensaje.textContent = detalle;
  mensaje.classList.remove("oculto");
}

function ocultarMensajeExito() {
  const mensaje = document.getElementById("mensaje-exito-form");
  if (mensaje) {
    mensaje.classList.add("oculto");
  }
}

campoNombre.addEventListener("blur", () => validarCampo(campoNombre, validarNombre));
campoEmail.addEventListener("blur", () => validarCampo(campoEmail, validarEmail));
campoTelefono.addEventListener("blur", () => validarCampo(campoTelefono, validarTelefono));
campoPersonas.addEventListener("blur", () => validarCampo(campoPersonas, validarPersonas));
campoFecha.addEventListener("blur", () => validarCampo(campoFecha, validarFecha));

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nombreValido = validarCampo(campoNombre, validarNombre);
  const emailValido = validarCampo(campoEmail, validarEmail);
  const telefonoValido = validarCampo(campoTelefono, validarTelefono);
  const personasValido = validarCampo(campoPersonas, validarPersonas);
  const fechaValido = validarCampo(campoFecha, validarFecha);

  const formularioValido = nombreValido && emailValido && telefonoValido && personasValido && fechaValido;

  if (formularioValido) {
    mostrarMensajeExito();
  } else {
    ocultarMensajeExito();
  }
});