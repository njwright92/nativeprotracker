import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateItem } from '../actions/UpdateItem';

const UpdateItemForm = ({ itemId, listItems, onCancel }) => {
    const dispatch = useDispatch();
    const item = listItems ? listItems.find((item) => item.id === itemId) : null;
    const [quantity, setQuantity] = useState(item ? item.quantity.toString() : '');

    const handleUpdateItem = () => {
        if (item) {
            const now = new Date();
            dispatch(
                updateItem({
                    id: itemId,
                    name: `${item.name} (${now.toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                    })})`,
                    quantity: parseInt(quantity),
                })
            );
        }
        onCancel();
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Item</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Quantity:</Text>
                <TextInput
                    style={styles.input}
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={handleUpdateItem}>
                    <Text style={styles.buttonText}>Update</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={onCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
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
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '48%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default UpdateItemForm;
