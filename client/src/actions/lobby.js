export const RENDER_GROUP = 'RENDER_GROUP';
export const renderGroup = (selection) => ({
  type: RENDER_GROUP,
  selection
});

export const RENDER_USER = 'RENDER_USER';
export const renderUser = (user) => ({
  type: RENDER_USER,
  user
});

export const RENDER_CHAT = 'RENDER_CHAT';
export const renderChat = (message) => ({
  type: RENDER_CHAT,
  message
});

export const SIGN_UP = 'SIGN_UP';
export const signUp = (user) => ({
  type: SIGN_UP,
  user
});

export const USER_ACCEPTED = 'USER_ACCEPTED';
export const userAccepted = (user) => ({
  type: USER_ACCEPTED,
  user
});

export const USER_DECLINED = 'USER_DECLINED';
export const userDeclined = (socketId) => ({
  type: USER_DECLINED,
  socketId
});

export const STORE_ACCEPTED_USER = 'STORE_ACCEPTED_USER';
export const storeAcceptedUser = (user) => ({
  type: STORE_ACCEPTED_USER,
  user
});

export const STORE_FEEDBACK = 'STORE_FEEDBACK';
export const storeFeedback = (feedback) => ({
  type: STORE_FEEDBACK,
  feedback
});

export const STORE_ROOM = 'STORE_ROOM';
export const storeRoom = (room) => ({
  type: STORE_ROOM,
  room
});

export const GET_LOBBIES_REQUEST = 'GET_LOBBIES_REQUEST';
export const getLobbiesRequest = () => ({
  type: GET_LOBBIES_REQUEST
});

export const GET_LOBBIES_SUCCESS = 'GET_LOBBIES_SUCCESS';
export const getLobbiesSuccess = lobbies => ({
  type: GET_LOBBIES_SUCCESS,
  lobbies
});

export const GET_LOBBIES_ERROR = 'GET_LOBBIES_ERROR';
export const getLobbiesError = error => ({
  type: GET_LOBBIES_ERROR,
  error
});

export const getLobbiesFromDatabase = () => (dispatch, getState) => {
  dispatch(getLobbiesRequest());
  const state = getState();
  let my = state.findGroupReducers.userSelections;
  console.log(my);
  fetch(`/api/lobbies/${my.platform}/${my.region}/${my.game}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(res => {
    console.log(res);
    return res.json();
  })
  .then(lobby => {
    // console.log(lobby);
    dispatch(getLobbiesSuccess(lobby));
  })
  .catch(err => {
    console.log(err);
    dispatch(getLobbiesError(err));
  });
};
