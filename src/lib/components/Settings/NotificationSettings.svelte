<script lang="ts">
	import type NotificationSettingsModel from '$lib/models/NotificationSettingsModel';
	import { isNotificationPermissionGranted, requestPermission } from '$lib/utils/notification';
	import { onMount } from 'svelte';

	export let settings: NotificationSettingsModel;
	export let onUpdate: (updated: NotificationSettingsModel) => void;
	const PERCENTAGE = 100;
	const updateSettings = (
		updater: (prev: NotificationSettingsModel) => NotificationSettingsModel
	) => {
		const updated = updater(settings);
		onUpdate(updated);
	};
	const updateVolume = (v: number) => {
		updateSettings((prev) => ({ ...prev, volume: v / PERCENTAGE }));
	};

	$: volume = Math.floor(settings.volume * PERCENTAGE);
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
			class="flex-1 range range-xs"
			step="1"
			on:input={(e) => updateVolume(Number(e.currentTarget?.value))}
			bind:value={volume}
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
