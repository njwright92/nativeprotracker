import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { editEntry } from '../actions/editEntry';

const EditEntryForm = ({ itemId, entryId, onCancel }) => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items);
    const item = items.find((item) => item.id === itemId);
    const entry = item ? item.entries.find((entry) => entry.id === entryId) : null;
    const [quantity, setQuantity] = useState(entry ? entry.quantity : '');

    const handleUpdateEntry = () => {
        console.log('Updating entry...', itemId, entryId, quantity);
        if (item && entry) {
            dispatch(
                editEntry({
                    id: itemId,
                    entryId,
                    quantity: quantity
                })
            );
        }
        onCancel();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Entry</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Quantity:</Text>
                <TextInput
                    style={styles.input}
                    value={quantity}
                    onChangeText={(text) => setQuantity(text)}
                    keyboardType="numeric"
                />
                {quantity.trim().length === 0 && (
                    <Text style={styles.errorText}>Quantity is required</Text>
                )}
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    color="#556B2F"
                    title="Submit"
                    onPress={handleUpdateEntry}
                />
                <Button
                    color="maroon"
                    title="Cancel"
                    onPress={onCancel}
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: 'blue',
        borderWidth: 2,
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
});

export default EditEntryForm;
