import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ADD_ENTRY, DELETE_ENTRY, EDIT_ENTRY, ADD_NOTE } from '../actions/types';

const initialState = [];

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:

            return [...state, action.payload];
        case DELETE_ITEM:

            return state.filter((item) => item.id !== action.payload.id);
        case UPDATE_ITEM:

            return state.map((item) =>
                item.id === action.payload.id ? { ...item, ...action.payload } : item
            );
        case ADD_ENTRY:

            const { itemId, quantity, date } = action.payload;
            const item = state.find((item) => item.id === itemId);
            if (item) {
                item.entries.push({ id: entryId, quantity, date });
            }
            return [...state];
        case DELETE_ENTRY:

            const { itemId: deleteItemId, entryId } = action.payload;
            const deleteItem = state.find((item) => item.id === deleteItemId);
            if (deleteItem) {
                deleteItem.entries = deleteItem.entries.filter((entry) => entry.id !== entryId);
            }
            return [...state];
        case EDIT_ENTRY:

            const { itemId: editItemId, entryId: editEntryId, quantity: editQuantity } = action.payload;
            const editItem = state.find((item) => item.id === editItemId);
            if (editItem) {
                const editEntry = editItem.entries.find((entry) => entry.id === editEntryId);
                if (editEntry) {
                    editEntry.quantity = editQuantity;
                }
            }
            return [...state];
        case ADD_NOTE:
            const { itemId: noteItemId, note } = action.payload;
            const noteItem = state.find((item) => item.id === noteItemId);
            if (noteItem) {
                const noteId = Date.now().toString(); // Generate a unique ID for the note
                noteItem.notes.push({ id: noteId, note });
                console.log(`Added note "${note}" to item with ID ${noteItemId}.`);
                console.log('Updated item:', noteItem);
            }
            return [...state];

        default:
            return state;
    }
};

export default itemsReducer;
