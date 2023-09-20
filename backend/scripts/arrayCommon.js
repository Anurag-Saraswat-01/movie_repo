const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];

console.log(arr1.some((el) => arr2.includes(el)));
