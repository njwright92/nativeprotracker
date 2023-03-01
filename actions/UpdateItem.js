import { UPDATE_ITEM } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const updateItemAsync = createAsyncThunk(
    'items/updateItem',
    async (payload) => {
        const { id, name, quantity, date } = payload;
        return { id, name, quantity, date };
    }
);


export const updateItem = (item) => {
    return {
        type: UPDATE_ITEM,
        payload: {
            ...item,
        }
    };
};
