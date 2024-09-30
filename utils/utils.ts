export const throttle = (mainFunction: Function, delay: number = 300) => {
  let timerFlag: null | ReturnType<typeof setTimeout> = null;
  return (...args: any[]) => {
    if (timerFlag === null) {
      mainFunction(...args);
      timerFlag = setTimeout(() => {
        timerFlag = null;
      }, delay);
    }
  };
};
