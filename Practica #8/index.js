//Arreglo que guarda el historial de calculos realizados en esta sesion
const historial = [];

/**
 * funcion: recibe peso y altura, devuelve el IMC calculado.
 * Responsabilidad unica: solo hace el calculo matematico.
 */
function calcularIMC(peso, altura){
  return peso /(altura * altura);
}

/**
 * funcion: recibe un valor de IMC, devuelve la categoria correspondiente.
 * Responsabilidad unica: solo clasifica, no calcula ni muestra nada.
 */
function obtenerCategoria(imc){
  if(imc < 18.5){
    return "Bajo peso";
  } else if(imc >= 18.5 && imc < 25){
    return "Peso normal";
  } else if(imc >= 25 && imc < 30){
    return "Sobrepeso";
  } else{
    return "Obesidad";
  }
}

/**
 * Funcion auxiliar: valida que los datos ingresados sean correctos.
 * Devuelve un mensaje de error(string) o null si todo esta bien.
 */
function validarDatos(peso, altura){
  if(isNaN(peso) || isNaN(altura)){
    return "Por favor completa ambos campos con numeros validos.";
  }
  if(peso <= 0 || altura <= 0){
    return "El peso y la altura deben ser mayores a cero.";
  }
  if(altura > 3){
    return "Revisa la altura: debe estar en metros(ej: 1.70), no en centimetros.";
  }
  return null;
}

/**
 * Muestra el historial completo en el DOM usando un ciclo for...of.
 */
function mostrarHistorial(){
  const lista = document.getElementById("listaHistorial");
  lista.innerHTML = "";

  for(const registro of historial){
    const item = document.createElement("li");
    item.textContent = `Peso: ${registro.peso} kg, Altura: ${registro.altura} m → IMC: ${registro.imc}(${registro.categoria})`;
    lista.appendChild(item);
  }
}

//evento: click en el boton "Calcular IMC"
document.getElementById("btnCalcular").addEventListener("click", function(){
  const pesoInput = document.getElementById("peso").value;
  const alturaInput = document.getElementById("altura").value;

  const peso = parseFloat(pesoInput);
  const altura = parseFloat(alturaInput);

  const errorValidacion = validarDatos(peso, altura);
  const divResultado = document.getElementById("resultado");

  if(errorValidacion !== null){
    divResultado.textContent = errorValidacion;
    divResultado.className = "resultado-error";
    return;
  }

  const imc = calcularIMC(peso, altura);
  const imcRedondeado = imc.toFixed(2);
  const categoria = obtenerCategoria(imc);

  divResultado.textContent = `Tu IMC es ${imcRedondeado} → Categoria: ${categoria}`;
  divResultado.className = "resultado-ok";

  historial.push({
    peso: peso,
    altura: altura,
    imc: imcRedondeado,
    categoria: categoria
  });

  mostrarHistorial();
});

//evento: click en el boton "Limpiar historial"
document.getElementById("btnLimpiar").addEventListener("click", function(){
  historial.length = 0;
  mostrarHistorial();
  document.getElementById("resultado").textContent = "";
  document.getElementById("resultado").className = "";
  document.getElementById("peso").value = "";
  document.getElementById("altura").value = "";
});