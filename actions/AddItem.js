import { ADD_ITEM } from './types';
import { v4 as uuidv4 } from 'uuid';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, onSnapshot, addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { getAuth } from "firebase/auth";

export const addItemAsync = createAsyncThunk('items/addItemAsync', async (item) => {
    return item;
});

export const addItem = (item) => {
    return async (dispatch) => {
        const auth = getAuth();
        const user = auth.currentUser;

        const newItem = {
            id: uuidv4(),
            name: item.name,
            entries: [],
            uid: user.uid // add user's UID to the item document
        };

        try {
            const docRef = await addDoc(collection(firestore, "items"), newItem);
            console.log('addItem', newItem);
            dispatch({
                type: ADD_ITEM,
                payload: { ...newItem, id: docRef.id },
            });

            // Add a listener to the newly created document to update the local state
            onSnapshot(doc(firestore, "items", docRef.id), () => { });

            await dispatch(addItemAsync(newItem));
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };
};
