import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  UPDATE_SLIDERS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../actions/actions';

const initialState = {
  currentUser: {
    isLogged: false,
    name: '',
    googleId: '',
    photo: null
  },
  userSelections: {
    platform: '',
    region: '',
    game: ''
  },
  loading: false,
  slider1: 50,
  slider2: 50,
  slider3: 50,
  slider4: 50,
  slider5: 50,
  slider6: 50,
  error: null
};


export default function (state = initialState, action) {

  switch (action.type) {

    case FETCH_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_ERROR:
      return { ...state, loading: false, error: action.error };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        currentUser: {
          isLogged: true,
          name: action.user.name,
          googleId: action.user.googleId,
          photo: action.user.image
        },
        loading: false,
        error: null,
        slider1: action.user.slider1,
        slider2: action.user.slider2,
        slider3: action.user.slider3,
        slider4: action.user.slider4,
        slider5: action.user.slider5,
        slider6: action.user.slider6
      };
    case LOGOUT_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGOUT_SUCCESS:
      return {
        ...state
      };
    case LOGOUT_FAILURE:
      return { ...state, loading: false, error: true };

    case 'UPDATE_PLATFORM':
      return {
        ...state,
        userSelections: {
          ...state.userSelections,
          platform: action.selection
        }
      };
    case 'UPDATE_REGION':
      return {
        ...state,
        userSelections: {
          ...state.userSelections,
          region: action.selection
        }
      };
    case 'UPDATE_GAME':
      return {
        ...state,
        userSelections: {
          ...state.userSelections,
          game: action.selection
        }
      };
    case UPDATE_SLIDERS:
      if (action.sliderName === 'slider1') {
        return { ...state, slider1: action.value };
      } else if (action.sliderName === 'slider2') {
        return { ...state, slider2: action.value };
      } else if (action.sliderName === 'slider3') {
        return { ...state, slider3: action.value };
      } else if (action.sliderName === 'slider4') {
        return { ...state, slider4: action.value };
      } else if (action.sliderName === 'slider5') {
        return { ...state, slider5: action.value };
      } else if (action.sliderName === 'slider6') {
        return { ...state, slider6: action.value };
      }
    default:
      return state;
  }
};

