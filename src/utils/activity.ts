export const getDayOfWeekNumber = (): number => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  return ((dayOfWeek + 6) % 7) + 1;
};
