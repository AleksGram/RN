import { StyleSheet, View, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { ICON_MAP } from "../mockData";

function ServiceHistory({ route }) {
  const { notes, type } = route.params;

  const iconName = ICON_MAP[type] || ICON_MAP.default;
  const operationName = type.charAt(0).toUpperCase() + type.slice(1) + " Change History";

  function renderHistoryItem({ item }) {
    return (
      <View style={styles.historyItem}>
        <View style={styles.infoContainer}>
          <Text style={styles.mileageText}>{item.mileage} km</Text>
          {item.partName ? (
            <Text style={styles.partText}>{item.partName}</Text>
          ) : null}
        </View>
        <Ionicons name="checkmark-circle-outline" size={20} color={Colors.primary500} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name={iconName} size={40} color={Colors.primary500} />
        <Text style={styles.headerText}>{operationName}</Text>
      </View>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

export default ServiceHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.gray700,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  listContainer: {
    paddingBottom: 20,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.primary800,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoContainer: {
    flex: 1,
  },
  mileageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  partText: {
    fontSize: 14,
    color: Colors.primary100,
    marginTop: 2,
  },
});
