// Core
import { FC, useState } from "react";
import { Button, ScrollView, View } from "react-native";

// Components
import InputField from "./components/InputField";
import FieldsRow from "./components/FieldsRow";
import IconPicker from "../components/IconPicker";
import Title from "../components/Title";

// Utils
import { createThemedStyle } from "../utils/styles";

// Types
import { TIcons } from "../models/Icons";

// Constants
import { ICONS_SORTED } from "../constants/IconsSorted";
import { GLOBAL_STYLES } from "../constants/styles";
import { useColorTheme } from "../hooks/styles";

export interface IFormInput {
  hasError: boolean;
  isDirty: boolean;
  value: string;
}

export interface IFormInputs {
  [key: string]: IFormInput;
}

type TInputFieldProps = {
  error?: string;
  label?: string;
  onCancel: Function;
  onSubmit: Function;
  placeholder?: string;
  value?: string;
  defaultValues?: IFormInputs;
};

const today: Date = new Date();

const initialState: IFormInputs = {
  name: {
    hasError: false,
    isDirty: false,
    value: "",
  },
  initDay: {
    hasError: false,
    isDirty: false,
    value: today.getDate().toString().padStart(2, "0"),
  },
  initMonth: {
    hasError: false,
    isDirty: false,
    value: (today.getMonth() + 1).toString().padStart(2, "0"),
  },
  initYear: {
    hasError: false,
    isDirty: false,
    value: today.getFullYear().toString(),
  },
  icon: {
    hasError: false,
    isDirty: false,
    value: "skull",
  },
  cost: {
    hasError: false,
    isDirty: false,
    value: "0",
  },
  timesPerDay: {
    hasError: false,
    isDirty: false,
    value: "0",
  },
};

interface IValidator {
  [key: string]: (key: string) => boolean;
}

const validators: IValidator = {
  name: (value: string) => {
    return value.length > 0 && value.length <= 30;
  },
  initDay: (value: string) => {
    const val = Number(value);
    return val > 0 && val <= 31;
  },
  initMonth: (value: string) => {
    const val = Number(value);
    return val > 0 && val <= 12;
  },
  initYear: (value: string) => {
    const val = Number(value);
    return val > 1900;
  },
  icon: (value: string) => {
    return ICONS_SORTED.indexOf(value) !== -1;
  },
  cost: (value: string) => {
    return +value >= 0;
  },
  timesPerDay: (value: string) => {
    return +value >= 0;
  },
};

const ManageExpendableForm: FC<TInputFieldProps> = ({
  label,
  onSubmit,
  onCancel,
  defaultValues,
}) => {
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];

  const [inputs, setInputs] = useState<IFormInputs>(
    defaultValues || initialState
  );

  const handleSubmit = () => {
    let hasErrors = false;
    const state = { ...inputs };
    for (let input in inputs) {
      const isValid = validators[input](inputs[input].value);
      if (!isValid) {
        hasErrors = true;
        state[input].hasError = true;
      }
    }
    if (hasErrors) {
      setInputs(() => state);
    } else {
      const payload: { [key: string]: string } = {
        id: Date.now().toString(),
      };
      for (let input in inputs) {
        payload[input] = inputs[input].value;
      }
      onSubmit(payload);
      resetForm();
    }
  };

  const resetForm = () => {
    setInputs(initialState);
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const handleInputChange = (name: string, value: string) => {
    setInputs((current) => {
      return {
        ...current,
        [name]: {
          ...current[name],
          hasError: inputs[name].hasError ? !validators[name](value) : false,
          isDirty: true,
          value,
        },
      };
    });
  };

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        {label && <Title label={label} />}
        <IconPicker
          value={inputs.icon.value as TIcons}
          name="icon"
          onChange={handleInputChange}
        />
        <InputField
          name="name"
          label="Nombre"
          value={inputs.name.value}
          error={inputs.name.hasError ? "30 caracteres máximo" : ""}
          onChange={handleInputChange}
        />
        <FieldsRow label="Fecha de inicio">
          <InputField
            name="initDay"
            label="Día"
            placeholder=""
            type="decimal-pad"
            value={inputs.initDay.value}
            error={inputs.initDay.hasError ? "Número (1-31)" : ""}
            onChange={handleInputChange}
            centered
          />
          <InputField
            name="initMonth"
            label="Mes"
            placeholder=""
            type="decimal-pad"
            value={inputs.initMonth.value}
            error={inputs.initMonth.hasError ? "Número (1-12)" : ""}
            onChange={handleInputChange}
            centered
          />
          <InputField
            name="initYear"
            label="Año"
            placeholder=""
            type="decimal-pad"
            value={inputs.initYear.value}
            error={inputs.initYear.hasError ? "Año inválido" : ""}
            onChange={handleInputChange}
            centered
          />
        </FieldsRow>
        <FieldsRow label="Costo económico">
          <InputField
            name="cost"
            label="Costo $"
            value={inputs.cost.value}
            error={inputs.cost.hasError ? "Debe ser número positivo" : ""}
            type="decimal-pad"
            onChange={handleInputChange}
            centered
          />
          <InputField
            name="timesPerDay"
            label="X día"
            value={inputs.timesPerDay.value}
            error={
              inputs.timesPerDay.hasError ? "Debe ser número positivo" : ""
            }
            type="decimal-pad"
            onChange={handleInputChange}
            centered
          />
        </FieldsRow>
        <View style={styles.buttonGroup}>
          <FieldsRow>
            <Button
              title="Cancel"
              color={GLOBAL_STYLES.colors[scheme].primary200}
              onPress={handleCancel}
            />

            <Button
              title="Ok"
              color={GLOBAL_STYLES.colors[scheme].accent500}
              onPress={handleSubmit}
            />
          </FieldsRow>
        </View>
      </View>
    </ScrollView>
  );
};

export default ManageExpendableForm;

const computedStyles = createThemedStyle({
  outerContainer: {
    flex: 1,
    maxWidth: 600,
    width: "100%",
  },
  innerContainer: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 32,
    paddingVertical: 100,
    width: "100%",
  },
  buttonGroup: {
    paddingHorizontal: 8,
  },
});
