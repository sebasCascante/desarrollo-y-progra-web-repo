window.onload = function(){
    const button1 = document.getElementById("button1");
    console.log(button1);
}

let counter = 0;

const button2 = document.getElementById("button2");


//first way anon function
button2.onclick = function(){
    counter++;
    console.log(counter);
    
}

function function1 () {
    console.log("function 1");
}


//second way onclick
function function2 () {
    console.log("function 2");
}


//third way listener
const button3 = document.getElementById("button3");

button3.addEventListener("click", function3);

function function3 () {
    console.log("function 3");
}