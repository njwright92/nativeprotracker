import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateItem } from '../actions/UpdateItem';
import DateTimePicker from '@react-native-community/datetimepicker';

const UpdateItemForm = ({ itemId, listItems, onCancel }) => {
    const dispatch = useDispatch();
    const item = listItems ? listItems.find((item) => item.id === itemId) : null;
    const [quantity, setQuantity] = useState(item ? item.quantity.toString() : '');
    const [showDatePicker, setShowDatePicker] = useState(false);
    console.log('UDPATE INIT', item)
    const [date, setDate] = useState(item.date);


    const handleUpdateItem = () => {
        if (item) {
            console.log('handleUpdateItem', date)
            dispatch(
                updateItem({
                    id: itemId,
                    name: `${item.name.split('(')[0]}`, // (${formattedDate})
                    date: date,
                    quantity: parseInt(quantity),
                })
            );
        }
        onCancel();
    };

    const onDateChange = async (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        await setDate(selectedDate);
        console.log('onDaateChange', event, selectedDate, date);
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
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Date:</Text>
                <Pressable onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.date}>
                        {date.toLocaleDateString('en-US', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric',
                        })}
                    </Text>
                </Pressable>
            </View>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}
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
    date: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '48%',
        color: 'white',
        textAlign: 'center',
    }
});

export default UpdateItemForm;
