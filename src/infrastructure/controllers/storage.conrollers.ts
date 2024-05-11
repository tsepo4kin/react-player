import localforage from 'localforage';
import { createStore } from 'redux';
import { reducers } from '../redux';

localforage.config({
	name: 'react-player',
	storeName: 'react-player-store'
});

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
