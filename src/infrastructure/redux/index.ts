import { combineReducers } from 'redux';

import { songReducer } from './reducers';
import { trackReducer } from './reducers';
import { audioReducer } from './reducers/audio';

export const reducers = combineReducers({
	currentAudio: trackReducer,
	songs: songReducer,
	audioRef: audioReducer
});

export * from './actions';
