import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/styles";

const Avatar = ({
  label,
  size = 36,
  backgroundColor = Colors.primary800,
  textColor = "white",
}) => {
  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2, backgroundColor },
      ]}
    >
      <Text style={[styles.text, { color: textColor, fontSize: size / 2 }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    fontWeight: "bold",
  },
});

export default Avatar;
