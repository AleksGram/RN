import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import { Colors } from "../constants/styles";
import { MAKES, MODELS } from "../mockData";
import { addCar } from "../DBConnector";

function AddCar({ navigation }) {
  const [carData, setCarData] = useState({
    make: "",
    model: "",
    carName: "",
    plate: "",
  });

  const [isMakeModalVisible, setIsMakeModalVisible] = useState(false);
  const [isModelModalVisible, setIsModelModalVisible] = useState(false);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setCarData((curCarData) => {
      return {
        ...curCarData,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  async function handleSave() {
    console.log(carData);
    // TODO: Implement save logic
    const id = await addCar(carData);
    console.log("before navigation", id);
    navigation.navigate("AllCars");
    console.log(id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Make</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setIsMakeModalVisible(true)}
        >
          <Text
            style={[styles.dropdownText, !carData.make && styles.placeholder]}
          >
            {carData.make || "Select Make"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Model</Text>
        <TouchableOpacity
          style={[styles.dropdown, !carData.make && styles.disabledDropdown]}
          onPress={() => carData.make && setIsModelModalVisible(true)}
        >
          <Text
            style={[styles.dropdownText, !carData.model && styles.placeholder]}
          >
            {carData.model || "Select Model"}
          </Text>
        </TouchableOpacity>
      </View>

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
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save Car</Text>
      </Pressable>

      {/* Make Selection Modal */}
      <Modal visible={isMakeModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Make</Text>
            <FlatList
              data={MAKES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setCarData((curCarData) => ({
                      ...curCarData,
                      make: item,
                      model: "",
                    }));
                    setIsMakeModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsMakeModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Model Selection Modal */}
      <Modal visible={isModelModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Model</Text>
            <FlatList
              data={carData.make ? MODELS[carData.make] : []}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    inputChangedHandler("model", item);
                    setIsModelModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModelModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default AddCar;

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
  dropdown: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  disabledDropdown: {
    backgroundColor: "#ccc",
    borderColor: "#999",
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.gray700,
  },
  placeholder: {
    color: "#999",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: Colors.gray700,
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalItemText: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.gray700,
  },
  closeButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: Colors.primary500,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
