"use strict";

let value = parseInt(prompt("Введіть число", "0"));
if (isNaN(value)) {
  console.log("Помилка: введіть число");
}

for (let i = 1; i < value; i++) {
  if (Number.isInteger(value)) {
    if (i % 2 === 0) console.log(`for ${i}`);
  }
}

let index = 1;
while (value > index) {
  if (Number.isInteger(value)) {
    if (index % 2 === 0) console.log(`while ${index}`);
    index++;
  }
}

for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else {
    console.log(i);
  }
}
// Без перетворення в число
// let string = "42559125";
// let result = "";
// for (let i = 0; i < string.length; i++) {
//   if (string[i] < 5) {
//     result += "0";
//   } else {
//     result += "1";
//   }
// }
// console.log(result);

let string = "42559125";
let result = "";
for (let i = 0; i < string.length; i++) {
  let transToNum = parseInt(string[i]);
  if (transToNum < 5) {
    result += "0";
  } else {
    result += "1";
  }
}
console.log(`result = ${result}`);
