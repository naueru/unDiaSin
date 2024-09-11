import { FC, useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import InputField from "./components/InputField";
import { GLOBAL_STYLES } from "../constants/styles";
import FieldsRow from "./components/FieldsRow";
import IconPicker from "../components/IconPicker";
import { ICONS_SORTED } from "../constants/IconsSorted";
import { TIcons } from "../models/Icons";
import Title from "../components/Title";

type TInputFieldProps = {
  error?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onSubmit: Function;
  onCancel: () => any;
};

interface IFormInput {
  value: string;
  isDirty: boolean;
  hasError: boolean;
}

interface IFormInputs {
  [key: string]: IFormInput;
}

const today = new Date();

const initialState: IFormInputs = {
  name: {
    value: "",
    isDirty: false,
    hasError: false,
  },
  initDay: {
    value: today.getDate().toString().padStart(2, "0"),
    isDirty: false,
    hasError: false,
  },
  initMonth: {
    value: (today.getMonth() + 1).toString().padStart(2, "0"),
    isDirty: false,
    hasError: false,
  },
  initYear: {
    value: today.getFullYear().toString(),
    isDirty: false,
    hasError: false,
  },
  icon: {
    value: "skull",
    isDirty: false,
    hasError: false,
  },
  cost: {
    value: "0",
    isDirty: false,
    hasError: false,
  },
  timesPerDay: {
    value: "1",
    isDirty: false,
    hasError: false,
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
    return +value > 0;
  },
  timesPerDay: (value: string) => {
    return +value > 0;
  },
};

const ManageExpendableForm: FC<TInputFieldProps> = ({
  label,
  onSubmit,
  onCancel,
}) => {
  const [inputs, setInputs] = useState<IFormInputs>(initialState);

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
    }
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
        <FieldsRow>
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
        <FieldsRow>
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
              color={GLOBAL_STYLES.colors.primary200}
              onPress={onCancel}
            />

            <Button
              title="Ok"
              color={GLOBAL_STYLES.colors.accent500}
              onPress={handleSubmit}
            />
          </FieldsRow>
        </View>
      </View>
    </ScrollView>
  );
};

export default ManageExpendableForm;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    maxWidth: 600,
    width: "100%",
  },
  innerContainer: {
    flex: 1,
    gap: 16,
    paddingHorizontal: 32,
    paddingVertical: 100,
    width: "100%",
  },
  buttonGroup: {
    paddingHorizontal: 8,
  },
});
