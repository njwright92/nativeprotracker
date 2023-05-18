import {
    ADD_ITEM,
    DELETE_ITEM,
    UPDATE_ITEM,
    ADD_ENTRY,
    DELETE_ENTRY,
    EDIT_ENTRY,
    ITEM_ACTION_FAILED,
    ENTRY_ACTION_FAILED
} from '../actions/types';

const initialState = {
    items: [],
    error: null
};

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload],
                error: null
            };

        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload.id),
                error: null
            };

        case UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id ? { ...item, ...action.payload } : item
                ),
                error: null
            };

        case ADD_ENTRY:
            const { itemId, quantity, date } = action.payload;
            const addItem = state.items.find((item) => item.id === itemId);
            if (addItem) {
                addItem.entries.push({ id: entryId, quantity, date });
                return {
                    ...state,
                    error: null
                };
            }
            // Set error message if item is not found
            return {
                ...state,
                error: 'Item not found'
            };

        case DELETE_ENTRY:
            const { itemId: deleteItemId, entryId } = action.payload;
            const deleteItem = state.items.find((item) => item.id === deleteItemId);
            if (deleteItem) {
                deleteItem.entries = deleteItem.entries.filter((entry) => entry.id !== entryId);
                return {
                    ...state,
                    error: null
                };
            }
            // Set error message if item is not found
            return {
                ...state,
                error: 'Item not found'
            };

        case EDIT_ENTRY:
            const { itemId: editItemId, entryId: editEntryId, quantity: editQuantity } = action.payload;
            const editItem = state.items.find((item) => item.id === editItemId);
            if (editItem) {
                const editEntry = editItem.entries.find((entry) => entry.id === editEntryId);
                if (editEntry) {
                    editEntry.quantity = editQuantity;
                    return {
                        ...state,
                        error: null
                    };
                }
            }
            // Set error message if item or entry is not found
            return {
                ...state,
                error: 'Item or entry not found'
            };

        case ITEM_ACTION_FAILED:
            return {
                ...state,
                error: action.payload
            };

        case ENTRY_ACTION_FAILED:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
};

export default itemsReducer;

