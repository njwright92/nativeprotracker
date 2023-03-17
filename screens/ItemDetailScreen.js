import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addEntry } from '../actions/addEntry.js';
import { deleteEntry } from '../actions/deleteEntry.js';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const ItemDetailScreen = ({ route }) => {
    const navigation = useNavigation();
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

    const renderEntry = useMemo(() => ({ item, formattedDate }) => {
        const renderRightActions = (progress, dragX) => {

            return (
                <View style={styles.deleteContainer}>
                    <TouchableOpacity
                        onPress={() => handleDeleteEntry(item.id)}
                        style={styles.deleteButton}
                    >
                        <Text style={styles.deleteText}>Delete
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        };

        return (
            <Swipeable renderRightActions={renderRightActions}>
                <View style={styles.entryContainer}>
                    <Text style={styles.entryText}>{item.quantity}
                    </Text>
                    <Text style={styles.entryText}>{formattedDate
                    }</Text>
                </View>
            </Swipeable>
        );
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.inputContainer}>
                <Text style={styles.title}>{item.name}
                </Text>
                <Text style={{
                    fontStyle: 'italic',
                    borderBottomWidth: 2,
                    borderBottomColor: 'black'
                }}>ID: {itemId}
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleQuantityChange}
                    value={quantity}
                    placeholder="Quantity"
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: '#5637DD',
                        borderRadius: 10,
                        padding: 10,
                        alignSelf: 'center',
                        width: '80%'
                    }}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center', fontSize: 18 }}>{buttonTitle
                    }</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
                <TouchableOpacity
                    style={{
                        backgroundColor: '#8BC34A',
                        padding: 10,
                        borderRadius: 5,
                        marginVertical: 3,
                    }}
                    onPress={handleAddEntry}
                    disabled={!quantity}
                >
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Add Entry</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        marginTop: 24,
                        backgroundColor: 'black',
                        borderRadius: 10,
                        padding: 20,
                        width: '75%',
                        alignSelf: 'center'
                    }}
                    onPress={() => {
                        navigation.navigate('LineChart', { itemId: item.id, name: item.name });
                    }}
                >
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>Line Chart</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.listContainer}>
                <View style={{ borderBottomWidth: 2, borderBottomColor: 'black' }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#2F4F4F', textAlign: 'center' }}>Product Entries
                    </Text>
                </View>

                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#708090', textAlign: 'center' }}>
                    Quantity{'          '}&&{'          '}Date
                </Text>
                <FlatList
                    data={entries.sort((a, b) => new Date(b.date) - new Date(a.date))}
                    keyExtractor={(entry) => entry.id}
                    renderItem={({ item }) => renderEntry({ item, formattedDate: moment(item.date).format('MM/DD/YYYY') })}
                    ListEmptyComponent={<Text style={styles.entryText}>No Entries Found
                    </Text>}
                    contentContainerStyle={styles.entriesContainer}
                />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D5E4F5',
        alignItems: 'center'
    },
    inputContainer: {
        flex: 1,
        padding: 10,
    },
    listContainer: {
        flex: 1,
        padding: 16,
        marginTop: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    input: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 5,
        marginVertical: 5,
        width: '100%',
        backgroundColor: '#fff',
    },
    entriesContainer: {
        flexGrow: 1,
    },
    entryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.4)',
        marginVertical: 5,
        borderRadius: 4,
        backgroundColor: '#F7F7F7',
    },
    entryText: {
        marginTop: 1,
        marginHorizontal: 20,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic'
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