import { ADD_ITEM } from './types';
import { v4 as uuidv4 } from 'uuid';
import { createAsyncThunk } from '@reduxjs/toolkit';

const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    });
};

const addItemAsync = createAsyncThunk('items/addItemAsync', async (item) => {
    // Simulating an asynchronous API call with setTimeout
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(item);
        }, 1000)
    );
});

export const addItem = (item) => {
    return async (dispatch) => {
        const newItem = {
            id: uuidv4(),
            ...item,
            date: formatDate(new Date()),
        };
        dispatch({
            type: ADD_ITEM,
            payload: newItem,
        });
        await dispatch(addItemAsync(newItem)).unwrap();
    };
};
