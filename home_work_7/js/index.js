"use strict";

// 1. Напишіть функцію detonatorTimer(delay) використовуючи setInterval
// Вона виводить в консоль число кожну секунду,
//  починаючи з delay (ціле число) і в кінці замість 0 виведе 'BOOM!'

// detonatorTimer(3);
// // 3
// // 2
// // 1
// // BOOM!

// function detonatorTimer(delay) {
//   let timer = delay;
//   let timerId = setInterval(() => {
//     if (timer > 0) {
//       console.log(timer);
//       timer--;
//     } else {
//       console.log("BOOM!");
//       clearInterval(timerId);
//     }
//   }, 1000);
// }

// 2. Напишіть функцію detonatorTimer(delay) використовуючи вкладений setTimeout
// Вона виводить в консоль число кожну секунду, починаючи з delay (ціле число)
//  і в кінці замість 0 виведе 'BOOM!'

// detonatorTimer(3);
// 3
// 2
// 1
// BOOM!

// function detonatorTimer(delay) {
//   let timer = delay;

//   function timerId() {
//     if (timer > 0) {
//       console.log(timer);
//       timer--;
//       setTimeout(timerId, 1000);
//     } else {
//       console.log("BOOM!");
//     }
//   }
//   timerId();
// }

// 3. Напишіть об'єкт в якому опишіть свої довільні властивості
// та довільні методи що ці властивості виводять.
// Наприклад:

let me = {
  name: "Artem",
  residency: "Ivano Frankivsk",
  work: "army",
  gender: "male",
  age: 32,
  hobby: "gym",
  defaultMood: "focused",
  currentMood: "actinium",
  introduce() {
    console.log(`My name is ${this.name} and I live in ${this.work}`);
  },
  prognose() {
    console.log(`I hope that next year I'm gonna be ${this.age + 1}`);
  },
  describeMyMood() {
    console.log(`Mostly I'm ${this.defaultMood}, but now I'm ${this.currentMood}`);
  },
};

me.introduce();
me.prognose();
me.describeMyMood();

// 4. А тепер зробіть всі свої методи з попередньої задачі прив'язаними до контексту свого об'єкту
// Аби вони були захищені від перезапису об'єкту і їх можна було викликати в таймері:

let securedSelfIntroduce = me.introduce.bind(me);
let securedSelfPrognose = me.prognose.bind(me);
let securedSelfDescribeMyMood = me.describeMyMood.bind(me);

setTimeout(securedSelfIntroduce, 1000); // виведе коректний результат
setTimeout(securedSelfPrognose, 2000); // виведе коректний результат
setTimeout(securedSelfDescribeMyMood, 3000); // виведе коректний результат
