import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

const AllExpendables: FC = () => {
  return (
    <View style={styles.container}>
      <Text>All expendable poisons</Text>
    </View>
  );
};

export default AllExpendables;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
