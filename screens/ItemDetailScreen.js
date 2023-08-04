import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from '../actions/addEntry';
import { deleteEntry } from '../actions/deleteEntry';
import { editEntry } from '../actions/editEntry';
import EditEntryForm from '../components/EditEntryForm';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getAllEntriesByCurrentUser } from '../actions/getEntry';

const ItemDetailScreen = ({ route }) => {

    const navigation = useNavigation();
    const { item: itemParam } = route.params;
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items);
    const item = items.find((item) => item.id === itemParam.id);
    const [entries, setEntries] = useState([]);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [quantity, setQuantity] = useState('');
    const [buttonTitle, setButtonTitle] = useState(moment(date).format('MM/DD/yyyy'));
    const [editingEntryId, setEditingEntryId] = useState(null);


    useEffect(() => {
        const handleEntriesUpdate = (updatedEntries) => {
            setEntries(updatedEntries);
        };

        const unsubscribe = getAllEntriesByCurrentUser(itemParam.id, handleEntriesUpdate);

        return () => {
            unsubscribe;
        };
    }, [itemParam.id]);


    const handleQuantityChange = (text) => {
        setQuantity(text);
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDateTimePicker(false);

        if (selectedDate) {
            const formattedDate = moment(selectedDate).format('MM/DD/yyyy');
            setDate(selectedDate);
            setButtonTitle(formattedDate);
        }
    };

    const handleAddEntry = () => {
        dispatch(addEntry(itemParam.id, quantity, date));
        setQuantity('');
    };

    const handleDeleteEntry = (entryId) => {
        dispatch(deleteEntry(itemParam.id, entryId));
    };

    const handleUpdateEntry = (entryId, newQuantity) => {
        dispatch(editEntry(item.id, entryId, { quantity: newQuantity }));
        setEditingEntryId(null);
    };

    const renderEntry = ({ item: entry }) => {
        const { date, quantity } = entry;

        let formattedDate = '';

        if (date && typeof date.toDate === 'function') {
            formattedDate = moment(date.toDate()).format('MM/DD/yyyy');
        } else if (date instanceof Date) {
            formattedDate = moment(date).format('MM/DD/yyyy');
        } else if (typeof date === 'string') {
        } else {
            formattedDate = 'N/A';
        }

        const renderRightActions = (progress, dragX) => {
            return (
                <View style={styles.deleteContainer}>
                    <TouchableOpacity
                        onPress={() => handleDeleteEntry(entry.id)}
                        style={styles.deleteButton}
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            );
        };

        const renderLeftActions = (progress, dragX) => {
            const trans = dragX.interpolate({
                inputRange: [-100, 0],
                outputRange: [1, 0],
            });

            const onPressEdit = () => {
                setEditingEntryId(entry.id);
            };

            return (
                <View style={styles.updateContainer}>
                    <TouchableOpacity style={styles.updateButton} onPress={onPressEdit}>
                        <Text style={styles.updateText}>Edit</Text>
                    </TouchableOpacity>
                </View>
            );
        };

        if (editingEntryId && entry && entry.id === editingEntryId) {
            return (
                <EditEntryForm
                    entry={entry}
                    item={item}
                    quantity={quantity}
                    onSubmit={handleUpdateEntry}
                    onCancel={() => setEditingEntryId(null)}
                />
            );
        }

        return (
            <Swipeable renderRightActions={renderRightActions} renderLeftActions={renderLeftActions}>
                <View style={styles.entryContainer}>
                    <Text style={styles.entryText}>{quantity}</Text>
                    <Text style={styles.entryText}>{formattedDate}</Text>
                </View>
            </Swipeable>
        );
    };


    return (
        <View style={styles.container}>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'black' : 'black',
                            borderRadius: 20,
                            padding: 16,
                            width: '85%',
                            marginTop: 10,
                            alignSelf: 'flex-start',
                            alignItems: 'flex-start',
                        },
                    ]}
                    onPress={() => navigation.goBack()} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="chevron-back" size={28} color='black' />
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 24 }}>
                            Back
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>{itemParam.name}</Text>
                <Text style={styles.textDate}>
                    Entries sorted by date newest first.
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
                        backgroundColor: 'rgb(137, 168, 234)',
                        borderRadius: 10,
                        padding: 10,
                        alignSelf: 'center',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: 1,
                        shadowRadius: 2,
                    }}
                    onPress={() => setShowDateTimePicker(true)}
                >
                    <Text style={{ fontWeight: 'bold', color: 'black', textAlign: 'center', fontSize: 18 }}>{buttonTitle
                    }</Text>
                </TouchableOpacity>
                {showDateTimePicker && (
                    <DateTimePicker
                        value={date}
                        onChange={handleDateChange}
                        dateFormat="MM/dd/yyyy"
                    />
                )}
                <TouchableOpacity
                    style={{
                        backgroundColor: 'rgb(106, 163, 137)',
                        padding: 10,
                        borderRadius: 10,
                        marginVertical: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: 1,
                        shadowRadius: 2,
                    }}
                    onPress={handleAddEntry}
                    disabled={!quantity}
                >
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>Add Entry</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.listContainer}>
                <View style={{ borderBottomWidth: 2, borderBottomColor: '#D79578' }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
                        Product Entries
                    </Text>
                </View>

                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
                    Quantity{'          '}&&{'          '}Date
                </Text>
                <FlatList
                    data={entries}
                    keyExtractor={(entry) => entry.id}
                    renderItem={({ item }) => renderEntry({ item })}
                    extraData={entries}
                    ListEmptyComponent={<Text style={styles.entryText}>No Entries Found</Text>}
                    contentContainerStyle={styles.entriesContainer}
                />
            </View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black', textAlign: 'center', marginTop: 5, marginBottom: 5 }}>Select below to view Line Charts and download data "CSV or PDF"</Text>
            <TouchableOpacity
                style={styles.card}
                onPress={() => {
                    navigation.navigate('LineChart', { itemId: itemParam.id, name: itemParam.name });
                }}
            >
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/img/chart.png')} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Line Chart</Text>
                </View>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5BA95',
        alignItems: 'center',

    },
    inputContainer: {
        borderRadius: 10,
    },
    listContainer: {
        width: '100%',
        flex: 1,
        padding: 10,
        marginTop: 5,
        borderRadius: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    input: {
        borderWidth: 2,
        borderColor: '#D79578',
        borderRadius: 10,
        padding: 5,
        marginVertical: 5,
        width: '100%',
        backgroundColor: '#F9FCF3',
    },
    entriesContainer: {
        flexGrow: 1,
        marginBottom: 12,
        borderRadius: 10,
    },
    entryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderWidth: 2,
        borderColor: '#D79578',
        marginVertical: 5,
        borderRadius: 10,
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
        height: '75%',
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: '75%',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    deleteText: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
    },
    updateButton: {
        backgroundColor: 'rgb(137, 168, 234)',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: '75%',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    updateText: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
    },
    updateContainer: {
        backgroundColor: 'rgb(137, 168, 234)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: '75%',
    },
    card: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 10,
        width: '32%',
        alignSelf: 'center',
        overflow: 'hidden',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textContainer: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 10,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    backButtonContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        marginTop: 10,
    },
    textDate: {
        color: 'black',
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});



export default ItemDetailScreen;