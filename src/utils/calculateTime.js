export const getTimeInSeconds = (hours, minutes, seconds) => {
  return hours * 3600 + minutes * 60 + seconds;
};

export const getHoursMinutesSecondsFromSeconds = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const hoursModulo = seconds % 3600;
  const min = Math.floor(hoursModulo / 60);
  const sec = hoursModulo % 60;
  return {
    hours: h,
    minutes: min,
    seconds: sec,
  };
};
