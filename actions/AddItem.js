import { ADD_ITEM } from './types';
import { v4 as uuidv4 } from 'uuid';

import { doc, onSnapshot, addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from "firebase/auth";

export const addItem = (item, entries = []) => {
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
                const itemData = { ...docSnap.data(), id: docRef.id };
                dispatch({
                    type: ADD_ITEM,
                    payload: itemData,
                });

                if (entries.length > 0) {
                    // add the entries to the newly created item
                    for (const entry of entries) {
                        const entryId = uuidv4();
                        const newEntry = {
                            id: entryId,
                            name: entry.name,
                            quantity: entry.quantity,
                            date: entry.date,
                            uid: user.uid
                        };
                        await addDoc(collection(docRef, 'entries'), newEntry);
                    }
                }

                // listen for updates to the 'entries' subcollection of the item
                onSnapshot(collection(doc(db, "items", docRef.id), 'entries'), (snapshot) => {
                    const entries = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    console.log('addItem snapshot', entries);
                });

            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.log('Error adding document: ', error);
        }

    };
};
