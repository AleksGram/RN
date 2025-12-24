import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function AddCarButton() {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Ionicons name="add-outline" size={24} color="white" />
      <Text style={styles.text}>Add Car</Text>
    </Pressable>
  );
}

export default AddCarButton;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    fontSize: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#20489f",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
