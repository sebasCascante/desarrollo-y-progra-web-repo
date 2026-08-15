function validarNombreContacto(valor) {
  if (valor === '') return { valido: false, mensaje: 'Ingresa tu nombre.' };
  if (valor.length < 2) return { valido: false, mensaje: 'El nombre es demasiado corto.' };
  return { valido: true, mensaje: '' };
}

function validarEmailContacto(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (valor === '') return { valido: false, mensaje: 'Ingresa tu correo electronico.' };
  if (!regex.test(valor)) return { valido: false, mensaje: 'Ingresa un correo valido.' };
  return { valido: true, mensaje: '' };
}

function validarMensajeContacto(valor) {
  if (valor === '') return { valido: false, mensaje: 'Escribi tu mensaje.' };
  if (valor.length < 10) return { valido: false, mensaje: 'Contanos un poco mas (minimo 10 caracteres).' };
  return { valido: true, mensaje: '' };
}

function marcarCampoContacto(input, resultado) {
  let error = input.nextElementSibling;
  if (!error || !error.classList.contains('error-campo')) {
    error = document.createElement('span');
    error.className = 'error-campo';
    input.insertAdjacentElement('afterend', error);
  }
  input.classList.remove('valido', 'invalido');
  input.classList.add(resultado.valido ? 'valido' : 'invalido');
  error.textContent = resultado.mensaje;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const campoNombre = document.getElementById('contact-nombre');
  const campoEmail = document.getElementById('contact-email');
  const campoMensaje = document.getElementById('contact-mensaje');
  const mensajeExito = document.getElementById('contact-success');

  campoNombre.addEventListener('blur', () => marcarCampoContacto(campoNombre, validarNombreContacto(campoNombre.value.trim())));
  campoEmail.addEventListener('blur', () => marcarCampoContacto(campoEmail, validarEmailContacto(campoEmail.value.trim())));
  campoMensaje.addEventListener('blur', () => marcarCampoContacto(campoMensaje, validarMensajeContacto(campoMensaje.value.trim())));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const resultados = [
      [campoNombre, validarNombreContacto(campoNombre.value.trim())],
      [campoEmail, validarEmailContacto(campoEmail.value.trim())],
      [campoMensaje, validarMensajeContacto(campoMensaje.value.trim())]
    ];
    resultados.forEach(([input, resultado]) => marcarCampoContacto(input, resultado));

    const todoValido = resultados.every(([, resultado]) => resultado.valido);
    if (todoValido) {
      mensajeExito.textContent = `Gracias, ${campoNombre.value.trim()}. Recibimos tu mensaje y te vamos a responder pronto.`;
      mensajeExito.classList.remove('oculto');
      form.reset();
      [campoNombre, campoEmail, campoMensaje].forEach(campo => campo.classList.remove('valido', 'invalido'));
    } else {
      mensajeExito.classList.add('oculto');
    }
  });
});
