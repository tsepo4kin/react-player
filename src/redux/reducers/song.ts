import { T_ADD_SONGS, T_DELETE_SONGS, T_SORT_SONGS } from '../types';

export const songReducer = (
	state: Array<Record<string, unknown>> = [],
	action: any
) => {
	switch (action.type) {
		case T_ADD_SONGS: {
			return [...state, ...action.songs].filter(
				(song, index, self) =>
					self.findIndex(s => s.name === song.name) === index
			);
		}
		case T_DELETE_SONGS: {
			return state.filter((_, index) => index !== action.index);
		}
		case T_SORT_SONGS: {
			const newState = [...state];
			const currentIndex = state.findIndex(
				e => e.name === action.insertElementName
			);
			newState.splice(currentIndex, 1);
			newState.splice(action.targetIndex, 0, state[currentIndex]);
			return newState;
		}
		default: {
			return state;
		}
	}
};
