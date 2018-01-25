import { combineReducers } from 'redux';
import reducer from './reducers';
import lobbyReducers from './lobbyReducers';
import findGroupReducers from './findGroupReducers';

export default combineReducers({
	lobbyReducers,
	findGroupReducers,
	reducer
});
