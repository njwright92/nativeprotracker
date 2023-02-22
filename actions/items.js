import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from './types';
import { v4 as uuidv4 } from 'uuid';

export const addItem = (item) => {
    const newItem = {
        id: uuidv4(),
        ...item,
    };
    return {
        type: ADD_ITEM,
        payload: newItem,
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
