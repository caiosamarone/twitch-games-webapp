//18:00 => 1800
export function convertHourToMinute(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number);
  const minutesAmount = hours * 60 + minutes;
  return minutesAmount;
}