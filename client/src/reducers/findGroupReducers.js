import {
} from '../actions/actions'

const initialState = {
	userSelections: {
		platform: '',
		region: '',
		game: ''
	},
	loading: false,
	error: null
}


export default function (state = initialState, action) {
	switch (action.type) {
	case 'UPDATE_PLATFORM':
		return {
			...state,
			userSelections: {
				...state.userSelections,
				platform: action.selection
			},
			currentUser: {...state.currentUser, name: state.currentUser.nameConstant}
		}
	case 'UPDATE_REGION':
		return {
			...state,
			userSelections: {
				...state.userSelections,
				region: action.selection
			}
		}
	case 'UPDATE_GAME':
		return {
			...state,
			userSelections: {
				...state.userSelections,
				game: action.selection
			}
		}
	default:
		return state
	}
}
