import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Colors } from "../constants/styles";
import { getParts } from "../DBConnector";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

function Parts({ navigation, route }) {
  const { carId } = route.params;

  const [parts, setParts] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchParts() {
      try {
        const fetchedParts = await getParts(carId);
        setParts(fetchedParts);
      } catch (error) {
        console.log("Error getting parts", error);
      }
    }
    fetchParts();
  }, [carId, isFocused]);

  async function copyToClipboard(text) {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied!", `Part number ${text} copied to clipboard.`);
  }

  function addPartHandler() {
    navigation.navigate("AddPart", { carId: carId });
  }

  function renderPartItem({ item }) {
    return (
      <View style={styles.partItem}>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.manufactureText}>{item.manufacture}</Text>
            <Pressable
              onPress={() => copyToClipboard(item.number)}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Text style={styles.numberText}>{item.number}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={parts}
        keyExtractor={(item) => item.id}
        renderItem={renderPartItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
            No parts added yet.
          </Text>
        }
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={addPartHandler}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.buttonText}>Add part</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Parts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.gray700,
  },
  listContainer: {
    paddingBottom: 80,
  },
  partItem: {
    backgroundColor: Colors.primary800,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  manufactureText: {
    fontSize: 14,
    color: Colors.primary100,
    fontWeight: "600",
  },
  numberText: {
    fontSize: 14,
    color: "lightsteelblue",
    fontFamily: "Courier", // Monospaced look for part numbers
  },
  buttonContainer: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
  },
  button: {
    flexDirection: "row",
    backgroundColor: Colors.primary500,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
