import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddItemForm from '../components/AddItemForm';

const AddItemScreen = () => {
    const handleAddItem = (item) => {
        // handle adding new item here
        console.log('New item:', item);
    };

    return (
        <View style={styles.container}>
            <AddItemForm onAddItem={handleAddItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AddItemScreen;
