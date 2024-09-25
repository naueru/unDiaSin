// Core
import { FC, useContext } from "react";

// Context
import {
  ExpendablesContext,
  IExpendablesContext,
} from "../store/expendables-context";

// Components
import Button from "./Button";

const DummyDataButton: FC = () => {
  const ctx = useContext<IExpendablesContext>(ExpendablesContext);

  return (
    <Button
      onPress={() =>
        ctx.addExpendable({
          id: Date.now().toString(),
          name: "Monster",
          initDay: "13",
          initMonth: "9",
          initYear: "2024",
          icon: "skull",
          cost: "2000",
          timesPerDay: "2",
        })
      }
      title="+"
      primary={false}
    />
  );
};

export default DummyDataButton;
