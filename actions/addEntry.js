import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { doc, onSnapshot, addDoc, collection, getDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { getAuth } from "firebase/auth";
import { ADD_ENTRY } from './types';

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
            uid: user.uid,
        };

        try {
            const docRef = doc(firestore, 'items', itemId);
            await addDoc(collection(docRef, 'entries'), entry);
            console.log('addEntry', entry);

            // Get the updated document and its data
            const docSnap = await getDoc(docRef);
            const itemData = docSnap.data();

            return { itemId, quantity, date, name, entryId, entries: itemData.entries };
        } catch (error) {
            console.error('Error adding document: ', error);
        }
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
