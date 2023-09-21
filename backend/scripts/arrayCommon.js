const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];

// console.log(arr1.some((el) => arr2.includes(el)));
const diff1 = arr1.filter((el) => !arr2.includes(el));
const diff2 = arr2.filter((el) => !arr1.includes(el));

console.log({ diff1, diff2 });
