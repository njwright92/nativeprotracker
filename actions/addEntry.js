import { ADD_ENTRY } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const addEntryAsync = createAsyncThunk(
    'items/addEntryAsync',
    async ({ itemId, quantity, date, name, entryId }) => {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve({ itemId, quantity, date, name, entryId });
            }, 300)
        );
    }
);

export const addEntry = (itemId, quantity, date, name) => {
    return async (dispatch, getState) => {
        const entryId = uuidv4();
        dispatch({
            type: ADD_ENTRY,
            payload: { itemId, quantity, date, name, id: entryId },
        });
        await dispatch(addEntryAsync({ itemId, quantity, date, entryId }));
    };
};

