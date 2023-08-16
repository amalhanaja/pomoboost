<script lang="ts">
	import type NotificationSettingsModel from '$lib/models/NotificationSettingsModel';
	import type SettingCategory from '$lib/models/SettingCategory';
	import type TimerSettingsModel from '$lib/models/TimerSettingsModel';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import TimerSettings from '../Settings/TimerSettings.svelte';
	import NotificationSettings from '../Settings/NotificationSettings.svelte';

	export let open: boolean;
	export let timerSettings: TimerSettingsModel;
	export let notificationSettings: NotificationSettingsModel;
	export let onClose: () => void;
	export let category: SettingCategory = 'TIMER';
	export let onCategoryChange: (category: SettingCategory) => void;
	export let onTimerSettingUpdated: (updated: TimerSettingsModel) => void;
	export let onNotificationSettingUpdated: (updated: NotificationSettingsModel) => void;

	$: categoryTabClasses = (c: SettingCategory) => {
		const main = 'tab tab-lg tab-bordered flex-1 transition-all duration-300';
		if (c !== category) return main;
		return main + ' tab-active';
	};

	onMount(() => {
		const dialog = document.getElementById('pomo_preferences_modal');
		dialog?.addEventListener('close', onClose);
		return () => dialog?.removeEventListener('close', onClose);
	});
</script>

<dialog id="pomo_preferences_modal" class="modal" {open}>
	<div class="modal-box">
		<div class="tabs flex mb-6">
			<button class={categoryTabClasses('TIMER')} on:click={() => onCategoryChange('TIMER')}
				>Timer</button
			>
			<button
				class={categoryTabClasses('NOTIFICATION')}
				on:click={() => onCategoryChange('NOTIFICATION')}>Notification</button
			>
		</div>
		{#if category === 'TIMER'}
			<TimerSettings {timerSettings} onUpdate={onTimerSettingUpdated} />
		{:else if category === 'NOTIFICATION'}
			<NotificationSettings
				settings={notificationSettings}
				onUpdate={onNotificationSettingUpdated}
			/>
		{/if}
		<div class="modal-action">
			<button class="btn" on:click={onClose}>Close</button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop bg-base-300 bg-opacity-40">
		<button>close</button>
	</form>
</dialog>
