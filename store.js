import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';
import { firestore } from './firebaseConfig';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    debug: true,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk.withExtraArgument({ firestore })];

const store = createStore(persistedReducer, applyMiddleware(...middleware));

const persistor = persistStore(store);

export { store, persistor };
