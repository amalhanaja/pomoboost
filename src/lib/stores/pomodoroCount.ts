import type PomodoroCountRepository from '$lib/data/PomodoroCountRepository';
import type TimerType from '$lib/models/TimerType';
import { onMount } from 'svelte';
import { get, writable, type Writable } from 'svelte/store';

const pomodoroCountStore = (
	repository: PomodoroCountRepository
): Writable<Map<TimerType, number>> => {
	const store = writable(new Map<TimerType, number>());
	const { subscribe, set } = store;
	const storeValue = async (value: Map<TimerType, number>, prev?: Map<TimerType, number>) => {
		console.log(value, prev);
		value.forEach(async (v, k) => {
			if (v !== prev?.get(k)) {
				await repository.saveCount(k);
				set(value);
			}
		});
	};
	onMount(async () => {
		const pomodoro = await repository.getAggregateCount('POMODORO');
		const shortBreak = await repository.getAggregateCount('SHORT_BREAK');
		const longBreak = await repository.getAggregateCount('LONG_BREAK');
		set(
			new Map([
				['POMODORO', pomodoro],
				['SHORT_BREAK', shortBreak],
				['LONG_BREAK', longBreak]
			])
		);
	});
	return {
		subscribe,
		set() {
			console.log('cannot set value directly');
		},
		update(updater) {
			const stored = get(store);
			const updated = updater(new Map(stored));
			storeValue(updated, stored);
		}
	};
};

export default pomodoroCountStore;
