import {
  T_ADD_SONGS,
  T_DELETE_SONGS,
} from '../types';

export const ADD_SONGS = (songs: any) => ({
  type: T_ADD_SONGS,
  songs,
});

export const DELETE_SONG = (index: any) => ({
  type: T_DELETE_SONGS,
  index,
});
