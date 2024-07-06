import {
	T_ADD_SONGS,
	T_CLEAR_SELECTED_AUDIO_ID,
	T_DELETE_SONGS,
	T_INIT_AUDIO,
	T_SET_SELECTED_AUDIO_ID,
	T_SORT_SONGS
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

export const SORT_SONGS = (insertElementName: string, targetIndex: number) => ({
	type: T_SORT_SONGS,
	insertElementName,
	targetIndex,
})

export const INIT_AUDIO = (ref: unknown) => ({
	type: T_INIT_AUDIO,
	ref
})
