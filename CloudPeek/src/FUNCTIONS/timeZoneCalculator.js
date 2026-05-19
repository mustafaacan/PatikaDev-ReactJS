const getTimeZone = () => {
  let timeZone = { tz: "Unknown", mes: "TimeZone Successfully Obtained" };
  try {
    let time = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timeZone.tz = time;
  } catch (error) {
    timeZone.tz = "Unknown";
    timeZone.mes = error;
  } finally {
    return timeZone;
  }
};

export default getTimeZone;
