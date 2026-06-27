//Strings

const name = "sebas";
const letter = "a";
const str = "hello, 'test'";

const strTemplate = `hello, gentlemen ${name}`;
console.log(strTemplate);

const concat = str + " " + name; //an str + another str combined

const letterOnIndex = name[2];

console.log(letterOnIndex);


//Numbers

const num = 5;
const floatNumber = 5.5;

//Boolean
const trueValue = true;
const falseValue = false;

//and

trueValue && trueValue;

//or
falseValue || falseValue;

//not
!trueValue;

//null & undefined
let nulo = null;
let undefined; // is not defined with any value
console.log(undefined);

//matching
let num1 = 20;
let num2 = '20';

// === strictlly equals
// == equals

if(num1 == num2){
    console.log("are these ones equals ?");
}





