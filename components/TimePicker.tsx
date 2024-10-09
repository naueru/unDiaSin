// Core
import { ScrollView, Text } from "react-native";
import { FC } from "react";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Components
import NumberScrollPicker from "./NumberScrollPicker";

// Utils
import { createThemedStyle } from "../utils/styles";

export type TTimePickerValues = {
  hour: number;
  minutes: number;
  seconds: number;
};

export type TTimePickerProps = {
  onScroll: Function;
  onStop: Function;
  defaultValues: TTimePickerValues;
  onChange: Function;
  name: string;
};

const TimePicker: FC<TTimePickerProps> = ({
  onScroll,
  onStop,
  defaultValues,
  onChange,
  name,
}) => {
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];

  const handleChange = (fieldName: string, value: number) => {
    onChange(name, { ...defaultValues, [fieldName]: value });
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      scrollEnabled={false}
    >
      <NumberScrollPicker
        name="hour"
        onChange={handleChange}
        label="HH"
        onScroll={() => onScroll()}
        onStop={() => onStop()}
        maxNumber={24}
        keyExtractorLabel={"time_picker_hour"}
        defaultValue={defaultValues.hour}
      />
      <Text style={styles.label}>:</Text>
      <NumberScrollPicker
        name="minutes"
        onChange={handleChange}
        label="MM"
        onScroll={() => onScroll()}
        onStop={() => onStop()}
        maxNumber={60}
        keyExtractorLabel={"time_picker_minutes"}
        defaultValue={defaultValues.minutes}
      />
      <Text style={styles.label}>:</Text>
      <NumberScrollPicker
        name="seconds"
        onChange={handleChange}
        label="SS"
        onScroll={() => onScroll()}
        onStop={() => onStop()}
        maxNumber={60}
        keyExtractorLabel={"time_picker_seconds"}
        defaultValue={defaultValues.seconds}
      />
    </ScrollView>
  );
};

export default TimePicker;

const computedStyles = createThemedStyle({
  container: {
    alignItems: "center",
    flex: 1,
    gap: 16,
    padding: 8,
  },
  label: {
    color: "primaryText",
    fontSize: 20,
    textAlign: "center",
  },
});
