'strict'

console.log("Hola desde el JS");
console.warn("printear un peligro en la consola");

//console.error("printear un error en la consola");

/**
 * I've never seen this before
 *  @param nombreEstudiante str nombre del estudiante
 */
function saludar(nombreEstudiante) {
    console.log("hola querido", nombreEstudiante, "!");
}

//declarar una variable
let verdadero;
//inicializar esa variable
verdadero = false;

//formas para declarar variables
let variable = "valor";
variable = true;
let edad = 20;

var variableGlobal = "hola";

let condicion;

if(variable) {
    console.log(edad);
    let miniatura;
    let perro = "toba";
    var pesoPerro = "termotanque";
    
    if(perro != "haiti"){
        console.log(miniatura);
    }
    condicion = true;
} else {
    condicion = false;
}

const constante = 20;
// constante = 50; no se puede

const listaEstudiantes = ["bryan","sebas","orlo","marco"];

listaEstudiantes.push("david");
console.log(listaEstudiantes);