import { DELETE_ITEM } from './types';
import { getAuth } from "firebase/auth";

export const deleteItem = (id) => {
    return async (dispatch) => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            // check if the user is authenticated and is the owner of the item
            if (user) {
                dispatch({
                    type: DELETE_ITEM,
                    payload: { id }
                });
            } else {
                throw new Error('User is not authenticated or does not have permission to delete the item.');
            }
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };
};
