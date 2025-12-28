import { useState } from "react";
import { addPart } from "../DBConnector";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { Colors } from "../constants/styles";

function AddPart({ navigation, route }) {
  const { carId } = route.params;
  const [partData, setPartData] = useState({
    name: "",
    number: "",
    manufacture: "",
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setPartData((curData) => {
      return {
        ...curData,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  async function handleSave() {
    try {
      const id = await addPart(carId, partData);
    } catch (error) {
      console.log("Can't add part", error);
    }
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Part Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Air Filter"
          placeholderTextColor="#999"
          value={partData.name}
          onChangeText={inputChangedHandler.bind(this, "name")}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Part Number</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 00 2345 k11"
          placeholderTextColor="#999"
          value={partData.number}
          onChangeText={inputChangedHandler.bind(this, "number")}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Manufacturer</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. MANN"
          placeholderTextColor="#999"
          value={partData.manufacture}
          onChangeText={inputChangedHandler.bind(this, "manufacture")}
        />
      </View>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save Part</Text>
      </Pressable>
    </ScrollView>
  );
}

export default AddPart;

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
