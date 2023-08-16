export type IndexedDBMigrator = (ev: IDBVersionChangeEvent, db: IDBDatabase) => void;

export default class IndexedDB {
	private _dbInstances: IDBDatabase | null = null;
	private _name: string;
	private _version: number;
	private _migrator?: IndexedDBMigrator;

	constructor(name: string, version: number, migrator?: IndexedDBMigrator) {
		this._name = name;
		this._version = version;
		this._migrator = migrator;
	}

	private get db(): Promise<IDBDatabase> {
		return new Promise((resolve, reject) => {
			if (this._dbInstances) {
				resolve(this._dbInstances);
				return;
			}
			const request = indexedDB.open(this._name, this._version);
			request.onerror = () => {
				reject(new Error('Failed open databse'));
			};
			request.onsuccess = () => {
				this._dbInstances = request.result;
				resolve(request.result);
			};
			request.onupgradeneeded = (ev) => {
				if (!this._migrator) return;
				this._migrator(ev, request.result);
			};
		});
	}

	async transactions(
		storeNames: string | Iterable<string>,
		mode: IDBTransactionMode = 'readonly'
	): Promise<IDBTransaction> {
		const db = await this.db;
		return db.transaction(storeNames, mode);
	}

	findOne<T>(
		trx: IDBTransaction,
		options: { storeName: string; query: IDBValidKey | IDBKeyRange }
	): Promise<T | undefined> {
		const { storeName, query } = options;
		const objectStore = trx.objectStore(storeName);
		return new Promise((resolve, reject) => {
			const request = objectStore.get(query);
			request.onsuccess = () => {
				resolve(request.result);
			};
			request.onerror = () => {
				reject(request.error);
			};
		});
	}

	async findAll<T>(
		trx: IDBTransaction,
		options: { storeName: string; query?: IDBValidKey | IDBKeyRange; count?: number }
	): Promise<T[]> {
		const { storeName, query, count } = options;
		const objectStore = trx.objectStore(storeName);
		return new Promise((resolve, reject) => {
			const request = objectStore.getAll(query, count);
			request.onsuccess = () => {
				resolve(request.result);
			};
			request.onerror = () => {
				reject(request.error);
			};
		});
	}

	async put<T>(
		trx: IDBTransaction,
		options: { storeName: string; obj: T; key?: IDBValidKey }
	): Promise<IDBValidKey> {
		const { storeName, obj, key } = options;
		const objectStore = trx.objectStore(storeName);
		return new Promise((resolve, reject) => {
			const request = objectStore.put(obj, key);
			request.onsuccess = () => {
				resolve(request.result);
			};
			request.onerror = () => {
				reject(request.error);
			};
		});
	}

	async delete(
		trx: IDBTransaction,
		options: { storeName: string; query: IDBValidKey | IDBKeyRange }
	): Promise<void> {
		const { storeName, query } = options;
		const objectStore = trx.objectStore(storeName);
		return new Promise((resolve, reject) => {
			const request = objectStore.delete(query);
			request.onsuccess = () => {
				resolve();
			};
			request.onerror = () => {
				reject(request.error);
			};
		});
	}
}
