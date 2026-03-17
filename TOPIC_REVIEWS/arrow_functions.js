const arr = ["mustafa", "mert", "jhon", "jane"];

arr.push("Anjelica");

console.log(arr);

arr.map((item) => {
  console.log(item);
});

const arr2 = [
  { name: "mustafa", age: 20 },
  { name: "mert", age: 30 },
  { name: "jhon", age: 10 },
];

const result = arr2.filter((item) => {
  return item.name.startsWith("m") && item.age > 20;
});

console.log(result);
