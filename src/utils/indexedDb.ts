import localforage from 'localforage';

localforage.config({
  name: 'react-player',
  storeName: 'react-player-store',
});

export default class DataStorage {
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
