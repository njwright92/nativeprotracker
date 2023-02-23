import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from './types';
import { v4 as uuidv4 } from 'uuid';
import { addItemAsync } from '../components/AddItemForm';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addItem = (item) => {
    return async (dispatch) => {
        const newItem = {
            id: uuidv4(),
            ...item,
        };
        dispatch({
            type: ADD_ITEM,
            payload: newItem,
        });
        await dispatch(addItemAsync(newItem)).unwrap();
    };
};

export const updateItemAsync = createAsyncThunk('items/updateItem', async (payload) => {
    const { id, quantity } = payload;
    // Simulate a delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { id, quantity };
});

export const updateItem = (id, quantity) => {
    return (dispatch) => {
        dispatch(updateItemAsync({ id, quantity }));
    };
};

export const deleteItemAsync = createAsyncThunk('items/deleteItem', async (id) => {
    // Simulate a delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 1000));
    return id;
});

export const deleteItem = (id) => {
    return (dispatch) => {
        dispatch(deleteItemAsync(id));
    };
};
