import { Activity, Day } from "../interfaces/activity";

export const getDayOfWeekNumber = (): number => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  return ((dayOfWeek + 6) % 7) + 1;
};

export const getTimeForTodaysActivity = (item: Activity) => {
  const dayOfWeek = item.days.find((day) => day.id === getDayOfWeekNumber()) as Day;

  return dayOfWeek.time.split("T")[1];
};

export const compareTimes = (timeA: string | undefined, timeB: string | undefined): number => {
  if (!timeA || !timeB) return 0;
  const d = new Date();
  d.setHours(parseInt(timeA.split(":")[0]));
  d.setMinutes(parseInt(timeA.split(":")[1]));

  const d2 = new Date();
  d2.setHours(parseInt(timeB.split(":")[0]));
  d2.setMinutes(parseInt(timeB.split(":")[1]));

  if (d > d2) {
    return 1;
  } else if (d < d2) {
    return -1;
  } else {
    return 0;
  }
};
