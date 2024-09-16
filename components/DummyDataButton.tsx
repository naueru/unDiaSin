// Core
import { FC, useContext } from "react";
import { Button } from "react-native";

// Context
import { ExpendablesContext } from "../store/expendables-context";

const DummyDataButton: FC = () => {
  const ctx = useContext(ExpendablesContext);
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
    />
  );
};

export default DummyDataButton;
