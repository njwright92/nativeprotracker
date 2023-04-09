import { EDIT_ENTRY } from './types';
import { setDoc, doc, getDoc, collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

export const editEntry = (itemId, entryId, quantity) => {
    return async (dispatch) => {
        try {
            const entryRef = doc(
                collection(firestore, "items", itemId, "entries"),
                entryId
            );
            const entryDoc = await getDoc(entryRef);
            console.log(entryDoc, entryRef);

            await setDoc(entryRef, {
                ...entryDoc.data(),
                quantity: quantity.quantity || []
            });

            const updatedEntryDoc = await getDoc(entryRef);
            console.log(updatedEntryDoc);

            dispatch({
                type: EDIT_ENTRY,
                payload: {
                    itemId,
                    entryId,
                    quantity,
                },
            });

            // Add a listener to the entry document to update the local state
            onSnapshot(entryRef, (doc) => {
                const updatedEntry = { ...doc.data(), id: doc.id };
                console.log('editEntry snapshot', updatedEntry);
                // Update local state with the updated entry
                dispatch({
                    type: 'items/updateItemEntry',
                    payload: { itemId, updatedEntry },
                });
            });
        } catch (error) {
            console.error('Error updating document: ', error);
            if (error.code === "not-found") {
                console.log("Document not found");
            }
        }
    };
};
