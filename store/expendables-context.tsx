// Core
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useState } from "react";

// Types
import { TExpendable, TExpendables } from "../models/Expendables";

// Constants
import { STORAGE_KEY_EXPENDABLES } from "../constants/constants";

export interface IExpendablesContext {
  expendables: TExpendables;
  addExpendable: Function;
  updateExpendable: Function;
  deleteExpendable: Function;
  setExpendables: Function;
}

export const ExpendablesContext = createContext<IExpendablesContext>({
  expendables: [],
  addExpendable: () => {},
  updateExpendable: () => {},
  deleteExpendable: () => {},
  setExpendables: () => {},
});

const ExpendablesContextProvider = ({ children }: PropsWithChildren) => {
  const [expendables, setExpendables] = useState<TExpendables>([]);

  const addExpendable = (expendable: TExpendable) => {
    setExpendables((current) => [...current, expendable]);
    AsyncStorage.setItem(
      STORAGE_KEY_EXPENDABLES + expendable.id,
      JSON.stringify(expendable)
    );
  };

  const updateExpendable = (id: string, payload: TExpendable) => {
    const newState = [...expendables];
    newState[expendables.findIndex((expendable) => expendable.id === id)] =
      payload;
    setExpendables(() => newState);
    AsyncStorage.setItem(
      STORAGE_KEY_EXPENDABLES + payload.id,
      JSON.stringify(payload)
    );
  };

  const deleteExpendable = (id: string) => {
    setExpendables(() =>
      expendables.filter((expendable) => expendable.id !== id)
    );
    AsyncStorage.removeItem(STORAGE_KEY_EXPENDABLES + id);
  };

  const value = {
    expendables: expendables,
    addExpendable,
    updateExpendable,
    deleteExpendable,
    setExpendables,
  };

  return (
    <ExpendablesContext.Provider value={value}>
      {children}
    </ExpendablesContext.Provider>
  );
};

export default ExpendablesContextProvider;
