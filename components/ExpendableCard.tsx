// Core
import { Ionicons } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Components
import Title from "./Title";

// Utils
import { getDaysDiff } from "../utils/date";

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

  const { icon, id, name, initDay, initMonth, initYear, cost, timesPerDay } =
    expendable;

  const initialDate: Date = new Date(`${initYear}-${initMonth}-${initDay}`);

  const today: Date = new Date();

  const days: number = getDaysDiff(today, initialDate);

  const since: string =
    days > 0
      ? days > 1
        ? `${days} días!`
        : `1 día!`
      : "Diste el primer paso!";

  const isSaving: boolean = !!(+cost && +timesPerDay);

  const savedAmount: number = isSaving ? +cost * +timesPerDay * days : +cost;

  return (
    <Pressable
      onPress={() => navigation.navigate(ROUTES.expendableDetail, { id })}
    >
      <View style={styles.container}>
        <View style={styles.iconontainer}>
          <Ionicons
            name={icon}
            size={60}
            color={GLOBAL_STYLES.colors.accent500}
          />
        </View>
        <View style={styles.contentContainer}>
          <Title label={name} />
          <View style={styles.detailsWrapper}>
            <Text style={styles.elapsed}>{since}</Text>
            {isSaving ? (
              <View style={styles.savingsWrapper}>
                <Text style={styles.savings}>Ahorro ${savedAmount}!</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.iconontainer}>
          <Ionicons
            name="chevron-forward"
            size={40}
            color={GLOBAL_STYLES.colors.primary200}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default ExpendableCard;

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.shadow,
    alignItems: "center",
    backgroundColor: GLOBAL_STYLES.colors.primary500,
    borderColor: GLOBAL_STYLES.colors.accent500,
    borderRadius: 6,
    borderStyle: "solid",
    borderWidth: 1,
    flexDirection: "row",
    gap: 16,
    padding: 16,
    width: "100%",
  },
  iconontainer: {
    backgroundColor: GLOBAL_STYLES.colors.primary500,
  },
  contentContainer: {
    alignItems: "flex-start",
    backgroundColor: GLOBAL_STYLES.colors.primary500,
    borderLeftColor: GLOBAL_STYLES.colors.primary200,
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
    color: GLOBAL_STYLES.colors.accent500,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
  },
  savingsWrapper: {
    width: "100%",
  },
  savings: {
    color: GLOBAL_STYLES.colors.white,
    textAlign: "right",
  },
});
