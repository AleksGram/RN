import { StyleSheet, View, Text, Image, Pressable } from "react-native";

function CarTile({ carName, carModel, imageUri, plate, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.imageAndPlateContainer}>
        <Image style={styles.logo} source={imageUri} />
        <Text style={styles.plateLabel}>{plate}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{carModel}</Text>
        <Text style={styles.label}>{carName}</Text>
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
  imageAndPlateContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  logo: {
    width: 60,
    height: 60,
  },
  label: {
    color: "white",
    fontSize: 20,
  },
  plateLabel: {
    color: "lightsteelblue",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
  pressed: {
    borderColor: "mediumblue",
    opacity: 0.7,
  },
});
