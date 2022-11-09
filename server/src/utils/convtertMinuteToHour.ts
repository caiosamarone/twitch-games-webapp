//1800  =>  "18:00"
export function convtertMinuteToHour(minutesAmout: number) {
  const hours = String(Math.floor(minutesAmout / 60)).padStart(2, "0");
  const minutes = String(minutesAmout % 60).padStart(2, "0");

  return `${hours}:${minutes}`;
}
