import { StyleSheet, View, Text, Image } from "react-native";
import ServiceOptionButton from "../components/ServiceOptionButton";
import IconButton from "../UI/IconButton";

function SelectedCar({ route, navigation }) {
  const { carName, imageUri, plate, carId } = route.params;

  function editCarInfo() {
    navigation.navigate("UpdateCarInfo", {
      carId: carId,
      carName: carName,
      plate: plate,
    });
  }

  function pressHandler() {
    navigation.navigate("Service", { carId: carId });
  }

  function partsPressHandler() {
    navigation.navigate("Parts", { carId: carId });
  }

  function notesPressHandler() {
    navigation.navigate("Notes", { carId: carId });
  }

  return (
    <View style={styles.container}>
      <View style={styles.editButtonContainer}>
        <IconButton
          icon="settings-sharp"
          size={24}
          color="white"
          onPress={editCarInfo}
        />
      </View>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={imageUri} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>{carName}</Text>
        <Text style={styles.text}>{plate}</Text>
      </View>
      <View style={styles.serviceOptionsContainer}>
        <ServiceOptionButton title="Service" onPress={pressHandler} />
        <ServiceOptionButton title="Parts" onPress={partsPressHandler} />
        <ServiceOptionButton title="Notes" onPress={notesPressHandler} />
      </View>
    </View>
  );
}

export default SelectedCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 15,
  },
  editButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  logoContainer: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  serviceOptionsContainer: {
    gap: 25,
  },
});
