import { DELETE_ENTRY } from './types';

export const deleteEntryAsync = (itemId, entryId) => {
    return new Promise((resolve) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            resolve({ itemId, entryId });
        }, 300);
    });
};

export const deleteEntry = (itemId, entryId) => {
    return async (dispatch) => {
        await deleteEntryAsync(itemId, entryId);
        dispatch({
            type: DELETE_ENTRY,
            payload: { itemId, entryId }
        });
    };
};

