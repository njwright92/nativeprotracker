import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from './types';

export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        payload: item,
    };
};

export const updateItem = (id, quantity) => {
    return {
        type: UPDATE_ITEM,
        payload: {
            id,
            quantity,
        },
    };
};

export const deleteItem = (id) => {
    return {
        type: DELETE_ITEM,
        payload: id,
    };
};
