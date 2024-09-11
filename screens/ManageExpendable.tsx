// Core
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { FC, useContext } from "react";
import { StyleSheet, View } from "react-native";

// Context
import { ExpendablesContext } from "../store/expendables-context";

// Components
import ManageExpendableForm from "../Forms/ManageExpendableForm";

// Types
import { TExpendable } from "../models/Expendables";

// Constants
import { GLOBAL_STYLES } from "../constants/styles";
import { ROUTES } from "../constants/constants";

const ManageExpendable: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const expendablesCtx = useContext(ExpendablesContext);

  const handleSubmit = (values: TExpendable) => {
    expendablesCtx.addExpendable(values);
    navigation.navigate(ROUTES.expendables);
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
