import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Pressable } from 'react-native';
import { deleteItem } from '../actions/DeleteItem';

const DeleteItemForm = ({ id }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteItem(id));
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10 }}>Delete</Text>
            <Pressable onPress={handleDelete}>
                <Text style={{ color: 'red' }}>X</Text>
            </Pressable>
        </View>
    );
};

export default DeleteItemForm;
