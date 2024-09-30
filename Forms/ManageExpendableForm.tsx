// Core
import { FC, useContext, useState } from "react";
import { ScrollView, View } from "react-native";

// Context
import { TranslationsContext } from "../store/language-context";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Components
import InputField from "./components/InputField";
import FieldsRow from "./components/FieldsRow";
import IconPicker from "../components/IconPicker";
import Button from "../components/Button";
import Title from "../components/Title";

// Utils
import { fillTranslation } from "../utils/translations";
import { createThemedStyle } from "../utils/styles";
import { getMaxDaysInMonth } from "../utils/date";

// Types
import { TIcons } from "../models/Icons";

// Constants
import { ICONS_SORTED } from "../constants/IconsSorted";

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
  [key: string]: (value: string, current: IFormInputs) => boolean;
}

const validators: IValidator = {
  name: (value: string) => {
    return value.length > 0 && value.length <= 30;
  },
  initDay: (value: string, current: IFormInputs) => {
    const val = Number(value);
    return (
      val > 0 &&
      val <=
        getMaxDaysInMonth(+current?.initMonth?.value, +current?.initYear?.value)
    );
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
  const { translation } = useContext(TranslationsContext);
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];

  const [inputs, setInputs] = useState<IFormInputs>(
    defaultValues || initialState
  );

  const handleSubmit = () => {
    let hasErrors = false;
    const state = { ...inputs };
    for (let input in inputs) {
      const isValid = validators[input](inputs[input].value, inputs);
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
          hasError: inputs[name].hasError
            ? !validators[name](value, current)
            : false,
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
          label={translation.NAME}
          value={inputs.name.value}
          error={
            inputs.name.hasError
              ? fillTranslation(translation.ERROR_MAX_CHARS, { max: 30 })
              : ""
          }
          onChange={handleInputChange}
        />
        <FieldsRow label={translation.START_DATE}>
          <InputField
            name="initDay"
            label={translation.DAY}
            placeholder=""
            type="decimal-pad"
            value={inputs.initDay.value}
            error={
              inputs.initDay.hasError
                ? fillTranslation(translation.ERROR_NUMBER_START_END, {
                    start: 1,
                    end: getMaxDaysInMonth(
                      +inputs?.initMonth?.value,
                      +inputs?.initYear?.value
                    ),
                  })
                : ""
            }
            onChange={handleInputChange}
            centered
          />
          <InputField
            name="initMonth"
            label={translation.MONTH}
            placeholder=""
            type="decimal-pad"
            value={inputs.initMonth.value}
            error={
              inputs.initMonth.hasError
                ? fillTranslation(translation.ERROR_NUMBER_START_END, {
                    start: 1,
                    end: 12,
                  })
                : ""
            }
            onChange={handleInputChange}
            centered
          />
          <InputField
            name="initYear"
            label={translation.YEAR}
            placeholder=""
            type="decimal-pad"
            value={inputs.initYear.value}
            error={
              inputs.initYear.hasError ? translation.ERROR_INVALID_YEAR : ""
            }
            onChange={handleInputChange}
            centered
          />
        </FieldsRow>
        <FieldsRow label={translation.EXPENSES}>
          <InputField
            name="cost"
            label={`${translation.COST} ${translation.CURRENCY}`}
            value={inputs.cost.value}
            error={
              inputs.cost.hasError
                ? translation.ERROR_MUST_BE_POSITIVE_NUMBER
                : ""
            }
            type="decimal-pad"
            onChange={handleInputChange}
            centered
          />
          <InputField
            name="timesPerDay"
            label={translation.QUANTITY_PER_DAY}
            value={inputs.timesPerDay.value}
            error={
              inputs.timesPerDay.hasError
                ? translation.ERROR_MUST_BE_POSITIVE_NUMBER
                : ""
            }
            type="decimal-pad"
            onChange={handleInputChange}
            centered
          />
        </FieldsRow>
        <View style={styles.buttonGroup}>
          <FieldsRow>
            <Button
              title={translation.CANCEL}
              onPress={handleCancel}
              primary={false}
            />

            <Button title={translation.OK} onPress={handleSubmit} />
          </FieldsRow>
        </View>
      </View>
    </ScrollView>
  );
};

export default ManageExpendableForm;

const computedStyles = createThemedStyle({
  outerContainer: {
    maxWidth: 600,
    width: "100%",
  },
  innerContainer: {
    gap: 20,
    paddingHorizontal: 32,
    paddingVertical: 50,
    width: "100%",
  },
  buttonGroup: {
    paddingHorizontal: 8,
  },
});
