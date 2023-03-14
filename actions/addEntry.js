import { ADD_ENTRY } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addEntryAsync = createAsyncThunk(
    'items/addEntryAsync',
    async ({ itemId, quantity, date, name }) => {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve({ itemId, quantity, date, name });
            }, 1000)
        );
    });

export const addEntry = (itemId, quantity, date, name) => {
    return async (dispatch) => {
        dispatch({
            type: ADD_ENTRY,
            payload: { itemId, quantity, date, name },
        });
        await dispatch(addEntryAsync({ itemId, quantity, date }));
    };
};

