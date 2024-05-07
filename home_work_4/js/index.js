"use strict";

// Для вирішення цієї задачі вам буде потрібно згадати про перетворення у рядочкі та числа,
//  а також використати декілька методів масивів, які ми розбирали на вебінарі:

const currentMaxValue = 9854;
let reverseMaxValue;

// reverseMaxValue = String(currentMaxValue).split("").join("");
reverseMaxValue = Number(String(currentMaxValue).split("").reverse().join(""));

// reverseMaxValue.sort((a, b) => {
//   if (a < b) {
//     return 1;
//   } else if (a > b) {
//     return -1;
//   }
// });

// reverseMaxValue = parseInt(reverseMaxValue.join(""));

console.log(reverseMaxValue); // 9854
console.log(typeof reverseMaxValue); // 'number'

// Задача на знаходження добутку масиву чисел з
//  невідомою глибиною вкладеності:

const resultsArray = [1, 2, [3, [4]]];
let productOfArray;

// тут ваш код...
productOfArray = resultsArray.flat(Infinity).reduce((prev, current) => {
  return prev * current;
});

console.log(productOfArray); // 24
