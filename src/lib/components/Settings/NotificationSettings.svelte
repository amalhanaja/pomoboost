<script lang="ts">
	import type NotificationSettingsModel from '$lib/models/NotificationSettingsModel';
	import {
		isNotificationPermissionGranted,
		notify,
		requestPermission
	} from '$lib/utils/notification';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let store: Writable<NotificationSettingsModel>;

	const PERCENTAGE = 100;
	$: volume = Math.floor($store.volume * PERCENTAGE);
	const updateVolume = (v: number) => ($store.volume = v / PERCENTAGE);
	let isNotificationEnabled = false;
	onMount(async () => {
		isNotificationEnabled = await isNotificationPermissionGranted();
	});
</script>

<section class="flex flex-col">
	<div class="form-control mt-2 flex flex-row items-center">
		<label for="volume" class="label font-semibold label-text flex-1">Volume</label>
		<span class="mr-2">{volume}</span>
		<input
			id="volume"
			type="range"
			min="0"
			max="100"
			value={volume}
			class="flex-1 range range-xs"
			step="1"
			on:change={(e) => updateVolume(Number(e.target?.value))}
		/>
	</div>
	<div class="form-control">
		<label for="notification" class="cursor-pointer label">
			<span class="font-semibold label-text">Auto start podomoros</span>
			<input
				id="notification"
				type="checkbox"
				class="toggle toggle-primary"
				checked={isNotificationEnabled}
				on:click|preventDefault={async (e) => {
					await requestPermission();
					isNotificationEnabled = await isNotificationPermissionGranted();
				}}
			/>
		</label>
	</div>
</section>
