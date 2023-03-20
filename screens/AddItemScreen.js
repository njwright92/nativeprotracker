import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import AddItemForm from '../components/AddItemForm';
import ItemsList from '../components/ItemsList';
import { addItemAsync } from '../actions/AddItem';
import { updateItemAsync } from '../actions/UpdateItem';
import { deleteItemAsync } from '../actions/DeleteItem';

const AddItemScreen = () => {
    const dispatch = useDispatch();

    const [shouldShowForm, setShouldShowForm] = useState(true);

    const handleAddItem = (item) => {
        dispatch(addItemAsync(item));
    };

    const handleUpdateItem = (id, quantity) => {
        dispatch(updateItemAsync(id, quantity));
    };

    const handleDeleteItem = (id) => {
        dispatch(deleteItemAsync(id));
    };

    return (
        <View style={styles.container}>
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
});

export default AddItemScreen;
