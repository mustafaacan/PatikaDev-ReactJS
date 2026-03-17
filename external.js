function summary(...arg) {
  const check = arg.filter((item) => {
    return typeof item == "string";
  }).length;

  if (check === 0) {
    return arg.reduce((total, value) => total + value, 0);
  } else {
    return arg.join("");
  }
}

export default summary;
