import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ExpendablesContext } from "../store/expendables-context";
import { ROUTES } from "../constants/constants";

const AllExpendables: FC = () => {
  const ExpendablesCtx = useContext(ExpendablesContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          navigation.navigate(ROUTES.expendableDetail);
        }}
        title="ASD"
      />
      <Text>All expendable poisons</Text>
      {ExpendablesCtx.expendables.map((expendable) => (
        <View key={`expendable_${expendable.id}`}>
          <Text>{expendable.icon}</Text>
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
