/**
 * This file content is to modify/create html content with javascript
 */

//look for the target container on the html
const containerWay1 = document.querySelector("#students-list-1");
console.log(containerWay1);

//create an element
const title = document.createElement("h1");

//append content to the element
title.innerText = "students list";
console.log(title);

//append the element to something already in the doc
containerWay1.appendChild(title);

//convert the array to html
const students = ["Kai", "Sebas", "Orlo", "Marco", "Jose"];

const listWay1 = document.createElement("ol");
console.log(listWay1);

for(let i = 0; i < students.length; i++){
    const listElement = document.createElement("li");
    listElement.innerText = students[i];
    listWay1.appendChild(listElement);
}

containerWay1.appendChild(listWay1);


const containerWay2 = document.querySelector("#students-list-2");
console.log(containerWay2);

//const htmlInjectionWay2 = `
//    <ol>
//        ${students.map((student) =>
            //`<li>${student}</li>`).join("");
//        },
//    </ol>
//`;

//containerWay2.innerHTML = htmlInjectionWay2;