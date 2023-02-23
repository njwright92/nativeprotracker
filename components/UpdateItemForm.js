import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateItemAsync } from '../actions/items';

const UpdateItemForm = ({ itemId, listItems, onCancel }) => {
    const dispatch = useDispatch();
    const item = listItems ? listItems.find((item) => item.id === itemId) : null;
    const [quantity, setQuantity] = useState(item ? item.quantity : 0);

    const handleUpdateItem = () => {
        if (item) {
            dispatch(updateItemAsync({ id: item.id, quantity }));
        }
        onCancel();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Item</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={quantity.toString()}
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
