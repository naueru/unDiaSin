// Core
import { Ionicons } from "@expo/vector-icons";
import { FC, useContext, useLayoutEffect } from "react";
import { Alert, Text, View } from "react-native";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";

// Components
import Title from "../components/Title";
import Frame from "../components/Frame";
import PressableIcon from "../components/PressableIcon";

// Context
import {
  ExpendablesContext,
  IExpendablesContext,
} from "../store/expendables-context";

// Utils
import { getDaysDiff } from "../utils/date";

// Types
import { TExpendable } from "../models/Expendables";

// Constants
import { GLOBAL_STYLES } from "../constants/styles";
import { DEFAULT_EXPENDABLE } from "../constants/defaults";
import { ROUTES } from "../constants/constants";
import { useColorTheme } from "../hooks/styles";
import { createThemedStyle } from "../utils/styles";

const ExpendableDetail: FC<NativeStackNavigatorProps> = ({
  route,
  navigation,
}) => {
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
    Alert.alert(
      "¿Estás seguro?",
      "Esta acción es irreversible",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
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
      "¿Estás seguro?",
      "Esto pondrá hoy como día de inicio",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Reiniciar",
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
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons
          name={icon}
          size={80}
          color={GLOBAL_STYLES.colors[scheme].accent500}
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
          label="Reiniciar"
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
