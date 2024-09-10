import { FC, useContext } from "react";
import { StyleSheet, View } from "react-native";
import ManageExpendableForm from "../Forms/ManageExpendableForm";
import { GLOBAL_STYLES } from "../constants/styles";
import { ExpendablesContext } from "../store/expendables-context";
import { TExpendable } from "../models/Expendables";

const ManageExpendable: FC = () => {
  const expendablesCtx = useContext(ExpendablesContext);
  const handleSubmit = (values: TExpendable) => {
    expendablesCtx.addExpendable(values);
  };
  return (
    <View style={styles.container}>
      <ManageExpendableForm
        label="Nuevo Veneno"
        onCancel={() => alert("Canceled")}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

export default ManageExpendable;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: GLOBAL_STYLES.colors.primary500,
    flex: 1,
    justifyContent: "center",
  },
});
