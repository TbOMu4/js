"use strict";

// Напишіть функцію яка ітеративно (в циклі) буде
// знаходити суму всіх непарних додатніх чисел до якогось числа.

function iterativeOddSumTo(number) {
  let sum = 0;
  for (let i = number; i >= 0; i--) {
    if (i % 2 !== 0) {
      sum += i;
    }
  }
  return sum;
}

console.log(iterativeOddSumTo(1)); // 1
console.log(iterativeOddSumTo(9)); // 25
console.log(iterativeOddSumTo(10)); // 25

// Напишіть функцію яка рекурсивно буде знаходити
// суму всіх непарних додатніх чисел до якогось числа.

function recursiveOddSumTo(number) {
  if (number === 1) {
    return number;
  }
  if (number % 2 !== 0) {
    return number + recursiveOddSumTo(number - 1);
  } else {
    return recursiveOddSumTo(number - 1);
  }
}

console.log(recursiveOddSumTo(1)); // 1
console.log(recursiveOddSumTo(9)); // 25
console.log(recursiveOddSumTo(10)); // 25

// Напишіть стрілочну функцію isXOEqual яка перевіряє
//  чи рядок має однакову кількість символів «x» та «o».
//  Функція повинна повертати логічне значення та бути
//   нечутливою до регістру. Рядок може містити будь-які символи.

const isXOEqual = (str) => {
  return str.toLowerCase().split("x").length === str.toLowerCase().split("o").length;
};

console.log(isXOEqual("ooxx")); // true
console.log(isXOEqual("xooxx")); // false
console.log(isXOEqual("ooxXm")); // true
console.log(isXOEqual("zpzpzpp")); // коли немає 'x' та 'o' то має повертати true бо 0 = 0
console.log(isXOEqual("zzoo")); // false
