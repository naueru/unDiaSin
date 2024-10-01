// Core
import { useIsFocused } from "@react-navigation/native";
import { FC, useContext, useEffect, useLayoutEffect } from "react";
import { View } from "react-native";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";

// Context
import { TranslationsContext } from "../store/language-context";
import {
  ExpendablesContext,
  IExpendablesContext,
} from "../store/expendables-context";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Components
import ManageExpendableForm, {
  IFormInputs,
} from "../Forms/ManageExpendableForm";
import PanNavigator from "../components/PanNavigator";

// Utils
import { createThemedStyle } from "../utils/styles";

// Types
import { TExpendable } from "../models/Expendables";

// Constants
import { ROUTES } from "../constants/constants";

const ManageExpendable: FC<NativeStackNavigatorProps> = ({
  route,
  navigation,
}) => {
  const { translation } = useContext(TranslationsContext);
  const expendablesCtx = useContext<IExpendablesContext>(ExpendablesContext);
  const isFocused = useIsFocused();
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];

  const { expendables } = expendablesCtx;
  const expendable = expendables.find(
    (expendable: TExpendable) => expendable.id === route?.params?.id
  );

  const isEditing = !!route?.params?.id;

  const today = new Date();

  const defaultValues: IFormInputs = {
    name: {
      hasError: false,
      isDirty: false,
      value: expendable?.name || "",
    },
    initDay: {
      hasError: false,
      isDirty: false,
      value: expendable?.initDay || today.getDate().toString().padStart(2, "0"),
    },
    initMonth: {
      hasError: false,
      isDirty: false,
      value:
        expendable?.initMonth ||
        (today.getMonth() + 1).toString().padStart(2, "0"),
    },
    initYear: {
      hasError: false,
      isDirty: false,
      value: expendable?.initYear || today.getFullYear().toString(),
    },
    icon: {
      hasError: false,
      isDirty: false,
      value: expendable?.icon || "skull",
    },
    cost: {
      hasError: false,
      isDirty: false,
      value: expendable?.cost || "0",
    },
    timesPerDay: {
      hasError: false,
      isDirty: false,
      value: expendable?.timesPerDay || "0",
    },
  };

  const handleSubmit = (values: TExpendable) => {
    if (isEditing) {
      expendablesCtx.updateExpendable(route?.params?.id, values);
    } else {
      expendablesCtx.addExpendable(values);
    }
    navigation.navigate(ROUTES.expendablesOverview);
  };

  const handleCancel = () => {
    navigation.navigate(ROUTES.expendablesOverview);
  };

  useEffect(() => {
    if (!isFocused && isEditing) {
      return navigation.setParams({ id: null });
    }
  }, [isFocused, isEditing]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing
        ? translation.EDIT_SCREEN_TITLE
        : translation.ADD_SCREEN_TITLE,
    });
  });

  return (
    <PanNavigator initialAnimationValue={2}>
      <View style={styles.container}>
        {isFocused ? (
          <View>
            <ManageExpendableForm
              label={isEditing ? expendable?.name : translation.NEW_EXPENDABLE}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
            />
          </View>
        ) : null}
      </View>
    </PanNavigator>
  );
};

export default ManageExpendable;

const computedStyles = createThemedStyle({
  container: {
    backgroundColor: "primary500",
    flex: 1,
    justifyContent: "center",
  },
});
