import type TimerType from '$lib/models/TimerType';

export default interface PomodoroCountRepository {
	setCount(timerType: TimerType, count: number): void;
	getCount(timerType: TimerType): number;
}

export class PomodoroCountRepositoryImpl implements PomodoroCountRepository {
	private PREFIX_KEY = 'COUNT_';
	private DEFAULT_COUNT = '0';

	getKey(timerType: TimerType): string {
		return `${this.PREFIX_KEY}${timerType}`;
	}

	setCount(timerType: TimerType, count: number): void {
		localStorage.setItem(this.getKey(timerType), count.toString());
	}
	getCount(timerType: TimerType): number {
		const stored = localStorage.getItem(this.getKey(timerType)) ?? this.DEFAULT_COUNT;
		return Number(stored);
	}
}
