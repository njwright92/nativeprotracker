import { DELETE_ENTRY } from './types';

export const deleteEntry = (itemId, entryId) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_ENTRY,
            payload: { itemId, entryId }
        });
    };
};
