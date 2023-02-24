import { DELETE_ITEM } from './types';
import { deleteItemAsync } from '../components/DeleteItemForm';

export const deleteItem = (id) => {
    return async (dispatch) => {
        await deleteItemAsync(id);
        dispatch({
            type: DELETE_ITEM,
            payload: { id }
        });
    };
};
