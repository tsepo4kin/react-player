import {
	T_ADD_SONGS,
	T_CLEAR_CURRENT_TRACK,
	T_DELETE_SONGS,
	T_SET_CURRENT_TRACK
} from '../types';

export const ADD_SONGS = (songs: any) => ({
	type: T_ADD_SONGS,
	songs
});

export const DELETE_SONG = (index: any) => ({
	type: T_DELETE_SONGS,
	index
});

export const SET_CURRENT_TRACK = (track: any) => ({
	type: T_SET_CURRENT_TRACK,
	track
});

export const CLEAR_CURRENT_TRACK = () => ({
	type: T_CLEAR_CURRENT_TRACK
});
