"use strict";

// // 1. Напишіть функцію яка буде використовуватись для сортування масиву фільмів
// // Функція буде приймати два аргумента:
// // властивість за якою треба посортувати ватиопцію напрямку сортування (зростання чи спадання)

const movies = [
  {
    movieName: "The Thing",
    releaseYear: 1982,
    directedBy: "Carpenter",
    runningTimeInMinutes: 109,
  },
  {
    movieName: "Aliens",
    releaseYear: 1986,
    directedBy: "Cameron",
    runningTimeInMinutes: 137,
  },
  {
    movieName: "Men in Black",
    releaseYear: 1997,
    directedBy: "Sonnenfeld",
    runningTimeInMinutes: 98,
  },
  {
    movieName: "Predator",
    releaseYear: 1987,
    directedBy: "McTiernan",
    runningTimeInMinutes: 107,
  },
];

console.log(movies.sort(byProperty("releaseYear", ">")));
// виведе масив фільмів посортованих по року випуску, від старішого до новішого
console.log(movies.sort(byProperty("runningTimeInMinutes", "<")));
// виведе масив фільмів посортованих по їх тривалості, від найдовшого до найкоротшого
console.log(movies.sort(byProperty("movieName", ">")));
// виведе масив фільмів посортованих по назві, в алфавітному порядку

function byProperty(property, direction) {
  return function (a, b) {
    const clonedArray = [...movies];
    if (direction === ">") {
      return a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0;
    } else if (direction === "<") {
      return a[property] < b[property] ? 1 : a[property] > b[property] ? -1 : 0;
    }
    return clonedArray;
  };
}

// 2. Напишіть функцію-декоратор яка вповільнює виконання довільної функції на вказану кількість секунд.

function someFunction(a, b) {
  let result = a * b;
  console.log(result);
  return result;
}

function slower(func, seconds) {
  return function () {
    console.log(`Chill out, you will get your result in ${seconds} seconds`);
    setTimeout(() => {
      func.apply(this, arguments);
    }, seconds * 1000);
  };
}

let slowedSomeFunction = slower(someFunction, 5); // обгортаєте свою довільну функцію 'someFunction' в декоратор і задає значення вповільнення
slowedSomeFunction(5, 5); // викликаєте декоратор

// виведе в консоль "Chill out, you will get you result in 5 seconds
//...через 5 секунд виведе результат роботи 'someFunction'
