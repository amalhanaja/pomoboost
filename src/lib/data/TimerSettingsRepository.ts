import type TimerSettingsModel from '$lib/models/TimerSettingsModel';

export default interface TimerSettingsRepository {
	setValue(value: TimerSettingsModel): void;
	getValue(defaultValue: TimerSettingsModel): TimerSettingsModel;
}

export class Impl implements TimerSettingsRepository {
	private KEY = 'TIMER_SETTINGS';

	setValue(value: TimerSettingsModel): void {
		const jsonVal = JSON.stringify(value);
		localStorage?.setItem(this.KEY, jsonVal);
	}
	getValue(defaultValue: TimerSettingsModel): TimerSettingsModel {
		const stored = localStorage.getItem(this.KEY);
		const value = stored ? JSON.parse(stored) : defaultValue;
		return value;
	}
}
