<script lang="ts">
	import type { Writable } from 'svelte/store';
	import TimerSettings from '../Settings/TimerSettings.svelte';
	import type TimerSettingsModel from '$lib/models/TimerSettingsModel';
	import { onMount } from 'svelte';
	import type SettingCategory from '$lib/models/SettingCategory';
	import NotificationSettings from '../Settings/NotificationSettings.svelte';

	export let open: boolean;
	export let store: Writable<TimerSettingsModel>;
	export let onClose: () => void;
	export let category: SettingCategory = 'TIMER';
	export let onCategoryChange: (category: SettingCategory) => void;

	$: categoryTabClasses = (c: SettingCategory) => {
		const main = 'tab tab-lg tab-bordered flex-1';
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
			<button class="tab tab-lg tab-bordered flex-1">Theme</button>
		</div>
		{#if category === 'TIMER'}
			<TimerSettings {store} />
		{:else if category === 'NOTIFICATION'}
			<NotificationSettings />
		{/if}
		<div class="modal-action">
			<button class="btn" on:click={onClose}>Close</button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
