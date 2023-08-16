<script lang="ts">
	import type TimerSettingsModel from '$lib/models/TimerSettingsModel';
	import { DefaultTimerSettings } from '$lib/models/TimerSettingsModel';
	export let timerSettings: TimerSettingsModel = DefaultTimerSettings;
	export let onUpdate: (updated: TimerSettingsModel) => void;
	const MINUTE_TO_SECOND = 60;
	const getMinutes = (seconds: number) => Math.floor(seconds / MINUTE_TO_SECOND);
	$: pomodoro = getMinutes(timerSettings.pomodoroDuration);
	$: shortBreak = getMinutes(timerSettings.shortBreakDuration);
	$: longBreak = getMinutes(timerSettings.longBreakDuration);
	const updateSettings = (updater: (prev: TimerSettingsModel) => TimerSettingsModel) => {
		const updated = updater(timerSettings);
		onUpdate(updated);
	};
</script>

<section class="flex flex-col space-y-2">
	<span class="font-semibold label-text">Time (minutes)</span>
	<section class="flex gap-3">
		<div class="form-control w-full max-w-xs">
			<label class="label" for="pomodoro-duration">
				<span class="label-text">Pomodoro</span>
			</label>
			<input
				id="pomodoro-duration"
				type="number"
				class="input input-bordered w-full max-w-xs focus:input-primary transition-all duration-300"
				min="1"
				on:input={(e) => {
					updateSettings((prev) => ({
						...prev,
						pomodoroDuration: Number(e.currentTarget?.value) * MINUTE_TO_SECOND
					}));
				}}
				bind:value={pomodoro}
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="short-break">
				<span class="label-text">Short Break</span>
			</label>
			<input
				id="short-break"
				type="number"
				class="input input-bordered w-full max-w-xs focus:input-primary transition-all duration-300"
				min="1"
				on:input|preventDefault={(e) => {
					updateSettings((prev) => ({
						...prev,
						shortBreakDuration: Number(e.currentTarget?.value) * MINUTE_TO_SECOND
					}));
				}}
				bind:value={shortBreak}
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="long-brak">
				<span class="label-text">Long Break</span>
			</label>
			<input
				id="long-break"
				type="number"
				class="input input-bordered w-full max-w-xs focus:input-primary transition-all duration-300"
				min="1"
				on:input|preventDefault={(e) => {
					updateSettings((prev) => ({
						...prev,
						longBreakDuration: Number(e.currentTarget?.value) * MINUTE_TO_SECOND
					}));
				}}
				bind:value={longBreak}
			/>
		</div>
	</section>
	<div class="form-control mt-2">
		<label for="autostart_breaks" class="cursor-pointer label">
			<span class="font-semibold label-text">Auto start breaks</span>
			<input
				id="autostart_breaks"
				type="checkbox"
				class="toggle toggle-primary"
				bind:checked={timerSettings.autoStartBreaks}
				on:click={() => {
					updateSettings((prev) => ({
						...prev,
						autoStartBreaks: !prev.autoStartBreaks
					}));
				}}
			/>
		</label>
	</div>
	<div class="form-control">
		<label for="autostart_pomodoros" class="cursor-pointer label">
			<span class="font-semibold label-text">Auto start podomoros</span>
			<input
				id="autostart_pomodoros"
				type="checkbox"
				class="toggle toggle-primary"
				bind:checked={timerSettings.autoStartPomodoros}
				on:click={() => {
					updateSettings((prev) => ({
						...prev,
						autoStartPomodoros: !prev.autoStartPomodoros
					}));
				}}
			/>
		</label>
	</div>
	<div class="form-control flex flex-row justify-between">
		<label for="" class="font-semibold label-text label">Long break interval</label>
		<input
			id="longbreak_interval"
			min="1"
			type="number"
			class="input input-bordered w-24 focus:input-primary transition-all duration-300"
			on:change={(e) => {
				updateSettings((prev) => ({
					...prev,
					longBreakInterval: Number(e.currentTarget?.value)
				}));
			}}
			bind:value={timerSettings.longBreakInterval}
		/>
	</div>
</section>
