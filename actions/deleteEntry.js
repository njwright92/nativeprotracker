import { DELETE_ENTRY } from './types';

export const deleteEntryAsync = (itemId, entryId) => {
    return new Promise((resolve) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            resolve({ itemId, entryId });
        }, 1000);
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

