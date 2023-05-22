import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Text, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import AddItemForm from '../components/AddItemForm';
import ItemsList from '../components/ItemsList';
import { addItem } from '../actions/AddItem';
import { updateItem } from '../actions/UpdateItem';
import { deleteItem } from '../actions/DeleteItem';
import { Ionicons } from '@expo/vector-icons';
import { logEvent } from '@firebase/analytics';

const AddItemScreen = () => {
    logEvent;

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [shouldShowForm, setShouldShowForm] = useState(true);

    const handleAddItem = (item) => {
        dispatch(addItem(item));
    };

    const handleUpdateItem = (id, name) => {
        dispatch(updateItem(id, name));
    };

    const handleDeleteItem = (id) => {
        dispatch(deleteItem(id));
    };

    return (
        <View style={styles.container}>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#fff' : 'transparent',
                            borderRadius: 20,
                            padding: 16,
                            width: '85%',
                            marginTop: 10,
                            alignSelf: 'flex-start',
                            alignItems: 'flex-start',
                        },
                    ]}
                    onPress={() => navigation.goBack()}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="chevron-back" size={28} color='white' />
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>
                            Back
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {shouldShowForm && (
                <View style={styles.formContainer}>
                    <AddItemForm onAddItem={handleAddItem} />
                </View>
            )}
            <View style={styles.listContainer}>
                <ItemsList onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem} />
            </View>
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? '#0D47A1' : '#0A3D6E', borderRadius: 20, padding: 16, width: '85%', alignItems: 'center', marginTop: 10, }]}
                onPress={() => setShouldShowForm(!shouldShowForm)}
            >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{shouldShowForm ? 'Hide Form' : 'Show Form'}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#778899',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    formContainer: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width: '90%',
    },
    listContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignSelf: 'stretch',
    },
    backButtonContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        marginTop: 10,
    },
});

export default AddItemScreen;
