// require("") --> import ... from ... structure can be provided by adding "type":"module" to target package.json
// require("") wont be able to use
import slugify from "slugify";
import summary from "./external.js";

const keyword = slugify("some string for update", "*");
console.log(keyword);

const sum1 = summary(1, 2, 3, 4, 5);
const sum2 = summary(1, 2, "3");

console.log(`Total result of sum1 is ${sum1} and type is ${typeof sum1}`);
console.log(`Total result of sum2 is ${sum2} and type is ${typeof sum2}`);
