import type PomoTimerModel from '$lib/models/PomoTimerModel';

export default interface PomoTimerRepository {
	setValue(value: PomoTimerModel): void;
	getValue(defaultValue: PomoTimerModel): PomoTimerModel;
}

export class PomoTimerRepositoryImpl implements PomoTimerRepository {
	private KEY = 'POMO_TIMER';

	setValue(value: PomoTimerModel): void {
		const jsonVal = JSON.stringify(value);
		localStorage.setItem(this.KEY, jsonVal);
	}
	getValue(defaultValue: PomoTimerModel): PomoTimerModel {
		const stored = localStorage.getItem(this.KEY);
		const value = stored ? JSON.parse(stored) : defaultValue;
		return value;
	}
}
