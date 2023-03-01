import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useDispatch } from 'react-redux';

import AddItemForm from '../components/AddItemForm';
import ItemsList from '../components/ItemsList';
import { addItemAsync } from '../actions/AddItem';
import { updateItemAsync } from '../actions/UpdateItem';
import { deleteItemAsync } from '../actions/DeleteItem';

const AddItemScreen = () => {
    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        // dispatch an action to add the new item to the store
        dispatch(addItemAsync(item));
    };

    const handleUpdateItem = (id, quantity) => {
        // dispatch an action to update the item in the store
        dispatch(updateItemAsync(id, quantity));
    };

    const handleDeleteItem = (id) => {
        // dispatch an action to delete the item from the store
        dispatch(deleteItemAsync(id));
    };

    return (
      
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <AddItemForm onAddItem={handleAddItem} />
                </View>
                <View style={styles.listContainer}>
                    <ItemsList
                        onUpdateItem={handleUpdateItem}
                        onDeleteItem={handleDeleteItem}
                    />
                </View>
            </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    formContainer: {
        backgroundColor: 'white',
        borderColor: 'blue',
        borderWidth: 2,
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
    },
});

export default AddItemScreen;
