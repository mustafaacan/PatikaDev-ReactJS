const getComment = (number) => {
  return new Promise((resolve, reject) => {
    if (number == 1) {
      resolve("Success");
    } else {
      reject("Failed");
    }
  });
};

getComment("1")
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("Promise ops completed");

    // Another example

    function wait() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Hello from wait function");
        }, 2000);
      });
    }

    async function run() {
      console.log("Inside run function and waiting for wait function result");
      let result = await wait();

      console.log(result);
    }

    run();
  });
