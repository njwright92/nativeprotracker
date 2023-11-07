import React, { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { editNote } from "../actions/editNote";

const EditNoteForm = ({ note, onCancel }) => {
  const dispatch = useDispatch();
  const [editedNote, setEditedNote] = useState(note?.note ?? "");

  const handleUpdateNote = () => {
    if (note) {
      dispatch(editNote(note.itemId, note.id, { note: editedNote }));
    }
    onCancel();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Note</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Note:</Text>
        <TextInput
          style={styles.input}
          value={editedNote}
          onChangeText={setEditedNote}
          multiline
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.buttonBase,
            {
              backgroundColor: pressed
                ? "rgba(137, 168, 234)"
                : "rgb(137, 168, 234)",
            },
          ]}
          onPress={handleUpdateNote}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.buttonBase,
            { backgroundColor: pressed ? "red" : "red" },
          ]}
          onPress={onCancel}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FCF3",
    borderColor: "#D79578",
    borderWidth: 2,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#D79578",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    maxHeight: 200,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  buttonBase: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
});

export default EditNoteForm;
