const students = ["Kai", "Sebas", "Orlo", "Marco", "Jose"];

console.log(students[3]);
console.log(students.length);

// Add something to the array

students.push("Aylin"); //added at the end
students.unshift("David"); //added at the beginning

//delete something from the array
students.pop() //delete de last one
console.log(students);
students.shift(); //delete the first one
console.log(students);
students.splice(2, 3);
console.log(students);

console.log(students.includes("Kai")); //returns a boolean on whether the entry exist or not
console.log(students.indexOf("Sebas")); //returns the index of the element | -1 if it does not exist

//Array methods

//convert all elements to UpperCase
const studentsCapital = students.map((student) => 
    student.toUpperCase(),
);

console.log(studentsCapital);

//returns the elements with length higher than '4'
const longName = students.filter((student) =>
    student.length > 4,
);
console.log(longName);

//returns the all the elements joined by "" in one string
const studentsInOneWord = students.join("");
console.log(studentsInOneWord);



