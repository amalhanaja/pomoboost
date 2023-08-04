import type NotificationSettingRepository from '$lib/data/NotificationSettingsRepository';
import type NotificationSettingsModel from '$lib/models/NotificationSettingsModel';
import { onMount } from 'svelte';
import { get, writable, type Writable } from 'svelte/store';

const notificationSettingsStore = (
	repository: NotificationSettingRepository
): Writable<NotificationSettingsModel> => {
	const store = writable<NotificationSettingsModel>();
	const { subscribe, set } = store;
	onMount(() => {
		const value = repository.getValue();
		set(value);
	});
	const storeValue = (val: NotificationSettingsModel) => {
		repository.setValue(val);
		set(val);
	};
	return {
		subscribe,
		set: storeValue,
		update: (updater) => {
			const updated = updater(get(store));
			storeValue(updated);
		}
	};
};

export default notificationSettingsStore;
