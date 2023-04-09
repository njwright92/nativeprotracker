import { DELETE_ENTRY } from './types';
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

export const deleteEntry = (itemId, entryId) => {
    return async (dispatch) => {
        try {
            const entryRef = doc(firestore, 'items', itemId, 'entries', entryId);
            await deleteDoc(entryRef);
            dispatch({
                type: DELETE_ENTRY,
                payload: { itemId, entryId },
            });

            // Add a listener to the entry subcollection to update the local state
            onSnapshot(
                doc(entryRef),
                () => {
                    console.log('deleteEntry snapshot');
                    // Dispatch action to update the state with the updated items
                    dispatch({ type: 'UPDATE_ITEMS' });
                }
            );
        } catch (error) {
            console.error('Error deleting entry: ', error);
        }
    };
};
