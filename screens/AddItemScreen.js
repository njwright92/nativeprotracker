import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Text, Pressable, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import AddItemForm from '../components/AddItemForm';
import ItemsList from '../components/ItemsList';
import { addItem } from '../actions/AddItem';
import { updateItem } from '../actions/UpdateItem';
import { deleteItem } from '../actions/DeleteItem';
import { Ionicons } from '@expo/vector-icons';

const AddItemScreen = () => {
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
                        <Ionicons name="chevron-back" size={28} color='black' />
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 24 }}>
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
                <Text style={styles.text}>Items sorted by most recently added</Text>
                <ItemsList onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem} />
            </View>
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(137, 168, 234)' : 'rgb(137, 168, 234)', borderRadius: 20, padding: 16, width: '85%', alignItems: 'center', marginTop: 10, }]}
                onPress={() => setShouldShowForm(!shouldShowForm)}
            >
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>{shouldShowForm ? 'Hide Form' : 'Show Form'}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5BA95',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    formContainer: {
        backgroundColor: '#F9FCF3',
        borderColor: '#D79578',
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%'
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#D79578',
        alignSelf: 'stretch',
        borderRadius: 10,
        padding: 10,

    },
    backButtonContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        marginTop: 10,
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default AddItemScreen;
