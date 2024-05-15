import localforage from 'localforage';
import { createStore } from 'redux';
import { reducers } from '../redux';

class DataStorage {
	public static set = (key: string, value: any, callback?: any) => {
		return localforage.setItem(key, value, callback);
	};

	public static get = (key: string, callback?: any) => {
		return localforage.getItem(key, callback);
	};

	public static delete = (key: string, callback?: any) => {
		return localforage.removeItem(key, callback);
	};
}

export async function setupStorage() {
	localforage.config({
		name: 'react-player',
		storeName: 'react-player-store'
	});

	let db: any;

	try {
		db = await DataStorage.get('state');
	} catch (e) {
		console.log(e);
	}

	if (db === null) {
		db = undefined;
	}

	const store = createStore(reducers, db);

	store.subscribe(() => {
		DataStorage.set('state', {
			songs: store.getState().songs
		});
	});

	return store;
}

export function getReadableFileSizeString(fileSizeInBytes: number) {
  var i = -1;
  var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
  do {
    fileSizeInBytes /= 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}
