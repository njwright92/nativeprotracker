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
            <View style={styles.formContainer}>
                <AddItemForm onAddItem={handleAddItem} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#778899',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        alignSelf: 'stretch',
    },
});

export default AddItemScreen;
