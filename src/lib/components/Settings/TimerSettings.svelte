<script lang="ts">
	import type TimerSettingsModel from '$lib/models/TimerSettingsModelModel';
	import { derived, type Writable } from 'svelte/store';
	export let store: Writable<TimerSettingsModel>;
	const MINUTE_TO_SECOND = 60;
	const { update } = store;
	const getMinutes = (seconds: number) => Math.floor(seconds / MINUTE_TO_SECOND);
	$: pomodoro = derived(store, ($settings) => getMinutes($settings?.pomodoroDuration ?? 0));
	$: shortBreak = derived(store, ($settings) => getMinutes($settings?.shortBreakDuration ?? 0));
	$: longBreak = derived(store, ($settings) => getMinutes($settings?.longBreakDuration ?? 0));
</script>

<section>
	<span class="font-semibold label-text">Time (minutes)</span>
	<section class="flex gap-3">
		<div class="form-control w-full max-w-xs">
			<label class="label" for="pomodoro-duration">
				<span class="label-text">Pomodoro</span>
			</label>
			<input
				id="pomodoro-duration"
				type="number"
				class="input input-bordered w-full max-w-xs"
				value={$pomodoro}
				on:input={(e) => {
					update((prev) => ({
						...prev,
						pomodoroDuration: Number(e.target?.value) * MINUTE_TO_SECOND
					}));
				}}
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="short-break">
				<span class="label-text">Short Break</span>
			</label>
			<input
				id="short-break"
				type="number"
				class="input input-bordered w-full max-w-xs"
				value={$shortBreak}
				on:input={(e) => {
					update((prev) => ({
						...prev,
						shortBreakDuration: Number(e.target?.value) * MINUTE_TO_SECOND
					}));
				}}
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="long-brak">
				<span class="label-text">Long Break</span>
			</label>
			<input
				id="long-break"
				type="number"
				class="input input-bordered w-full max-w-xs"
				value={$longBreak}
				on:input={(e) => {
					update((prev) => ({
						...prev,
						longBreakDuration: Number(e.target?.value) * MINUTE_TO_SECOND
					}));
				}}
			/>
		</div>
	</section>
	<div class="form-control">
		<label class="cursor-pointer label">
			<span class="label-text">Auto start breaks</span>
			<input
				type="checkbox"
				class="toggle toggle-primary"
				checked={$store?.autoStartBreaks ?? false}
				on:click={() => {
					update((prev) => ({
						...prev,
						autoStartBreaks: !prev.autoStartBreaks
					}));
				}}
			/>
		</label>
	</div>
	<div class="form-control">
		<label class="cursor-pointer label">
			<span class="label-text">Auto start podomoros</span>
			<input
				type="checkbox"
				class="toggle toggle-primary"
				checked={$store?.autoStartPomodoros ?? false}
				on:click={() => {
					update((prev) => ({
						...prev,
						autoStartPomodoros: !prev.autoStartPomodoros
					}));
				}}
			/>
		</label>
	</div>
</section>
