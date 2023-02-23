import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Pressable } from 'react-native';
import { deleteItemAsync } from '../actions/items';

const DeleteItem = ({ id }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteItemAsync(id));
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

export default DeleteItem;
