type NotificationSettingsModel = {
	volume: number;
};

export const DefaultNotificationSettingsModel = {
	volume: 0.4
} satisfies NotificationSettingsModel;
export default NotificationSettingsModel;
