import { combineReducers } from 'redux';
import itemsReducer from './items';
import userReducer from './userReducer';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
};

const rootReducer = combineReducers({
    items: itemsReducer,
    users: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
