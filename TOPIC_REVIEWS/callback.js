import fetch from "node-fetch";

// CALLBACK USAGE WITH PARAMETER
const greeting = (name, callback) => {
  callback(name);
};

const cb = (name) => {
  console.log(`greatings from CALLBACK function to ${name}`);
};

greeting("MUSTAFA", cb);

// FETCH USAGE FOR API
// parameter names are optional !!!
// await pauses an async function until a Promise resolves, similar to chaining .then().

// await response.json() = response.json().then()

fetch("https://jsonplaceholder.typicode.com/todos/10")
  .then((response) => response.json()) // response encoded as json
  .then((json) => console.log(json)); // encoded response logged.

//

// IMPORTANT NOTE: If we make multiple fetch calls without nesting them, their responses
// may be received in a random (unordered) order; therefore, for ordered execution,
// we must use asynchronous structures

/* 
console.log("----------- UNORDERED USAGE ------------");

fetch("https://jsonplaceholder.typicode.com/todos/100")
  .then((response) => response.json())
  .then((json) => console.log("RESPONSE FROM 1ST FETCH", json));

fetch("https://jsonplaceholder.typicode.com/todos/3")
  .then((response) => response.json())
  .then((json) => console.log("RESPONSE FROM 2ND FETCH", json));


*/

console.log("\n----------- ORDERED USAGE (Promise Chain) ------------\n");

fetch("https://jsonplaceholder.typicode.com/todos/100")
  .then((response) => response.json())
  .then((json) => console.log("RESPONSE FROM 1ST FETCH", json))
  .then(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/3")
      .then((response) => response.json())
      .then((json) => console.log("RESPONSE FROM 2ND FETCH", json));
  });

// ASYNC - AWAIT USAGE
setTimeout(() => {
  console.log("\n----------- ASYNC - AWAIT USAGE ------------\n");

  async function run() {
    try {
      await func1();
      console.log("func1 just called. Now func2 is waiting");

      await func2();
      console.log("func2 just called. operation has ended\n");
    } catch (err) {
      console.log(err);
    }
  }

  run();
}, 2000);

/* 

// Time Out usage
setTimeout(() => {
  console.log("Hello after 2 seconds");
}, 2000);

let count = 0;

// Time Interval Usage
const interval = setInterval(() => {
  count++;
  console.log(`Hello from repeatly counter (${count} count)`);

  if (count >= 4) {
    clearInterval(interval);
    console.log("Counter finished");
  }
}, 1000);


*/
