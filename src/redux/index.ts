import { combineReducers } from 'redux';

import { songReducer } from './reducers';
import { trackReducer } from './reducers';

export const reducers = combineReducers({
	currentAudio: trackReducer,
	songs: songReducer
});

export * from './actions';
