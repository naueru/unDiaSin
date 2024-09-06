import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

const ManageExpendable: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Manage Expendable</Text>
    </View>
  );
};

export default ManageExpendable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
