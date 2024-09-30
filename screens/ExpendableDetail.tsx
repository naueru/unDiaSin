// Core
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";
import { FC, useContext, useLayoutEffect } from "react";
import { Alert, Text, View } from "react-native";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Context
import { TranslationsContext } from "../store/language-context";
import {
  ExpendablesContext,
  IExpendablesContext,
} from "../store/expendables-context";

// Components
import PressableIcon from "../components/PressableIcon";
import PanNavigator from "../components/PanNavigator";
import Title from "../components/Title";
import Frame from "../components/Frame";

// Utils
import { createThemedStyle } from "../utils/styles";
import { getDaysDiff } from "../utils/date";
import { fillTranslation } from "../utils/translations";

// Types
import { TExpendable } from "../models/Expendables";

// Constants
import { GLOBAL_STYLES } from "../constants/styles";
import { DEFAULT_EXPENDABLE } from "../constants/defaults";
import { ROUTES } from "../constants/constants";

const ExpendableDetail: FC<NativeStackNavigatorProps> = ({
  route,
  navigation,
}) => {
  const { translation } = useContext(TranslationsContext);
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];
  const expendablesCtx = useContext<IExpendablesContext>(ExpendablesContext);
  const { expendables } = expendablesCtx;
  const expendable =
    expendables.find(
      (expendable: TExpendable) => expendable.id === route.params.id
    ) || DEFAULT_EXPENDABLE;

  const { initDay, initMonth, initYear, cost, timesPerDay, icon, name } =
    expendable;

  const initialDate: Date = new Date(`${initYear}-${initMonth}-${initDay}`);

  const today: Date = new Date();

  const days: number = getDaysDiff(today, initialDate);

  const since: string =
    days < 0
      ? fillTranslation(translation.YOU_WILL_START_SOON, {
          days: Math.abs(days),
        })
      : days > 0
      ? days > 1
        ? fillTranslation(translation.ITS_BEEN_X_DAYS, { days })
        : translation.ITS_BEEN_ONE_DAY
      : translation.YOU_TOOK_THE_FISRT_STEP;

  const isSaving: boolean = !!(+cost && +timesPerDay);

  const savedAmount: number = isSaving
    ? Math.max(0, +cost * +timesPerDay * days)
    : +cost;

  useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  });

  const handleDelete = () => {
    Alert.alert(
      translation.ARE_YOU_SURE,
      translation.REMOVE_DESCRIPTION,
      [
        { text: translation.CANCEL, style: "cancel" },
        {
          text: translation.REMOVE,
          style: "destructive",
          onPress: () => {
            expendablesCtx.deleteExpendable(route.params.id);
            navigation.navigate(ROUTES.expendables);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = () => {
    navigation.navigate(ROUTES.manageExpendable, {
      id: route.params.id,
    });
  };

  const handleRestart = () => {
    Alert.alert(
      translation.ARE_YOU_SURE,
      translation.RESTART_DESCRIPTION,
      [
        { text: translation.CANCEL, style: "cancel" },
        {
          text: translation.RESTART,
          onPress: () => {
            const today = new Date();

            expendablesCtx.updateExpendable(route.params.id, {
              ...expendable,
              initDay: today.getDate().toString().padStart(2, "0"),
              initMonth: (today.getMonth() + 1).toString().padStart(2, "0"),
              initYear: today.getFullYear().toString(),
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <PanNavigator>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <Ionicons
            name={icon}
            size={80}
            color={GLOBAL_STYLES.colors[scheme].accent500}
          />
        </View>

        <Title label={name} />
        <Frame label={translation.DATE} style={styles.detailContainer}>
          <Text style={styles.detail}>
            {translation.START_DATE}:{" "}
            {fillTranslation(translation.FORMATTED_DATE, {
              day: initDay,
              month: initMonth,
              year: initYear,
            })}
          </Text>
          <Text style={styles.achievement}>{since}</Text>
        </Frame>
        {isSaving ? (
          <Frame label={translation.SAVINGS} style={styles.detailContainer}>
            <Text style={styles.detail}>
              {translation.COST}: {translation.CURRENCY}
              {cost}
            </Text>
            <Text style={styles.detail}>
              {translation.QUANTITY_PER_DAY}: {timesPerDay}
            </Text>
            <Text style={styles.achievement}>
              {translation.YOU_HAVE_SAVED} {translation.CURRENCY}
              {savedAmount}!
            </Text>
          </Frame>
        ) : null}
        <View style={styles.actions}>
          <PressableIcon
            name="reload"
            label={translation.RESTART}
            size={40}
            onPress={handleRestart}
          />
          <PressableIcon
            name="pencil"
            label={translation.EDIT}
            size={40}
            onPress={handleEdit}
          />
          <PressableIcon
            name="trash"
            label={translation.REMOVE}
            size={40}
            onPress={handleDelete}
          />
        </View>
      </View>
    </PanNavigator>
  );
};

export default ExpendableDetail;

const computedStyles = createThemedStyle({
  container: {
    alignItems: "center",
    backgroundColor: "primary500",
    flex: 1,
    gap: 32,
    justifyContent: "center",
    padding: 16,
  },
  iconWrapper: {
    ...GLOBAL_STYLES.shadow,
    backgroundColor: "primary500",
    borderColor: "accent500",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  detailContainer: {
    padding: 16,
    gap: 16,
  },
  detail: {
    color: "accent500",
    fontSize: 16,
  },
  achievement: {
    color: "accent500",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
