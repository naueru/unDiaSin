export type TExpendable = {
  id: string;
  name: string;
  initDay: string;
  initMonth: string;
  initYear: string;
  icon: string;
  cost: string;
  timesPerDay: string;
};

export type TExpendables = Array<TExpendable>;
