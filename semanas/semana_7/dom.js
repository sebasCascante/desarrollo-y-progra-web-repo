window.onload = function(){
    const button1 = document.getElementById("button1");
    console.log(button1);
}

let contador = 0;

const button2 = document.getElementById("button2");


//first way anon function
button2.onclick = function(){
    contador++;
    console.log(contador);
    
}

function function1 () {
    console.log("funcion 1");
}


//second way onclick
function function2 () {
    console.log("funcion 2");
}


//third way listener
const button3 = document.getElementById("button3");

button3.addEventListener("click", funcion3);

function function3 () {
    console.log("funcion 3");
}