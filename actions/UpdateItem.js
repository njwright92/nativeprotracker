import { UPDATE_ITEM } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    });
}

export const updateItemAsync = createAsyncThunk('items/updateItem', async (payload) => {
    const { id, quantity } = payload;
    return { id, quantity };
});

export const updateItem = (item) => {
    return {
        type: UPDATE_ITEM,
        payload: {
            ...item,
            date: formatDate(new Date())
        }
    };
};
