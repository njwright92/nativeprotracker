import { ADD_ITEM } from './types';
import { v4 as uuidv4 } from 'uuid';
import { createAsyncThunk } from '@reduxjs/toolkit';

const addItemAsync = createAsyncThunk('items/addItemAsync', async (item) => {
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
            name: item.name,
            entries: []
        };
        dispatch({
            type: ADD_ITEM,
            payload: newItem,
        });
        await dispatch(addItemAsync(newItem));
    };
};
