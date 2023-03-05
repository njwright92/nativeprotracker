import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
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
        setShouldShowForm(false); // hide the form after adding an item
    };

    const handleUpdateItem = (id, quantity) => {
        dispatch(updateItemAsync(id, quantity));
    };

    const handleDeleteItem = (id) => {
        dispatch(deleteItemAsync(id));
    };

    return (
        <View style={styles.container}>
            {shouldShowForm ? (
                <View style={styles.formContainer}>
                    <AddItemForm onAddItem={handleAddItem} />
                </View>
            ) : null}
            <View style={styles.listContainer}>
                <ItemsList onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem} />
            </View>
            <Button
                title={shouldShowForm ? "Hide Form" : "Show Form"}
                onPress={() => setShouldShowForm(!shouldShowForm)}
            />
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
