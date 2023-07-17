<script lang="ts">
	import type { Writable } from 'svelte/store';
	import TimerSettings from '../Settings/TimerSettings.svelte';
	import type TimerSettingsModel from '$lib/models/TimerSettingsModel';
	import { onMount } from 'svelte';
	export let open: boolean;
	export let store: Writable<TimerSettingsModel>;
	export let onClose: () => void;
	onMount(() => {
		const dialog = document.getElementById('pomo_preferences_modal');
		dialog?.addEventListener('close', onClose);
		return () => dialog?.removeEventListener('close', onClose);
	});
</script>

<dialog id="pomo_preferences_modal" class="modal" {open}>
	<div class="modal-box">
		<div class="tabs flex mb-6">
			<button class="tab tab-lg tab-bordered flex-1 tab-active">Timer</button>
			<button class="tab tab-lg tab-bordered flex-1">Notification</button>
			<button class="tab tab-lg tab-bordered flex-1">Theme</button>
		</div>
		<TimerSettings {store} />
		<div class="modal-action">
			<button class="btn" on:click={onClose}>Close</button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
