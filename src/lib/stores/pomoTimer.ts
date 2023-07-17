import type PomoTimerRepository from '$lib/data/PomoTimerRepository';
import type TimerSettingsRepository from '$lib/data/TimerSettingsRepository';
import type PomoTimerModel from '$lib/models/PomoTimerModel';
import type TimerType from '$lib/models/TimerType';
import getSettingDuration from '$lib/utils/getSettingDuration';
import { onMount } from 'svelte';
import { get, writable, type Writable } from 'svelte/store';

const pomoTimerStore = (
	timerSettingRepository: TimerSettingsRepository,
	repository: PomoTimerRepository
): Writable<PomoTimerModel> => {
	const store = writable<PomoTimerModel>();
	const { subscribe, set } = store;
	const storeValue = (val: PomoTimerModel) => {
		repository.setValue(val);
		set(val);
	};
	const getDuration = (timerType: TimerType): number => {
		const settings = timerSettingRepository.getValue();
		return getSettingDuration(settings, timerType);
	};
	onMount(() => {
		const value = repository.getValue({
			timerType: 'POMODORO',
			seconds: getDuration('POMODORO')
		});
		set(value);
	});
	return {
		subscribe,
		set: storeValue,
		update: (updater) => {
			const prev = get(store);
			const updated = updater(prev);
			if (prev.timerType !== updated.timerType) {
				updated.seconds = getDuration(updated.timerType);
			}
			storeValue(updated);
		}
	};
};

export default pomoTimerStore;
