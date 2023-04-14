import { v4 as uuidv4 } from 'uuid';
import { setDoc, collection, query, getDocs, doc } from 'firebase/firestore'; // import query and where
import { db } from '../firebaseConfig';
import { getAuth } from "firebase/auth";
import { ADD_ENTRY } from './types';

export const addEntry = (itemId, quantity, date) => {
    return async (dispatch) => {
        const auth = getAuth();
        const user = auth.currentUser;

        const entryId = uuidv4();

        const entry = {
            id: entryId,
            quantity: quantity,
            date: date,
            uid: user.uid,
        };

        try {
            // find the item doc that matches itemId and uid
            const itemQuery = query(collection(db, 'items'));
            const itemDocs = await getDocs(itemQuery);

            // if there are no docs found, return
            if (itemDocs.length === 0) {
                console.log(`Item ${itemId} not found for user ${user.uid}`);
                return;
            }

            const itemDoc = itemDocs.docs[0]; // get the first (and only) item doc

            // add the entry to the 'entries' subcollection of the item doc
            const entryRef = doc(collection(itemDoc.ref, 'entries'), entryId);
            await setDoc(entryRef, entry);

            console.log('addEntry', entry);

            dispatch({
                type: ADD_ENTRY,
                payload: { entryId, quantity, date, uid: user.uid },
            });
            console.log('addEntry', entry);

        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };
};
