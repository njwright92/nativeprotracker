import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Pressable, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../actions/addNote';
import { deleteNote } from '../actions/deleteNote';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Swipeable } from 'react-native-gesture-handler';


const AddNoteScreen = ({ route }) => {
    const navigation = useNavigation();
    const { item: itemParam } = route.params;
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items);
    const item = items.find((item) => item.id === itemParam.id);
    const [note, setNote] = useState('');
    const [notesList, setNotesList] = useState([]);

    useEffect(() => {
        const notesRef = collection(db, 'items', itemParam.id, 'notes');
        const q = query(notesRef, where('uid', '==', itemParam.uid));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const notesData = [];
            querySnapshot.forEach((doc) => {
                const noteData = doc.data();
                notesData.push({ ...noteData, id: doc.id });
            });
            notesData.sort((a, b) => b.createdAt - a.createdAt);
            setNotesList(notesData);
        }, (error) => {
            console.log('Error fetching notes: ', error);
        });

        // Return a cleanup function to unsubscribe from the snapshot listener
        return () => {
            unsubscribe();
        };
    }, [itemParam]);

    const handleDeleteNote = (noteId) => {
        dispatch(deleteNote(itemParam.id, noteId));
    };


    const handleAddNote = () => {
        console.log(`Added note "${note}" `);
        dispatch(addNote(itemParam.id, note));
        setNote('');
    };

    const renderNote = ({ item }) => {
        const { note, id } = item;

        const renderRightActions = (progress, dragX, noteId) => {
            const trans = dragX.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [0, -20, -100],
            });

            const onPressDelete = () => {
                handleDeleteNote(noteId);
            };

            return (
                <View style={styles.deleteContainer}>
                    <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            );
        };


        return (
            <Swipeable
                renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, id)}
                key={id}
            >
                <View style={styles.entryContainer}>
                    <Text style={styles.entryText}>{note}</Text>
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
                <TextInput
                    style={styles.input}
                    placeholder="Enter your note here"
                    value={note}
                    onChangeText={setNote}
                />
                <View style={styles.button}>
                    <Pressable onPress={handleAddNote}>
                        <Text style={styles.buttonText}>Add Note</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.listContainer}>
                <Text style={styles.notesTitle}>Notes:</Text>
                <FlatList
                    data={notesList}
                    keyExtractor={(item) => item.id}
                    renderItem={renderNote}
                />
            </View>
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
    button: {
        alignItems: 'center',
        backgroundColor: 'rgb(137, 168, 234)',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    notesContainer: {
        flexGrow: 1,
        marginBottom: 12,
        borderRadius: 10,
    },
    notesTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    entryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderWidth: 2,
        borderColor: '#D79578',
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: '#F9FCF3',
    },
    entryText: {
        fontSize: 18,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    backButtonContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        marginTop: 10,
    },
    deleteContainer: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
        borderRadius: 10
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    deleteText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddNoteScreen;
