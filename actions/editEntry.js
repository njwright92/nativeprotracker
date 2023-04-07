import { EDIT_ENTRY } from './types';
import { setDoc, doc, getDoc, collection } from 'firebase/firestore';
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

            dispatch({
                type: EDIT_ENTRY,
                payload: {
                    itemId,
                    entryId,
                    quantity,
                },
            });
        } catch (error) {
            console.error('Error updating document: ', error);
            if (error.code === "not-found") {
                console.log("Document not found");
            }
        }
    };
};
