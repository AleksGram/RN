import { StyleSheet, View, Text, Image } from "react-native";
import ServiceOptionButton from "../components/ServiceOptionButton";

function SelectedCar({ route, navigation }) {
  const { carName, imageUri, plate, carId } = route.params;

  function pressHandler() {
    navigation.navigate("Service", { carId: carId });
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={imageUri} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>{carName}</Text>
        <Text style={styles.text}>{plate}</Text>
      </View>
      <View style={styles.serviceOptionsContainer}>
        <ServiceOptionButton title="Service" onPress={pressHandler} />
        <ServiceOptionButton title="Parts" />
        <ServiceOptionButton title="Notes" />
      </View>
    </View>
  );
}

export default SelectedCar;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 15,
    marginVertical: 35,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  logoContainer: {
    width: 250,
    height: 250,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    marginHorizontal: "auto",
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  serviceOptionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 25,
  },
});
