import { useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, Alert } from "react-native";
import { Colors } from "../constants/styles";
import { updateCarInfo } from "../DBConnector";

function UpdateCarInfo({ route, navigation }) {
  const { carId, carName: initialCarName, plate: initialPlate } = route.params;

  const [carData, setCarData] = useState({
    carName: initialCarName || "",
    plate: initialPlate || "",
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setCarData((curCarData) => {
      return {
        ...curCarData,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  async function handleUpdate() {
    if (!carData.carName.trim() || !carData.plate.trim()) {
      Alert.alert("Invalid input", "Please check your entered values.");
      return;
    }

    try {
      await updateCarInfo(carId, carData);
      navigation.navigate("AllCars");
    } catch (error) {
      Alert.alert("Error", "Could not update car information. Please try again later.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Car name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter car name"
          placeholderTextColor="#999"
          value={carData.carName}
          onChangeText={inputChangedHandler.bind(this, "carName")}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Car plate</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter car plate"
          placeholderTextColor="#999"
          value={carData.plate}
          onChangeText={inputChangedHandler.bind(this, "plate")}
        />
      </View>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={handleUpdate}
      >
        <Text style={styles.buttonText}>Update Info</Text>
      </Pressable>
    </View>
  );
}

export default UpdateCarInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.gray700,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.gray700,
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  button: {
    backgroundColor: Colors.primary500,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.7,
  },
});
