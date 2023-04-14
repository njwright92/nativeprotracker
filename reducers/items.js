import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ADD_ENTRY, DELETE_ENTRY, EDIT_ENTRY } from '../actions/types';
import { v4 as uuidv4 } from 'uuid';


const initialState = [];

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            console.log('ADD_ITEM:', action.payload);
            return [...state, action.payload];
        case DELETE_ITEM:
            console.log('DELETE_ITEM:', action.payload);
            return state.filter((item) => item.id !== action.payload.id);
        case UPDATE_ITEM:
            console.log('UPDATE_ITEM:', action.payload);
            return state.map((item) =>
                item.id === action.payload.id ? { ...item, ...action.payload } : item
            );
        case ADD_ENTRY:
            console.log('ADD_ENTRY:', action.payload)
            const { itemId, quantity, date } = action.payload;
            const item = state.find((item) => item.id === itemId);
            if (item) {
                const entryId = uuidv4();
                item.entries.push({ id: entryId, quantity, date });
            }
            return [...state];
        case DELETE_ENTRY:
            console.log('DELETE_ENTRY:', action.payload)
            const { itemId: deleteItemId, entryId } = action.payload;
            const deleteItem = state.find((item) => item.id === deleteItemId);
            if (deleteItem) {
                deleteItem.entries = deleteItem.entries.filter((entry) => entry.id !== entryId);
            }
            return [...state];
        case EDIT_ENTRY:
            console.log('EDIT_ENTRY:', action.payload)
            const { itemId: editItemId, entryId: editEntryId, quantity: editQuantity } = action.payload;
            const editItem = state.find((item) => item.id === editItemId);
            if (editItem) {
                const editEntry = editItem.entries.find((entry) => entry.id === editEntryId);
                if (editEntry) {
                    editEntry.quantity = editQuantity;
                }
            }
            return [...state];

        default:
            return state;
    }
};

export default itemsReducer;
