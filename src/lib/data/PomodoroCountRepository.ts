import type CounterModel from '$lib/models/PomodoroCounterModel';
import type TimerType from '$lib/models/TimerType';
import { formateDateToYYYMMDD } from '$lib/utils/Formatter';
import { ObjectStores, appDatabase } from './AppDatabase';
import type IndexedDB from './IndexedDB';

export default interface PomodoroCountRepository {
	saveCount(timerType: TimerType): Promise<void>;
	getAggregateCount(timerType: TimerType): Promise<number>;
}

export class PomodoroCountRepositoryImpl implements PomodoroCountRepository {
	private DEFAULT_COUNT = 1;
	private indexedDb: IndexedDB;
	private storeName: string = ObjectStores.COUNTER;

	constructor() {
		this.indexedDb = appDatabase;
	}

	private async transaction() {
		return await this.indexedDb.transactions(this.storeName, 'readwrite');
	}

	async saveCount(timerType: TimerType): Promise<void> {
		const now = formateDateToYYYMMDD(new Date());
		const trx = await this.transaction();
		const stored = await this.indexedDb.findOne<CounterModel>(trx, {
			storeName: this.storeName,
			query: now
		});
		let pomodoro = stored?.pomodoro ?? this.DEFAULT_COUNT;
		let shortBreak = stored?.shortBreak ?? this.DEFAULT_COUNT;
		let longBreak = stored?.longBreak ?? this.DEFAULT_COUNT;
		switch (timerType) {
			case 'POMODORO':
				pomodoro++;
				break;
			case 'SHORT_BREAK':
				shortBreak++;
				break;
			case 'LONG_BREAK':
				longBreak++;
				break;
		}
		const model = {
			date: now,
			shortBreak,
			longBreak,
			pomodoro
		} satisfies CounterModel;
		await this.indexedDb.put<CounterModel>(trx, {
			storeName: this.storeName,
			obj: model
		});
		console.log("Saved")
		// this.idb.version;
	}
	async getAggregateCount(timerType: TimerType): Promise<number> {
		const trx = await this.transaction();
		const all = await this.indexedDb.findAll<CounterModel>(trx, { storeName: this.storeName });
		const count = all
			.map((value) => this.getCountFromModel(timerType, value))
			.reduce((acc, curr) => acc + curr);
		return count;
	}

	private getCountFromModel(timerType: TimerType, counter: CounterModel): number {
		switch (timerType) {
			case 'POMODORO':
				return counter.pomodoro;
			case 'SHORT_BREAK':
				return counter.shortBreak;
			case 'LONG_BREAK':
				return counter.longBreak;
		}
	}
}
