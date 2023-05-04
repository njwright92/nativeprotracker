import { DELETE_ITEM } from './types';
import { deleteDoc, doc, onSnapshot, collectionGroup, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from "firebase/auth";

export const deleteItem = (id) => {
    return async (dispatch) => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const itemRef = doc(db, "items", id);
                console.log(db, "items", id)

                // Delete the item document
                await deleteDoc(itemRef);

                // Delete all entries associated with the item
                const entryQuery = query(collectionGroup(db, "entries"), where("item_id", "==", id));
                const entryQuerySnapshot = await getDocs(entryQuery);
                entryQuerySnapshot.forEach((entryDoc) => {
                    deleteDoc(entryDoc.ref);
                });

                dispatch({
                    type: DELETE_ITEM,
                    payload: { id }
                });

                onSnapshot(doc(itemRef), () => {
                    console.log('deleteItem snapshot');
                });
            } else {
                throw new Error('User is not authenticated or does not have permission to delete the item.');
            }
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };
};
