export const isNotificationPermissionGranted = async (): Promise<boolean> => {
	if (!('Notification' in window)) return false;
	return Notification.permission === 'granted';
};

export const notify = async (title: string, options?: NotificationOptions) => {
	if (!(await isNotificationPermissionGranted())) return;
	new Notification(title, options);
};

export const requestPermission = async (): Promise<NotificationPermission> => {
	const result = await Notification.requestPermission();
	return result;
};
