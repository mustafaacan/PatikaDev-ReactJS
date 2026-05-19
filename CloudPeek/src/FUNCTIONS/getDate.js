const FormattedDate = () => {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hour = now.getHours();
  const minute = now.getMinutes();

  return `${year}-${month}-${day} ${hour}:${minute}`;
};

export default FormattedDate;
