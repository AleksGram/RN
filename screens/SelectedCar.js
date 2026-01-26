import { StyleSheet, View, Text, Image, Modal, TouchableOpacity, Pressable, Alert } from "react-native";
import { useState } from "react";
import ServiceOptionButton from "../components/ServiceOptionButton";
import IconButton from "../UI/IconButton";
import { deleteCar as deleteCarFromDB } from "../DBConnector";

function SelectedCar({ route, navigation }) {
  const { carName, imageUri, plate, carId } = route.params;
  const [menuVisible, setMenuVisible] = useState(false);

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

  function editCarInfo() {
    setMenuVisible(false);
    navigation.navigate("UpdateCarInfo", {
      carId: carId,
      carName: carName,
      plate: plate,
    });
  }

  async function deleteCar() {
    setMenuVisible(false);
    
    Alert.alert(
      "Delete Car",
      `Are you sure you want to delete ${carName}? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCarFromDB(carId);
              navigation.goBack();
            } catch (error) {
              Alert.alert("Error", "Failed to delete car. Please try again.");
              console.error("Error deleting car:", error);
            }
          }
        }
      ]
    );
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
          onPress={toggleMenu}
        />
      </View>
      
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={editCarInfo}
            >
              <Text style={styles.menuText}>Edit car info</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={deleteCar}
            >
              <Text style={[styles.menuText, styles.deleteText]}>Delete car</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 50,
    paddingRight: 15,
  },
  menuContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    minWidth: 180,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  deleteText: {
    color: "#d32f2f",
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
