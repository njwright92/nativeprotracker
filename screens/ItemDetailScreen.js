import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addEntry } from '../actions/addEntry.js';
import { deleteEntry } from '../actions/deleteEntry.js';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Swipeable } from 'react-native-gesture-handler';

const ItemDetailScreen = ({ route }) => {
    const { itemId } = route.params;
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items);
    const item = items.find((item) => item.id === itemId);
    const entries = item.entries;

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [quantity, setQuantity] = useState('');
    const [buttonTitle, setButtonTitle] = useState(moment(date).format('MM/DD/YYYY'));

    const handleQuantityChange = (text) => {
        setQuantity(text);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        const formattedDate = moment(selectedDate).format('MM/DD/YYYY');
        setButtonTitle(formattedDate);
        console.log('on Date Change', currentDate, event, date);
    };

    const handleAddEntry = () => {
        dispatch(addEntry(itemId, quantity, date, item.name));
        setQuantity('');
    };

    const handleDeleteEntry = (entryId) => {
        console.log('Delete', item.id);
        dispatch(deleteEntry(itemId, entryId));
    };

    const renderEntry = ({ item, formattedDate }) => {
        const renderRightActions = (progress, dragX) => {
            // Define the action to be performed when the user swipes right (i.e. delete)

            return (
                <View style={styles.deleteContainer}>
                    <TouchableOpacity
                        onPress={() => handleDeleteEntry(item.id)}
                        style={styles.deleteButton}
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            );
        };

        return (
            <Swipeable renderRightActions={renderRightActions}>
                <View style={styles.entryContainer}>
                    <Text style={styles.entryText}>{item.quantity}</Text>
                    <Text style={styles.entryText}>{formattedDate}</Text>
                </View>
            </Swipeable>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>ID: {itemId}</Text>
            <TextInput
                style={styles.input}
                onChangeText={handleQuantityChange}
                value={quantity}
                placeholder="Quantity"
                keyboardType="numeric"
            />
            <Button
                color='#5637DD'
                title={buttonTitle}
                onPress={() => {
                    setShowDatePicker(true);
                }}
                accessibilityLabel='Tap me to select a date'
            />
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            <View style={{ marginTop: 6 }}>
                <Button
                    color='#8BC34A'
                    title="Add Entry"
                    onPress={handleAddEntry}
                />
            </View>

            <FlatList
                data={entries}
                keyExtractor={(entry) => entry.id}
                renderItem={({ item }) => renderEntry({ item, formattedDate: moment(item.date).format('MM/DD/YYYY') })}
                ListEmptyComponent={<Text>No Entries Found</Text>}
                contentContainerStyle={styles.entriesContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6e6e6',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginVertical: 8,
        width: '80%',
        backgroundColor: '#fff',
    },
    entriesContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    entryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 7,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.4)',
        marginVertical: 4,
        borderRadius: 4,
        backgroundColor: '#F7F7F7',
    },
    entryText: {
        fontSize: 18,
        marginHorizontal: 8,
    },
    deleteContainer: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: '80%',
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: '80%',
    },
    deleteText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
});



export default ItemDetailScreen;