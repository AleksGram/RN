import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { Colors } from "../constants/styles";
import { addNote } from "../DBConnector";

function AddNote({ navigation, route }) {
  const { carId } = route.params;
  const [noteData, setNoteData] = useState({
    title: "",
    text: "",
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setNoteData((curData) => {
      return {
        ...curData,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  async function handleSave() {
    console.log("Saving note:", noteData, "for car:", carId);
    // TODO: Implement actual save logic to DB
    try {
      const id = await addNote(carId, noteData);
    } catch (error) {
      console.log("Can't add note", error);
    }
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Note Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Tire maintenance"
          placeholderTextColor="#999"
          value={noteData.title}
          onChangeText={inputChangedHandler.bind(this, "title")}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Note Content</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Type your note here..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          value={noteData.text}
          onChangeText={inputChangedHandler.bind(this, "text")}
        />
      </View>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save Note</Text>
      </Pressable>
    </ScrollView>
  );
}

export default AddNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.gray700,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.gray700,
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  textArea: {
    minHeight: 150,
  },
  button: {
    backgroundColor: Colors.primary500,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.7,
  },
});
