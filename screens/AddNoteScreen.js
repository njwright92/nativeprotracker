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
import EditNoteForm from '../components/editNoteForm';


const AddNoteScreen = ({ route }) => {
    const navigation = useNavigation();
    const { item: itemParam } = route.params;
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items);
    const item = items.find((item) => item.id === itemParam.id);
    const [note, setNote] = useState('');
    const [notesList, setNotesList] = useState([]);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState(null);
    const [isAdding, setIsAdding] = useState(true);



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

        dispatch(addNote(itemParam.id, note));
        setNote('');
    };

    const openEditModal = (item) => {
        setIsAdding(false);
        setNoteToEdit(item);
        setIsEditModalVisible(true);
    };

    const closeEditModal = () => {
        setIsAdding(true)
        setIsEditModalVisible(false);
        setNoteToEdit(null);
    };




    const renderNote = ({ item }) => {
        const { note, id } = item;

        const renderLeftActions = (progress, dragX, noteId) => {
            const trans = dragX.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [0, -20, -100],
            });

            const onPressEdit = () => {

                openEditModal({ ...item, itemId: itemParam.id });
            };

            return (
                <View style={styles.editContainer}>
                    <TouchableOpacity style={styles.editButton} onPress={onPressEdit}>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                </View>
            );
        };


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
                renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, id)}
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
            <View>
                <Text style={styles.title}>{itemParam.name}</Text>

                {isEditModalVisible && (
                    <EditNoteForm note={noteToEdit} onCancel={closeEditModal} />
                )}

                {isAdding && (
                    <>
                        <View style={styles.noteInputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your note here"
                                value={note}
                                onChangeText={setNote}
                                multiline={true}
                            />
                            <View style={styles.button}>
                                <Pressable onPress={handleAddNote}>
                                    <Text style={styles.buttonText}>Add Note</Text>
                                </Pressable>
                            </View>
                        </View>
                    </>
                )}
            </View>
            <View style={styles.listContainer}>
                <Text style={styles.notesTitle}>Notes:</Text>
                <FlatList
                    data={notesList}
                    keyExtractor={(item) => item.id}
                    renderItem={renderNote}
                    ListEmptyComponent={<Text style={styles.entryText}>No notes added yet</Text>}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5BA95',
        padding: 10,
        alignItems: 'center',
    },

    listContainer: {
        width: '100%',
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
    noteInputContainer: {
        backgroundColor: '#F9FCF3',
        borderColor: '#D79578',
        borderWidth: 2,
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    input: {
        borderWidth: 2,
        borderColor: '#D79578',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#F9FCF3',
        minHeight: 100,
        maxHeight: 200
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
    editContainer: {
        backgroundColor: 'rgb(137, 168, 234)',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
        borderRadius: 10
    },
    editButton: {
        backgroundColor: 'rgb(137, 168, 234)',
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
    editText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddNoteScreen;
