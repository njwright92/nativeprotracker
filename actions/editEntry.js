import { EDIT_ENTRY } from './types';
import { setDoc, doc, getDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';

export const editEntry = (itemId, entryId, quantity) => {
    return async (dispatch) => {
        const auth = getAuth();
        const user = auth.currentUser;
        try {
            const entryRef = doc(
                collection(db, "items", itemId, "entries"),
                entryId
            );
            const entryDoc = await getDoc(entryRef);


            await setDoc(entryRef, {
                ...entryDoc.data(),
                quantity: quantity.quantity || []
            });

            const updatedEntryDoc = await getDoc(entryRef);


            dispatch({
                type: EDIT_ENTRY,
                payload: {
                    itemId,
                    entryId,
                    quantity,
                    uid: user.uid
                },
            });

            onSnapshot(entryRef, (doc) => {
                const updatedEntry = { ...doc.data(), id: doc.id };
                console.log('editEntry snapshot', updatedEntry);
            });
        } catch (error) {
            console.error('Error updating document: ', error);
            if (error.code === "not-found") {

            }
        }
    };
};
