import io from 'socket.io-client';

import { CREATE_GROUP, JOIN_LOBBIES_ROOM, CHAT_ROOM } from './actions/actions';
import { SIGN_UP, USER_ACCEPTED, USER_DECLINED } from './actions/lobby';
import {
	renderGroup,
	renderUser,
	storeAcceptedUser,
	storeFeedback,
	renderChat
} from './actions/lobby';

let socket;

export function socketConnect(store) {
	if (process.env.NODE_ENV === 'production') {
		socket = io.connect('/');
	} else {
		socket = io.connect('http://localhost:3001');
	}
	socket.on('create-group', data => {
		store.dispatch(renderGroup(data));
	});
	socket.on('sign-up', user => {
		store.dispatch(renderUser(user));
	});

	socket.on('user-accepted', user => {
		store.dispatch(storeAcceptedUser(user));
	});
	socket.on('user-declined', feedback => {
		store.dispatch(storeFeedback(feedback));
	});

	socket.on('chat-room', message => {
		store.dispatch(renderChat(message));
	});
}

export function socketMiddleware(store) {
	return next => action => {
		const result = next(action);

		if (socket && action.type === CREATE_GROUP) {
			socket.emit('create-group', {
				selection: action.selection
			});
		}
		if (socket && action.type === JOIN_LOBBIES_ROOM) {
			socket.emit('join-room', {
				selection: action.selection
			});
		}
		if (socket && action.type === SIGN_UP) {
			socket.emit('sign-up', {
				user: action.user
			});
		}

		if (socket && action.type === USER_ACCEPTED) {
			socket.emit('user-accepted', {
				user: action.user
			});
		}

		if (socket && action.type === USER_DECLINED) {
			socket.emit('user-declined', {
				socketId: action.socketId
			});
		}

		if (socket && action.type === CHAT_ROOM) {
			socket.emit('chat-room', {
				message: action.message
			});
		}
	};
}
