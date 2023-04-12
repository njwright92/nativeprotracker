import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { db } from './firebaseConfig';

const middleware = [thunk.withExtraArgument({ db })];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
