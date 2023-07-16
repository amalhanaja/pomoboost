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
		<div class="tabs flex">
			<button class="tab tab-bordered flex-1">Tab 1</button>
			<button class="tab tab-bordered flex-1 tab-active">Tab 2</button>
			<button class="tab tab-bordered flex-1">Tab 3</button>
		</div>
		<TimerSettings {store} />
		<div class="modal-action">
			<button class="btn" on:click={onClose}> Close </button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
