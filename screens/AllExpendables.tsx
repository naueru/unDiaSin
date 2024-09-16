// Core
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useContext } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";

// Context
import {
  ExpendablesContext,
  IExpendablesContext,
} from "../store/expendables-context";

// Components
import Title from "../components/Title";
import ExpendableCard from "../components/ExpendableCard";

// Constants
import { ROUTES } from "../constants/constants";
import { GLOBAL_STYLES } from "../constants/styles";

const AllExpendables: FC = () => {
  const ExpendablesCtx = useContext<IExpendablesContext>(ExpendablesContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const hasExpendables = ExpendablesCtx.expendables.length > 0;

  const content = hasExpendables ? (
    <View>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={ExpendablesCtx.expendables}
        renderItem={({ item }) => <ExpendableCard expendable={item} />}
        keyExtractor={(item) => `expendable_${item.id}`}
      />
    </View>
  ) : (
    <View style={styles.emptyContentContainer}>
      <Title label="Todavía no tienes nada agregado" />
      <Button
        onPress={() => {
          navigation.navigate(ROUTES.manageExpendable);
        }}
        title="Nuevo veneno"
      />
    </View>
  );

  return <View style={styles.outerContainer}>{content}</View>;
};

export default AllExpendables;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: GLOBAL_STYLES.colors.primary500,
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    gap: 32,
    padding: 16,
  },
  emptyContentContainer: {
    alignItems: "center",
    backgroundColor: GLOBAL_STYLES.colors.primary500,
    gap: 32,
  },
});
