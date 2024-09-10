import { createContext, PropsWithChildren, useState } from "react";
import { TExpendable, TExpendables } from "../models/Expendables";

interface IExpendablesContext {
  expendables: TExpendables;
  addExpendable: Function;
  updateExpendable: Function;
  deleteExpendable: Function;
}

export const ExpendablesContext = createContext<IExpendablesContext>({
  expendables: [],
  addExpendable: () => {},
  updateExpendable: () => {},
  deleteExpendable: () => {},
});

const ExpendablesContextProvider = ({ children }: PropsWithChildren) => {
  const [expendables, setExpendables] = useState<TExpendables>([]);

  const addExpendable = (expendable: TExpendable) => {
    setExpendables((current) => [...current, expendable]);
  };
  const updateExpendable = () => {
    setExpendables([]);
  };
  const deleteExpendable = (id: string) => {
    setExpendables(() =>
      expendables.filter((expendable) => expendable.id !== id)
    );
  };

  const value = {
    expendables: expendables,
    addExpendable,
    updateExpendable,
    deleteExpendable,
  };

  return (
    <ExpendablesContext.Provider value={value}>
      {children}
    </ExpendablesContext.Provider>
  );
};

export default ExpendablesContextProvider;
