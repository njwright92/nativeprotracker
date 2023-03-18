import { createAsyncThunk } from '@reduxjs/toolkit';
import { EDIT_ENTRY } from './types';

export const editEntryAsync = createAsyncThunk(
    'items/editEntryAsync',
    async ({ itemId, quantity, entryId }) => {
        const editedEntry = { itemId, quantity,id: entryId };
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve({ editedEntry });
            }, 300)
        );
    }
);

export const editEntry = (itemId, entryId, quantity) => {
    return async (dispatch) => {
        await editEntryAsync({ itemId, quantity, entryId });
        dispatch({
            type: EDIT_ENTRY,
            payload: { itemId, entryId, quantity },
        });
    };
};
