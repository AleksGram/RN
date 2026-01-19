import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { getServiceNotes } from "../DBConnector";
import { useState, useEffect } from "react";
import { ICON_MAP } from "../mockData";

function Service({ navigation, route }) {
  const { carId } = route.params;

  const [serviceNotes, setServiceNotes] = useState({});

  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchServiceNotes() {
      try {
        const notes = await getServiceNotes(carId);
        setServiceNotes(notes);
      } catch (error) {
        console.log("Error getting service notes", error);
      }
    }
    fetchServiceNotes();
  }, [carId, isFocused]);

  // Convert categorized notes to a flat array of the latest note for each type
  const latestServices = Object.keys(serviceNotes).map((type) => {
    const notes = serviceNotes[type];
    // They are already sorted by mileage in the DBConnector
    return {
      ...notes[0],
      extraNotesCount: notes.length > 1 ? notes.length - 1 : 0,
    };
  });

  function renderServiceItem({ item }) {
    const iconName = ICON_MAP[item.type] || ICON_MAP.default;
    const operationName =
      item.type.charAt(0).toUpperCase() + item.type.slice(1) + " Change";

    function showHistoryHandler() {
      navigation.navigate("ServiceHistory", {
        notes: serviceNotes[item.type],
        type: item.type,
      });
    }

    return (
      <View style={styles.serviceItem}>
        <View style={styles.iconContainer}>
          <Ionicons name={iconName} size={30} color={Colors.primary500} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.operationText}>{operationName}</Text>
          <Text style={styles.mileageText}>
            Last changed: {item.mileage} km
          </Text>
        </View>
        {item.extraNotesCount > 0 && (
          <Pressable
            style={({ pressed }) => [
              styles.extraNotesContainer,
              pressed && styles.pressed,
            ]}
            onPress={showHistoryHandler}
          >
            <Text style={styles.extraNotesText}>
              Previous {item.extraNotesCount}
            </Text>
            <Ionicons
              name="create-outline"
              size={16}
              color={Colors.primary200}
            />
          </Pressable>
        )}
      </View>
    );
  }

  function addServiceHandler() {
    navigation.navigate("AddServiceNote", { carId: carId });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={latestServices}
        keyExtractor={(item) => item.id}
        renderItem={renderServiceItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
            No service notes yet.
          </Text>
        }
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={addServiceHandler}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.buttonText}>Add service note</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Service;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.gray700,
  },
  listContainer: {
    paddingBottom: 80,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
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
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.gray700,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  operationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  mileageText: {
    fontSize: 14,
    color: Colors.primary100,
    marginTop: 4,
  },
  extraNotesContainer: {
    position: "absolute",
    bottom: 6,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  extraNotesText: {
    fontSize: 12,
    color: Colors.primary200,
    fontStyle: "italic",
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
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
