import { MILLS_PER_DAY } from "../constants/constants";

export const getDaysDiff = (endDate: Date, startDate: Date): number => {
  const diff = endDate.getTime() - startDate.getTime();
  return Math.floor(diff / MILLS_PER_DAY);
};
