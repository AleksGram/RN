import { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";

function NoteItem({ title, text, onEdit }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [firstLine, setFirstLine] = useState(null);

  // Hidden full-text copy is measured to know if the 1-line snippet is truncated.
  // It's narrower than the visible text to leave room for the " …" suffix.
  function measureTextHandler(event) {
    const { lines } = event.nativeEvent;
    setFirstLine(lines.length > 1 ? lines[0].text.trimEnd() : null);
  }

  const canExpand = firstLine !== null;
  const collapsedText = canExpand ? firstLine + " …" : text;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Pressable
          style={({ pressed }) => [
            styles.editButton,
            pressed && styles.pressed,
          ]}
          onPress={onEdit}
          hitSlop={8}
        >
          <Ionicons name="create-outline" size={22} color={Colors.primary200} />
        </Pressable>
      </View>

      <Text style={styles.text} numberOfLines={isExpanded ? undefined : 1}>
        {isExpanded ? text : collapsedText}
      </Text>
      <Text
        style={[styles.text, styles.measureText]}
        onTextLayout={measureTextHandler}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {text}
      </Text>

      {canExpand && (
        <Pressable
          style={({ pressed }) => [
            styles.toggleButton,
            pressed && styles.pressed,
          ]}
          onPress={() => setIsExpanded((current) => !current)}
          hitSlop={8}
        >
          <Text style={styles.toggleText}>
            {isExpanded ? "View less" : "View more"}
          </Text>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={18}
            color={Colors.primary200}
          />
        </Pressable>
      )}
    </View>
  );
}

export default NoteItem;

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  editButton: {
    marginLeft: 12,
    padding: 2,
  },
  text: {
    fontSize: 14,
    color: Colors.primary100,
  },
  measureText: {
    position: "absolute",
    left: 16,
    right: 16 + 24,
    opacity: 0,
    pointerEvents: "none",
  },
  toggleButton: {
    alignSelf: "flex-end",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  toggleText: {
    fontSize: 14,
    color: Colors.primary200,
    fontStyle: "italic",
  },
  pressed: {
    opacity: 0.7,
  },
});
