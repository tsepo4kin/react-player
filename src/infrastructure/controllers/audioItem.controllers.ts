import { AudioService } from '../../application/audio.service';
import { Actions } from '../api/api';
import { HttpClient } from '../http.client';

const initActions = Actions;
export const audioService = new AudioService(new HttpClient());
