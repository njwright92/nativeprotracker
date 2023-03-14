import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addEntry } from '../actions/addEntry.js';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

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

    const renderEntry = ({ item, formattedDate }) => {
        return (
            <View style={styles.entryContainer}>
                <Text style={styles.entryText}>{item.quantity}</Text>
                <Text style={styles.entryText}>{formattedDate}</Text>
            </View>
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
            <Button title="Add Entry" onPress={handleAddEntry} />
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
        backgroundColor: '#f2f2f2',
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
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 4,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    entryText: {
        fontSize: 16,
        marginHorizontal: 8,
    },
    addButton: {
        backgroundColor: '#0066cc',
        padding: 12,
        borderRadius: 4,
        marginVertical: 16,
        width: '80%',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});



export default ItemDetailScreen;