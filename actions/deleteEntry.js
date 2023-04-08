import { DELETE_ENTRY } from './types';
import { deleteDoc, doc } from 'firebase/firestore';
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
        } catch (error) {
            console.error('Error deleting entry: ', error);
        }
    };
};
