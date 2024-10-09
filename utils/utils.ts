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

export const debounce = (mainFunction: Function, delay: number = 300) => {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
};

export const createNumberPickerArrays = (max: number, min: number = 0) => [
  null,
  ...new Array(max).fill(null as never, 0).map((_, i) => i + min),
  null,
];
