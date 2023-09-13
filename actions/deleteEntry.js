import { DELETE_ENTRY } from './types';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';

export const deleteEntry = (itemId, entryId) => {
    return async (dispatch) => {
        const auth = getAuth();
        const user = auth.currentUser;
        try {

            await deleteDoc(doc(db, "items", itemId, "entries", entryId));
            dispatch({
                type: DELETE_ENTRY,
                payload: {
                    entryId,
                    itemId,
                    uid: user.uid
                },
            });
           window.alert('Success', 'Entry deleted successfully!'); 
        } catch (error) {
            console.error('Error deleting entry: ', error);
            
        }
    };
};