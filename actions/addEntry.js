import { ADD_ENTRY } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { doc, onSnapshot, addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { getAuth } from "firebase/auth";

export const addEntryAsync = createAsyncThunk(
    'items/addEntryAsync',
    async ({ itemId, quantity, date, name, entryId }) => {
        const auth = getAuth();
        const user = auth.currentUser;

        const entry = {
            id: entryId,
            name: name,
            quantity: quantity,
            date: date,
            uid: user.uid, // add user's UID to the entry document
        };

        try {
            const docRef = doc(firestore, 'items', itemId);
            await addDoc(collection(docRef, 'entries'), entry);
            console.log('addEntry', entry);
        } catch (error) {
            console.error('Error adding document: ', error);
        }

        return { itemId, quantity, date, name, entryId };
    }
);

export const addEntry = (itemId, quantity, date, name) => {
    return async (dispatch, getState) => {
        const entryId = uuidv4();
        dispatch({
            type: ADD_ENTRY,
            payload: { itemId, quantity, date, name, id: entryId },
        });
        await dispatch(addEntryAsync({ itemId, quantity, date, name, entryId }));

        // Add a listener to the entry subcollection to update the local state
        onSnapshot(
            collection(firestore, 'items', itemId, 'entries'),
            (snapshot) => {
                const entries = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log('addEntry snapshot', entries);
                // Update local state with the new entry
                dispatch({
                    type: 'items/updateItemEntries',
                    payload: { itemId, entries },
                });
            }
        );
    };
};
