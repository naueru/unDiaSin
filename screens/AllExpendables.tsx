// Core
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useContext, useLayoutEffect, useRef } from "react";
import { Alert, FlatList, View } from "react-native";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Context
import { TranslationsContext } from "../store/language-context";
import {
  ExpendablesContext,
  IExpendablesContext,
} from "../store/expendables-context";

// Components
import ActionItem, { TActionItemProps } from "../components/ActionItem";
import ExpendableCard from "../components/ExpendableCard";
import PressableIcon from "../components/PressableIcon";
import PanNavigator from "../components/PanNavigator";
import BSModal from "../components/BSModal";
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
  const expendablesCtx = useContext<IExpendablesContext>(ExpendablesContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const sheetRef = useRef<BottomSheetModal>(null);

  const hasExpendables = expendablesCtx.expendables.length > 0;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableIcon
          name="ellipsis-vertical"
          onPress={() => sheetRef.current?.present()}
        />
      ),
    });
  });

  const content = hasExpendables ? (
    <View>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={expendablesCtx.expendables}
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
      <BSModal ref={sheetRef}>
        <BottomSheetFlatList
          contentContainerStyle={styles.actionsContentContainer}
          data={[
            {
              label: translation.DELETE_ALL_EXPENDABLES,
              onPress: () => {
                Alert.alert(
                  translation.ARE_YOU_SURE,
                  translation.REMOVE_DESCRIPTION,
                  [
                    { text: translation.CANCEL, style: "cancel" },
                    {
                      text: translation.REMOVE,
                      style: "destructive",
                      onPress: () => {
                        expendablesCtx.deleteAllExpendables();
                        navigation.navigate(ROUTES.expendables);
                      },
                    },
                  ],
                  { cancelable: true }
                );
                sheetRef.current?.dismiss();
              },
              icon: "trash",
            },
            {
              label: translation.ADD_DUMMY_DATA,
              onPress: () => {
                expendablesCtx.addExpendable({
                  id: Date.now().toString(),
                  name: "Monster",
                  initDay: "13",
                  initMonth: "9",
                  initYear: "2024",
                  icon: "skull",
                  cost: "2000",
                  timesPerDay: "2",
                });
                sheetRef.current?.dismiss();
              },
              icon: "list",
              isDev: true,
            },
          ]}
          renderItem={({ item }: { item: TActionItemProps }) => (
            <ActionItem {...item} />
          )}
          keyExtractor={(item) => "all_expendables_action_" + item.label}
        />
      </BSModal>
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
  actionsContentContainer: {
    padding: 12,
  },
});
