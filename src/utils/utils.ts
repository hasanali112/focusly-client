export const calculateDuration = (startTime: string, endTime: string) => {
  if (!startTime || !endTime) return "-";

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  let hourDiff = endHour - startHour;
  let minuteDiff = endMinute - startMinute;

  if (minuteDiff < 0) {
    hourDiff--;
    minuteDiff += 60;
  }

  if (hourDiff < 0) {
    hourDiff += 24;
  }

  return `${hourDiff}h ${minuteDiff}m`;
};
