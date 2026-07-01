export const timeFormatter = (time) => {
  const twelveHourFormat = false;
  let formattedTime = "";
  const unformattedTime = new Date(time);
  formattedTime = unformattedTime.toLocaleString("en-US", {
    hour: twelveHourFormat ? "numeric" : "2-digit",
    minute: "2-digit",
    hour12: twelveHourFormat,
  });
  return formattedTime;
};
