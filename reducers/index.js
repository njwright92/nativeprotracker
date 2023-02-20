import { combineReducers } from 'redux';
import itemsReducer from './items';
import userReducer from './userReducer.js'

const rootReducer = combineReducers({
    items: itemsReducer,
    users: userReducer,
});

export default rootReducer;
