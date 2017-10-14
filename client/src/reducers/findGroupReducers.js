import {
} from '../actions/actions'

const initialState = {
	userSelections: {
		platform: {title: '', toggle: false},
		region: {title: '', toggle: false},
		game: {title: '', toggle: false}
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
				platform: {
					...state.userSelections.platform,
					title: action.selection,
					toggle: true
				}
			}
		}
	case 'UPDATE_REGION':
		return {
			...state,
			userSelections: {
				...state.userSelections,
				region: {
					...state.userSelections.region,
					title: action.selection,
					toggle: true
				}
			}
		}
	case 'UPDATE_GAME':
		return {
			...state,
			userSelections: {
				...state.userSelections,
				game: {
					...state.userSelections.game,
					title: action.selection,
					toggle: true
				}
			}
		}
	case 'CLEAR_SELECTIONS':
		return {
			...state,
			userSelections: {
				...state.userSelections,
				platform: {
					...state.userSelections.platform,
					title: '',
					toggle: false
				},
				region: {
					...state.userSelections.region,
					title: '',
					toggle: false
				},
				game: {
					...state.userSelections.game,
					title: '',
					toggle: false
				}
			}
		}
	default:
		return state
	}
}
