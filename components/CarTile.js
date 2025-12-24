import { StyleSheet, View, Text, Image, Pressable } from "react-native";

function CarTile({ carName, imageUri, plate }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Image style={styles.logo} source={imageUri} />
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{carName}</Text>
        <Text style={styles.label}>{plate}</Text>
      </View>
    </Pressable>
  );
}

export default CarTile;

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
  },
  infoContainer: {
    marginHorizontal: "auto",
  },
  logo: {
    width: 60,
    height: 60,
  },
  label: {
    color: "white",
    fontSize: 20,
  },
  pressed: {
    borderColor: "mediumblue",
    opacity: 0.7,
  },
});
