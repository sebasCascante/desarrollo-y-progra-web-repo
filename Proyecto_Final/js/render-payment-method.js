function validarNombreTarjeta(valor) {
  if (valor === '') return { valido: false, mensaje: 'Ingresa el nombre como aparece en la tarjeta.' };
  if (valor.length < 3) return { valido: false, mensaje: 'El nombre es demasiado corto.' };
  return { valido: true, mensaje: '' };
}

function validarNumeroTarjeta(valor) {
  const soloDigitos = valor.replace(/\s/g, '');
  if (!/^\d{16}$/.test(soloDigitos)) {
    return { valido: false, mensaje: 'Ingresa los 16 digitos de la tarjeta.' };
  }
  return { valido: true, mensaje: '' };
}

function validarVencimiento(valor) {
  const match = /^(\d{2})\/(\d{2})$/.exec(valor);
  if (!match) return { valido: false, mensaje: 'Usa el formato MM/AA.' };
  const mes = Number(match[1]);
  if (mes < 1 || mes > 12) return { valido: false, mensaje: 'El mes debe estar entre 01 y 12.' };
  return { valido: true, mensaje: '' };
}

function validarCVV(valor) {
  if (!/^\d{3,4}$/.test(valor)) {
    return { valido: false, mensaje: 'El CVV debe tener 3 o 4 digitos.' };
  }
  return { valido: true, mensaje: '' };
}

function marcarCampo(input, resultado) {
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
  const subtotal = calcularSubtotalCarrito();
  document.getElementById('payment-total').textContent = `$${subtotal.toFixed(2)}`;

  const form = document.getElementById('payment-form');

  if (obtenerCarrito().length === 0) {
    document.getElementById('payment-empty-msg').classList.remove('oculto');
    form.classList.add('oculto');
    return;
  }

  const campoNombre = document.getElementById('card-name');
  const campoNumero = document.getElementById('card-number');
  const campoVencimiento = document.getElementById('card-expiry');
  const campoCVV = document.getElementById('card-cvv');

  campoNombre.addEventListener('blur', () => marcarCampo(campoNombre, validarNombreTarjeta(campoNombre.value.trim())));
  campoNumero.addEventListener('blur', () => marcarCampo(campoNumero, validarNumeroTarjeta(campoNumero.value.trim())));
  campoVencimiento.addEventListener('blur', () => marcarCampo(campoVencimiento, validarVencimiento(campoVencimiento.value.trim())));
  campoCVV.addEventListener('blur', () => marcarCampo(campoCVV, validarCVV(campoCVV.value.trim())));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const resultados = [
      [campoNombre, validarNombreTarjeta(campoNombre.value.trim())],
      [campoNumero, validarNumeroTarjeta(campoNumero.value.trim())],
      [campoVencimiento, validarVencimiento(campoVencimiento.value.trim())],
      [campoCVV, validarCVV(campoCVV.value.trim())]
    ];

    resultados.forEach(([input, resultado]) => marcarCampo(input, resultado));

    const todoValido = resultados.every(([, resultado]) => resultado.valido);
    if (todoValido) {
      window.location.href = 'payment-success.html';
    }
  });
});
