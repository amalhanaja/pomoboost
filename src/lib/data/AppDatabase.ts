import IndexedDB from './IndexedDB';

const DB_NAME = 'pomoboost';
const DB_VERSION = 1;

export enum ObjectStores {
	COUNTER = 'counter'
}

export const appDatabase: IndexedDB = new IndexedDB(DB_NAME, DB_VERSION, (ev, db) => {
	if (!db.objectStoreNames.contains(ObjectStores.COUNTER)) {
		db.createObjectStore(ObjectStores.COUNTER, { keyPath: 'date' });
	}
});
