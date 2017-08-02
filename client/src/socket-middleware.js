import io from 'socket.io-client';
import {CREATE_GROUP, JOIN_LOBBIES_ROOM, CHAT_ROOM} from './actions/actions';
import {SIGN_UP} from './actions/lobby';
import {renderGroup, renderUser, renderChat} from './actions/lobby';

let socket;

export function socketConnect(store){
  socket = io.connect('http://localhost:3001');
  socket.on('create-group', (data) => {
    store.dispatch(renderGroup(data));
  });
  socket.on('sign-up', (user) => {
    store.dispatch(renderUser(user));
  });
  socket.on('chat-room', (message) => {
    console.log('This is the middleware', message);
    store.dispatch(renderChat(message));
  });
}

export function socketMiddleware(store) {
  return next => action => {
    const result = next(action);

    if(socket && action.type === CREATE_GROUP) {
      socket.emit('create-group', {
        selection: action.selection
      });
    }
    else if(socket && action.type === JOIN_LOBBIES_ROOM) {
      socket.emit('join-room', {
        selection: action.selection
      });
    }
    else if(socket && action.type === SIGN_UP) {
      socket.emit('sign-up', {
        user: action.user
      });
    }
    else if(socket && action.type === CHAT_ROOM) {
      socket.emit('chat-room', {
      message: action.message
      });
    }
  };
}