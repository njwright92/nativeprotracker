import { ADD_ITEM } from './types';
import { v4 as uuidv4 } from 'uuid';
import { addItemAsync } from '../components/AddItemForm';
import { createAsyncThunk } from '@reduxjs/toolkit';

const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    });
};


export const addItem = (item) => {
    return async (dispatch) => {
        const newItem = {
            id: uuidv4(),
            ...item,
            date: formatDate(new Date()) // assuming formatDate is a function that formats the current date
        };
        dispatch({
            type: ADD_ITEM,
            payload: newItem,
        });
        await dispatch(addItemAsync(newItem)).unwrap();
    };
};
