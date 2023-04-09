import { DELETE_ITEM } from './types';
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { getAuth } from "firebase/auth";

export const deleteItem = (id) => {
    return async (dispatch) => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            // check if the user is authenticated and is the owner of the item
            if (user) {
                const itemRef = doc(firestore, "items", id);

                // Delete the item document from Firestore
                await deleteDoc(itemRef);

                // Dispatch action to delete the item from the local state
                dispatch({
                    type: DELETE_ITEM,
                    payload: { id }
                });

                // Add a listener to the items collection to update the local state
                onSnapshot(doc(itemRef), () => {
                    console.log('deleteItem snapshot');
                    // Dispatch action to update the state with the updated items
                    dispatch({ type: 'UPDATE_ITEMS' });
                });
            } else {
                throw new Error('User is not authenticated or does not have permission to delete the item.');
            }
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };
};
