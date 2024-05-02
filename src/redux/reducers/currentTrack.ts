import { T_CLEAR_SELECTED_AUDIO_ID, T_SET_SELECTED_AUDIO_ID } from '../types';

export const trackReducer = (state = {}, action: any) => {
	switch (action.type) {
		case T_SET_SELECTED_AUDIO_ID: {
			return { ...state, selectedAudioId: action.audioId };
		}
		case T_CLEAR_SELECTED_AUDIO_ID: {
			return { ...state, selectedAudioId: null };
		}
		default: {
			return state;
		}
	}
};
