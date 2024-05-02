import {
	T_ADD_SONGS,
	T_CLEAR_SELECTED_AUDIO_ID,
	T_DELETE_SONGS,
	T_SET_SELECTED_AUDIO_ID
} from '../types';

export const ADD_SONGS = (songs: any) => ({
	type: T_ADD_SONGS,
	songs
});

export const DELETE_SONG = (index: any) => ({
	type: T_DELETE_SONGS,
	index
});

export const SET_SELECTED_AUDIO_ID = (audioId: number) => ({
	type: T_SET_SELECTED_AUDIO_ID,
	audioId
});

export const CLEAR_SELECTED_AUDIO_ID = () => ({
	type: T_CLEAR_SELECTED_AUDIO_ID
});
