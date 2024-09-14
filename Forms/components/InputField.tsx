import { FC } from "react";
import { KeyboardType, StyleSheet, Text, TextInput, View } from "react-native";
import { GLOBAL_STYLES } from "../../constants/styles";

type TInputFieldProp = {
  error?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  type?: KeyboardType;
  onChange: Function;
  name: string;
  centered?: boolean;
};

const InputField: FC<TInputFieldProp> = ({
  error,
  label,
  placeholder,
  value,
  type,
  name,
  onChange,
  centered,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        style={[
          styles.input,
          centered ? styles.centered : null,
          error ? styles.errorBorder : null,
        ]}
        keyboardType={type}
        onChangeText={(value) => onChange(name, value)}
      />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  label: {
    color: GLOBAL_STYLES.colors.primary200,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  input: {
    borderColor: GLOBAL_STYLES.colors.primary200,
    borderStyle: "solid",
    borderRadius: 6,
    borderWidth: 1,
    color: GLOBAL_STYLES.colors.accent500,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  centered: {
    textAlign: "center",
  },
  error: {
    color: GLOBAL_STYLES.colors.error500,
    fontSize: 12,
    textAlign: "right",
  },
  errorBorder: {
    borderColor: GLOBAL_STYLES.colors.error500,
  },
});
