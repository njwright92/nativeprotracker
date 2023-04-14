import { ADD_ITEM } from './types';
import { v4 as uuidv4 } from 'uuid';
import { onSnapshot, addDoc, collection, getDoc } from 'firebase/firestore';
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
                            itemid: docRef.id,
                            id: entryId,
                            quantity: entry.quantity,
                            date: entry.date,
                            uid: user.uid
                        };
                        await addDoc(collection(docRef, 'entries'), newEntry);
                    }
                }

                // listen for updates to the 'items' collection
                onSnapshot(collection(db, "items"), (snapshot) => {
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === "added") {
                            const newItemData = { ...change.doc.data(), id: change.doc.id };
                            console.log('New item added: ', newItemData);
                            // you can dispatch an action here if you want to update your app's state
                        }
                    });
                }, (error) => {
                    console.log('Error getting items collection updates: ', error);
                });
            }
        } catch (error) {
            console.log('Error adding document: ', error);
        }
    };
};
