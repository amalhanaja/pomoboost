import type TimerSettingsModel from '$lib/models/TimerSettingsModel';
import { DefaultTimerSettings } from '$lib/models/TimerSettingsModel';

export default interface TimerSettingsRepository {
	setValue(value: TimerSettingsModel): void;
	getValue(): TimerSettingsModel;
}

export class TimerSettingsRepositoryImpl implements TimerSettingsRepository {
	private KEY = 'TIMER_SETTINGS';

	setValue(value: TimerSettingsModel): void {
		const jsonVal = JSON.stringify(value);
		localStorage?.setItem(this.KEY, jsonVal);
	}
	getValue(): TimerSettingsModel {
		const stored = localStorage.getItem(this.KEY);
		const value = stored ? JSON.parse(stored) : DefaultTimerSettings;
		return value;
	}
}
