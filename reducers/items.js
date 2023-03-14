import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ADD_ENTRY } from '../actions/types';

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
            const { itemId, quantity, date, name } = action.payload;
            const item = state.find((item) => item.id === itemId);
            if (item) {
                item.entries.push({ quantity, date });
                item.name = name;
            }
            return [...state];
        default:
            return state;
    }
};

export default itemsReducer;