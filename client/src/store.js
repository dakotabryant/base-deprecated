import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

// import reducer from './reducers/reducers';
// import lobbyReducers from './reducers/lobbyReducers';

import {socketConnect, socketMiddleware} from './socket-middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, socketMiddleware)));
socketConnect(store);


export default store;


