import axios from "axios";

async function data(methodname, url, userID) {
  const action = url + userID;

  try {
    const res = await axios({ method: methodname, url: action });
    console.log(`method ${methodname} success`);
    return res.data;
  } catch (err) {
    const status = err?.response?.status;
    return await Promise.reject(
      new Error(`method ${methodname} failed${status ? `: ${status}` : ""}`));
  }
}

async function getData(number) {
  const userID = number;

  if (typeof number === "number") {
    if (number > 0) {
      try {
        const get = await data(
          "GET",
          "https://jsonplaceholder.typicode.com/users/",
          userID,
        );

        const post = await data(
          "GET",
          "https://jsonplaceholder.typicode.com/posts?userId=",
          userID,
        );

        return { get, post };
      } catch (error) {
        throw error;
      }
    } else {
      return "Parameter value is not suitable";
    }
  } else {
    return "Parameter type is not suitable";
  }
}

export default getData;
