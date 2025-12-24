import { StyleSheet, View, Text } from "react-native";
import CarTile from "../components/CarTile";
import AddCarButton from "../components/AddCarButton";

function AllCars() {
  return (
    <View style={styles.container}>
      <CarTile
        carName={"MDX White "}
        imageUri={require("../assets/acura.png")}
        plate={"VD 4556 VN"}
      />
      <CarTile
        carName={"Micra Hulk"}
        imageUri={require("../assets/nissan.png")}
        plate={"VD 1245 VN"}
      />
      <AddCarButton />
    </View>
  );
}

export default AllCars;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 35,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
});
