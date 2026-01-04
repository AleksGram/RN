import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { getNotes, updateNote } from "../DBConnector";
import { useIsFocused } from "@react-navigation/native";

function Notes({ navigation, route }) {
  const { carId } = route.params;
  const [notes, setNotes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedText, setEditedText] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchNotes() {
      try {
        const fetchedNotes = await getNotes(carId);
        setNotes(fetchedNotes);
      } catch (error) {
        console.log("Error getting notes", error);
      }
    }
    fetchNotes();
  }, [carId, isFocused]);

  function openNoteHandler(note) {
    setSelectedNote(note);
    setEditedTitle(note.title);
    setEditedText(note.text);
    setIsModalVisible(true);
  }

  function addNoteHandler() {
    navigation.navigate("AddNote", { carId: carId });
  }

  async function saveNoteHandler() {
    try {
      await updateNote(carId, selectedNote.id, {
        ...selectedNote,
        title: editedTitle,
        text: editedText,
      });
      // Update local state to reflect the change immediately
      setNotes((prevNotes) =>
        prevNotes.map((n) =>
          n.id === selectedNote.id
            ? { ...n, title: editedTitle, text: editedText }
            : n
        )
      );
    } catch (error) {
      console.log("Error updating note", error);
    } finally {
      setIsModalVisible(false);
    }
  }

  function renderNoteItem({ item }) {
    return (
      <Pressable
        style={({ pressed }) => [styles.noteItem, pressed && styles.pressed]}
        onPress={() => openNoteHandler(item)}
      >
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.noteSnippet} numberOfLines={1}>
          {item.text}
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderNoteItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
            No notes added yet.
          </Text>
        }
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={addNoteHandler}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.buttonText}>Add Note</Text>
        </Pressable>
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalTitleInput}
              value={editedTitle}
              onChangeText={setEditedTitle}
              placeholder="Note Title"
            />
            <TextInput
              style={styles.modalInput}
              multiline
              value={editedText}
              onChangeText={setEditedText}
              placeholder="Enter note text..."
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveNoteHandler}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.gray700,
  },
  listContainer: {
    paddingBottom: 80,
  },
  noteItem: {
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
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  noteSnippet: {
    fontSize: 14,
    color: Colors.primary100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    width: "85%",
    borderRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },
  modalTitleInput: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.gray700,
    marginBottom: 15,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  modalInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: Colors.gray700,
    minHeight: 150,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  saveButton: {
    backgroundColor: Colors.primary500,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
});
