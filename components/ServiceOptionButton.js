import { StyleSheet, View, Text, Pressable } from "react-native";
import { Colors } from "../constants/styles";

function ServiceOptionButton({ title, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

export default ServiceOptionButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#20489f",
    borderRadius: 15,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    backgroundColor: Colors.gray700,
    shadowColor: Colors.primary800,
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,

    elevation: 5,
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    color: "lightsteelblue",
    fontSize: 20,
    fontWeight: "bold",
  },
});
