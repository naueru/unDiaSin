// Constants
import { DAYS_PER_MONTH, MILLS_PER_DAY } from "../constants/constants";

export const getDaysDiff = (endDate: Date, startDate: Date): number => {
  const diff = endDate.getTime() - startDate.getTime();
  return Math.floor(diff / MILLS_PER_DAY);
};

export const getMaxDaysInMonth = (month: number, year: number) => {
  let days = DAYS_PER_MONTH[month - 1];
  if (month === 2 && year % 4 === 0) days++;
  return days;
};
