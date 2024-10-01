// Core
import { Ionicons } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, PropsWithChildren, useContext } from "react";
import { Pressable, Text, View } from "react-native";

// Context
import { TranslationsContext } from "../store/language-context";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Components
import Title from "./Title";

// Utils
import { getDaysDiff } from "../utils/date";
import { createThemedStyle } from "../utils/styles";
import { fillTranslation } from "../utils/translations";

// Types
import { TExpendable } from "../models/Expendables";

// Constants
import { GLOBAL_STYLES } from "../constants/styles";
import { ROUTES } from "../constants/constants";

type TExpendableCardProps = {
  expendable: TExpendable;
} & PropsWithChildren;

const ExpendableCard: FC<TExpendableCardProps> = ({ expendable }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { translation } = useContext(TranslationsContext);

  const scheme = useColorTheme();
  const styles = computedStyles[scheme];

  const { icon, id, name, initDay, initMonth, initYear, cost, timesPerDay } =
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

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(ROUTES.expendablesOverview, {
          screen: ROUTES.expendableDetail,
          params: { id },
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={icon}
            size={60}
            color={GLOBAL_STYLES.colors[scheme].accent500}
          />
        </View>
        <View style={styles.contentContainer}>
          <Title label={name} />
          <View style={styles.detailsWrapper}>
            <Text style={styles.elapsed}>{since}</Text>
            {isSaving ? (
              <View style={styles.savingsWrapper}>
                <Text style={styles.savings}>
                  {translation.SAVINGS} {translation.CURRENCY}
                  {savedAmount}!
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.chevronContainer}>
          <Ionicons
            name="chevron-forward"
            size={40}
            color={GLOBAL_STYLES.colors[scheme].primary200}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default ExpendableCard;

const computedStyles = createThemedStyle({
  container: {
    ...GLOBAL_STYLES.shadow,
    alignItems: "center",
    backgroundColor: "primary500",
    borderColor: "accent500",
    borderRadius: 6,
    borderStyle: "solid",
    borderWidth: 1,
    flexDirection: "row",
    gap: 16,
    padding: 16,
    width: "100%",
  },
  iconContainer: {
    minWidth: 60,
  },
  chevronContainer: {
    minWidth: 40,
  },
  contentContainer: {
    alignItems: "flex-start",
    backgroundColor: "primary500",
    borderLeftColor: "primary200",
    borderLeftWidth: 1,
    borderStyle: "solid",
    flex: 1,
    gap: 8,
  },
  detailsWrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    width: "100%",
  },
  elapsed: {
    color: "accent500",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
  },
  savingsWrapper: {
    width: "100%",
  },
  savings: {
    color: "primaryText",
    textAlign: "right",
  },
});
