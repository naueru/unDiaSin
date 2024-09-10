import { FC, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ExpendablesContext } from "../store/expendables-context";

const AllExpendables: FC = () => {
  const ExpendablesCtx = useContext(ExpendablesContext);
  return (
    <View style={styles.container}>
      <Text>All expendable poisons</Text>
      {ExpendablesCtx.expendables.map((expendable) => (
        <View key={`expendable_${expendable.id}`}>
          <Text>{expendable.id}</Text>
          <Text>{expendable.name}</Text>
          <Text>{expendable.initDay}</Text>
          <Text>{expendable.initMonth}</Text>
          <Text>{expendable.initYear}</Text>
          <Text>{expendable.cost}</Text>
          <Text>{expendable.timesPerDay}</Text>
        </View>
      ))}
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
