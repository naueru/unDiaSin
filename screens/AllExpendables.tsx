// Core
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useContext } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Context
import {
  ExpendablesContext,
  IExpendablesContext,
} from "../store/expendables-context";

// Components
import Title from "../components/Title";
import ExpendableCard from "../components/ExpendableCard";

// Utils
import { createThemedStyle } from "../utils/styles";

// Constants
import { ROUTES } from "../constants/constants";

const AllExpendables: FC = () => {
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];
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

const computedStyles = createThemedStyle({
  outerContainer: {
    backgroundColor: "primary500",
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    gap: 32,
    padding: 16,
  },
  emptyContentContainer: {
    alignItems: "center",
    backgroundColor: "primary500",
    gap: 32,
  },
});
