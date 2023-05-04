import { ADD_ENTRY } from './types';
import { onSnapshot, addDoc, collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from "firebase/auth";

export const addEntry = (itemId, quantity, date) => {
    return async (dispatch) => {
        const auth = getAuth();
        const user = auth.currentUser;

        const newEntry = {
            itemId,
            quantity,
            date: date,
            uid: user.uid
        };

        try {
            const docRef = await addDoc(collection(db, "items", itemId, "entries"), newEntry);
            console.log('addEntry', newEntry);

            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const entryData = { ...docSnap.data(), id: docRef.id };
                dispatch({
                    type: ADD_ENTRY,
                    payload: entryData,
                });

                // listen for updates to the 'entries' collection of this item
                onSnapshot(collection(db, "items", itemId, "entries"), (snapshot) => {
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === "added") {
                            const newEntryData = { ...change.doc.data(), id: change.doc.id };
                            console.log('New entry added: ', newEntryData);
                            // you can dispatch an action here if you want to update your app's state
                        }
                    });
                }, (error) => {
                    console.log('Error getting entries collection updates: ', error);
                });
            }
        } catch (error) {
            console.log('Error adding document: ', error);
        }
    };
};
