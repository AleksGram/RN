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
import { SERVICE_TYPES } from "../mockData";
import { addServiceNote } from "../DBConnector";

function AddServiceNote({ navigation, route }) {
  const { carId } = route.params;

  const [serviceData, setServiceData] = useState({
    type: "",
    mileage: "",
    partName: "",
  });

  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setServiceData((curServiceData) => {
      return {
        ...curServiceData,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  async function handleSave() {
    console.log("Saving service note:", serviceData);
    // TODO: Implement actual save logic to DB
    try {
      const id = await addServiceNote(carId, serviceData);
      navigation.goBack();
    } catch (error) {
      console.log("Can't add service note", error);
    }
  }

  const selectedTypeLabel = SERVICE_TYPES.find(
    (t) => t.value === serviceData.type
  )?.label;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Service Type</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setIsTypeModalVisible(true)}
        >
          <Text
            style={[
              styles.dropdownText,
              !serviceData.type && styles.placeholder,
            ]}
          >
            {selectedTypeLabel || "Select Service Type"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mileage (km)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter current mileage"
          placeholderTextColor="#999"
          keyboardType="number-pad"
          value={serviceData.mileage}
          onChangeText={inputChangedHandler.bind(this, "mileage")}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Used Part Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Bosch Oil Filter"
          placeholderTextColor="#999"
          value={serviceData.partName}
          onChangeText={inputChangedHandler.bind(this, "partName")}
        />
      </View>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save Service Note</Text>
      </Pressable>

      <Modal visible={isTypeModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Service Type</Text>
            <FlatList
              data={SERVICE_TYPES}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    inputChangedHandler("type", item.value);
                    setIsTypeModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsTypeModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default AddServiceNote;

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
