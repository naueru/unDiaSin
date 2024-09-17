// Core
import { Ionicons } from "@expo/vector-icons";
import { FC, useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";

// Context
import {
  ExpendablesContext,
  IExpendablesContext,
} from "../store/expendables-context";

// Types
import { TExpendable } from "../models/Expendables";

// Constants
import { GLOBAL_STYLES } from "../constants/styles";
import { getDaysDiff } from "../utils/date";
import { DEFAULT_EXPENDABLE } from "../constants/defaults";
import Title from "../components/Title";
import Frame from "../components/Frame";
import PressableIcon from "../components/PressableIcon";
import { ROUTES } from "../constants/constants";

const ExpendableDetail: FC<NativeStackNavigatorProps> = ({
  route,
  navigation,
}) => {
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
    days > 0
      ? days > 1
        ? `¡Llevas ${days} días!`
        : `¡Llevas 1 día!`
      : "Diste el primer paso!";

  const isSaving: boolean = !!(+cost && +timesPerDay);

  const savedAmount: number = isSaving ? +cost * +timesPerDay * days : +cost;

  useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  });

  const handleDelete = () => {
    expendablesCtx.deleteExpendable(route.params.id);
    navigation.navigate(ROUTES.expendables);
  };

  const handleEdit = () => {
    navigation.navigate(ROUTES.manageExpendable, {
      id: route.params.id,
    });
  };

  const handleRestart = () => {
    const today = new Date();

    expendablesCtx.updateExpendable(route.params.id, {
      ...expendable,
      initDay: today.getDate().toString().padStart(2, "0"),
      initMonth: (today.getMonth() + 1).toString().padStart(2, "0"),
      initYear: today.getFullYear().toString(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons
          name={icon}
          size={80}
          color={GLOBAL_STYLES.colors.accent500}
        />
      </View>

      <Title label={name} />
      <Frame label="Fecha" style={styles.detailContainer}>
        <Text style={styles.detail}>
          Fecha de inicio: {`${initDay}/${initMonth}/${initYear}`}
        </Text>
        <Text style={styles.achievement}>{since}</Text>
      </Frame>
      {isSaving ? (
        <Frame label="Ahorro" style={styles.detailContainer}>
          <Text style={styles.detail}>Costo: ${cost}</Text>
          <Text style={styles.detail}>Cantidad por día: {timesPerDay}</Text>
          <Text style={styles.achievement}>
            Llevas ahorrado ${savedAmount}!
          </Text>
        </Frame>
      ) : null}
      <View style={styles.actions}>
        <PressableIcon
          name="reload"
          label="Restart"
          size={40}
          onPress={handleRestart}
        />
        <PressableIcon
          name="pencil"
          label="Editar"
          size={40}
          onPress={handleEdit}
        />
        <PressableIcon
          name="trash"
          label="Eliminar"
          size={40}
          onPress={handleDelete}
        />
      </View>
    </View>
  );
};

export default ExpendableDetail;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: GLOBAL_STYLES.colors.primary500,
    flex: 1,
    gap: 32,
    justifyContent: "center",
    padding: 16,
  },
  iconWrapper: {
    ...GLOBAL_STYLES.shadow,
    backgroundColor: GLOBAL_STYLES.colors.primary500,
    borderColor: GLOBAL_STYLES.colors.accent500,
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
    color: GLOBAL_STYLES.colors.accent500,
    fontSize: 16,
  },
  achievement: {
    color: GLOBAL_STYLES.colors.accent500,
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
