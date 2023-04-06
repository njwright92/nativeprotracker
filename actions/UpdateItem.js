import { UPDATE_ITEM } from './types';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

export const updateItem = (item) => {
    return async (dispatch) => {
        try {
            const itemRef = doc(firestore, "items", item.id);

            

            await updateDoc(itemRef, {
                name: item.name,
                entries: item.entries || [],
            });

            dispatch({
                type: UPDATE_ITEM,
                payload: {
                    ...item,
                },
            });

            // Add a listener to the updated document to update the local state
            onSnapshot(itemRef, (doc) => {
                const updatedItem = doc.data();
                dispatch({
                    type: UPDATE_ITEM,
                    payload: updatedItem,
                });
            });
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };
};

