import { T_CLEAR_CURRENT_TRACK, T_SET_CURRENT_TRACK } from '../types';

export const trackReducer = (state = {}, action: any) => {
	switch (action.type) {
		case T_SET_CURRENT_TRACK: {
			return { ...state, track: action.track };
		}
		case T_CLEAR_CURRENT_TRACK: {
			return { ...state, track: null };
		}
		default: {
			return state;
		}
	}
};
