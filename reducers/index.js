import { combineReducers } from 'redux';
import itemsReducer from './items';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    items: itemsReducer,
    users: userReducer,
});

export default rootReducer;
