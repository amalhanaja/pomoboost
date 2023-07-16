import type TimerSettingsRepository from '$lib/data/TimerSettingsRepository';
import type TimerSettingsModel from '$lib/models/TimerSettingsModel';
import { DefaultTimerSettings } from '$lib/models/TimerSettingsModel';
import { onMount } from 'svelte';
import { get, writable, type Writable } from 'svelte/store';

const timerSettingsStore = (
	defaultValue: TimerSettingsModel = DefaultTimerSettings,
	repository: TimerSettingsRepository
): Writable<TimerSettingsModel> => {
	const store = writable<TimerSettingsModel>();
	const { subscribe, set } = store;
	onMount(() => {
		const value = repository.getValue(defaultValue);
		set(value);
	});
	const storeValue = (val: TimerSettingsModel) => {
		repository.setValue(val);
		set(val);
	};
	return {
		subscribe,
		set: storeValue,
		update: (callback) => {
			const updated = callback(get(store));
			storeValue(updated);
		}
	};
};

export default timerSettingsStore;
