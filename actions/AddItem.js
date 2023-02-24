import { ADD_ITEM } from './types';
import { v4 as uuidv4 } from 'uuid';
import { addItemAsync } from '../components/AddItemForm';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addItem = (item) => {
    return async (dispatch) => {
        const newItem = {
            id: uuidv4(),
            ...item,
        };
        dispatch({
            type: ADD_ITEM,
            payload: newItem,
        });
        await dispatch(addItemAsync(newItem)).unwrap();
    };
};
