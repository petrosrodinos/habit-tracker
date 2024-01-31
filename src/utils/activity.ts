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
