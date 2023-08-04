import type NotificationSettingsModel from '$lib/models/NotificationSettingsModel';
import { DefaultNotificationSettingsModel } from '$lib/models/NotificationSettingsModel';

export default interface NotificationSettingRepository {
	setValue(value: NotificationSettingsModel): void;
	getValue(): NotificationSettingsModel;
}

export class NotificationSettingRepositoryImpl implements NotificationSettingRepository {
	private KEY = 'NOTIFICATION_SETTINGS';

	setValue(value: NotificationSettingsModel): void {
		const jsonVal = JSON.stringify(value);
		localStorage?.setItem(this.KEY, jsonVal);
	}
	getValue(): NotificationSettingsModel {
		const stored = localStorage.getItem(this.KEY);
		const value = stored ? JSON.parse(stored) : DefaultNotificationSettingsModel;
		return value;
	}
}
