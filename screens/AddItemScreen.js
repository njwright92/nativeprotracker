import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddItemForm from '../components/AddItemForm';
import ItemsList from '../components/ItemsList';

const AddItemScreen = () => {
    const handleAddItem = (item) => {
        // handle adding new item here
        console.log('New item:', item);
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <AddItemForm onAddItem={handleAddItem} />
            </View>
            <View style={styles.listContainer}>
                <ItemsList />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2F4F4F',
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
