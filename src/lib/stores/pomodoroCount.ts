import type PomodoroCountRepository from '$lib/data/PomodoroCountRepository';
import type TimerType from '$lib/models/TimerType';
import { onMount } from 'svelte';
import { get, writable, type Writable } from 'svelte/store';

const pomodoroCountStore = (
	repository: PomodoroCountRepository
): Writable<Map<TimerType, number>> => {
	const store = writable(new Map<TimerType, number>());
	const { subscribe, set } = store;
	const storeValue = (value: Map<TimerType, number>) => {
		console.log(value);
		value.forEach((v, k) => repository.setCount(k, v));
		set(value);
	};
	onMount(() => {
		set(
			new Map([
				['POMODORO', repository.getCount('POMODORO')],
				['SHORT_BREAK', repository.getCount('SHORT_BREAK')],
				['LONG_BREAK', repository.getCount('LONG_BREAK')]
			])
		);
	});
	return {
		subscribe,
		set(value) {
			storeValue(value);
		},
		update(updater) {
			const stored = get(store);
			const updated = updater(stored);
			storeValue(updated);
		}
	};
};

export default pomodoroCountStore;
