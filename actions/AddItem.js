import { ADD_ITEM } from './types';
import { v4 as uuidv4 } from 'uuid';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, onSnapshot, addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
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
            uid: user.uid 
        };

        try {
            const docRef = await addDoc(collection(db, "items"), newItem);
            console.log('addItem', newItem);

            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                dispatch({
                    type: ADD_ITEM,
                    payload: { ...docSnap.data(), id: docRef.id },
                });

                onSnapshot(doc(db, "items", docRef.id), () => { });

                await dispatch(addItemAsync(docSnap.data()));
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };
};
