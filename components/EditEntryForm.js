import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { editEntry } from "../actions/editEntry";

const EditEntryForm = ({ entry, onCancel }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(entry?.quantity || "");

  const handleUpdateEntry = () => {
    if (entry) {
      dispatch(editEntry(entry.itemId, entry.id, { quantity }));
    }
    onCancel();
  };
  const isQuantityEmpty = quantity.trim().length === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Entry</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Quantity:</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        {isQuantityEmpty && (
          <Text style={styles.errorText}>Quantity is required</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color="rgb(137, 168, 234)"
          title="Submit"
          onPress={handleUpdateEntry}
        />
        <Button color="red" title="Cancel" onPress={onCancel} />
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
});

export default EditEntryForm;
