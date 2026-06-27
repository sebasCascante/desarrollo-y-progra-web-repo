//Strings

const nombre = "sebas";
const letra = "a";
const str = "hola, 'prueba'";

const strTemplate = `hola, caballero ${nombre}`;
console.log(strTemplate);

const concat = str + " " + nombre; //cadena concatenada con otra cadena

const letraEnIndice = nombre[2];

console.log(letraEnIndice);


//Numbers

const num = 5;
const numFlotante = 5.5;

//Boolean
const verdadero = true;
const falso = false;

//and

verdadero && verdadero;

//or
falso || falso;

//not
!verdadero;

//null y undefined
let nulo = null;
let undefined; // no esta definida con nada
console.log(undefined);

//comparacion
let num1 = 20;
let num2 = '20';

// === estrictamente igual
// == igual

if(num1 == num2){
    console.log("son iguales ?");
}





