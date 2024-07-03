"use strict";

// 1.
console.log("start");

const promise1 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
});

promise1.then((res) => {
  console.log(res);
});
console.log("end");

// clg("start")виконується спочатку, виводячи start
// Створюється новий Promise promise1, всередині функції виклику цього Promise, виконується clg(1), тому виводиться 1
// Promise promise1 resolve зі значенням 2
// clg("end") виконується наступним, виводячи end
// then що прикріплений до promise1, викликається після завершення основного скрипту. Таким чином, clg(res) виводить 2

// 2.
Promise.resolve(1)
  .then((x) => x + 1)
  .then((x) => {
    throw new Error("My Error");
  })
  .catch(() => 1)
  .then((x) => x + 1)
  .then((x) => console.log(x))
  .catch(console.error);

// Promise.resolve(1) створює резолвлений Promise зі значенням 1
// перший then x(1) + 1 = 2
// другий then викидає помилку Error("My Error");
// catch обробляє помилку і повертає 1
// третя then x(1) + 1 = 2
// четвертий then виводить 2
// другий catch не виконується за відсутності помилки

// 3.
const promise = new Promise((res) => res(2));
promise
  .then((v) => {
    console.log(v);
    return v * 2;
  })
  .then((v) => {
    console.log(v);
    return v * 2;
  })
  .finally((v) => {
    console.log(v);
    return v * 2;
  })
  .then((v) => {
    console.log(v);
  });

// створюємо новий Promise зі значенням 2
// clg(v) виводить 2, v*2=4
// clg(v) виводить 4, v*4=8
// finally не отримує аргументів, тому v тут буде undefined
// останній then вивдодить 8, значення з попередного then
