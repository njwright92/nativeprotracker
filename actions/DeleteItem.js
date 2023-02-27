import { DELETE_ITEM } from './types';

export const deleteItemAsync = (id) => {
    return new Promise((resolve) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            resolve(id);
        }, 1000);
    });
};

export const deleteItem = (id) => {
    return async (dispatch) => {
        await deleteItemAsync(id);
        dispatch({
            type: DELETE_ITEM,
            payload: { id }
        });
    };
};
