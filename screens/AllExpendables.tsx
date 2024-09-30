// Core
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useContext } from "react";
import { FlatList, View } from "react-native";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Context
import { TranslationsContext } from "../store/language-context";
import {
  ExpendablesContext,
  IExpendablesContext,
} from "../store/expendables-context";

// Components
import ExpendableCard from "../components/ExpendableCard";
import PanNavigator from "../components/PanNavigator";
import Button from "../components/Button";
import Title from "../components/Title";

// Utils
import { createThemedStyle } from "../utils/styles";

// Constants
import { ROUTES } from "../constants/constants";

const AllExpendables: FC = () => {
  const { translation } = useContext(TranslationsContext);
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
      <Title label={translation.ALL_EXPENDABLES_EMPTY_LABEL} />
      <Button
        onPress={() => {
          navigation.navigate(ROUTES.manageExpendable);
        }}
        title={translation.NEW_EXPENDABLE}
      />
    </View>
  );

  return (
    <PanNavigator>
      <View style={styles.outerContainer}>{content}</View>
    </PanNavigator>
  );
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
