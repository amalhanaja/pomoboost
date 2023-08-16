<script lang="ts">
	import SettingsDialog from '$lib/components/Dialog/SettingsDialog.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import PomoTimer from '$lib/components/PomoTimer/PomoTimer.svelte';
	import { NotificationSettingRepositoryImpl } from '$lib/data/NotificationSettingsRepository';
	import { PomoTimerRepositoryImpl } from '$lib/data/PomoTimerRepository';
	import { PomodoroCountRepositoryImpl } from '$lib/data/PomodoroCountRepository';
	import { TimerSettingsRepositoryImpl } from '$lib/data/TimerSettingsRepository';
	import type SettingCategory from '$lib/models/SettingCategory';
	import notificationSettingsStore from '$lib/stores/notificationSettings';
	import pomoTimerStore from '$lib/stores/pomoTimer';
	import pomodoroCountStore from '$lib/stores/pomodoroCount';
	import timerSettingsStore from '$lib/stores/timerSettings';

	const timerSettingsRepository = new TimerSettingsRepositoryImpl();
	const pomoTimerRepository = new PomoTimerRepositoryImpl();
	const pomodoroCountRepository = new PomodoroCountRepositoryImpl();
	const notificationSettingsRepository = new NotificationSettingRepositoryImpl();
	const timerSettings = timerSettingsStore(timerSettingsRepository);
	const pomoTimer = pomoTimerStore(timerSettingsRepository, pomoTimerRepository);
	const pomodoroCount = pomodoroCountStore(pomodoroCountRepository);
	const notificationSettings = notificationSettingsStore(notificationSettingsRepository);
	let settingsOpen = false;
	let allowUpdateTimerSetting = true;
	let settingCategory: SettingCategory = 'TIMER';
</script>

<SettingsDialog
	open={settingsOpen}
	timerSettings={$timerSettings}
	notificationSettings={$notificationSettings}
	onClose={() => (settingsOpen = false)}
	category={settingCategory}
	onCategoryChange={(c) => (settingCategory = c)}
	onTimerSettingUpdated={(updated) => {
		const { update } = timerSettings;
		update((prev) => {
			switch (true) {
				case prev.pomodoroDuration !== updated.pomodoroDuration &&
					$pomoTimer.timerType === 'POMODORO':
					const pomodoro = updated.pomodoroDuration - (prev.pomodoroDuration - $pomoTimer.seconds);
					$pomoTimer.seconds = pomodoro >= 0 ? pomodoro : updated.pomodoroDuration;
					break;
				case prev.shortBreakDuration !== updated.shortBreakDuration &&
					$pomoTimer.timerType === 'SHORT_BREAK':
					const shortBreak =
						updated.shortBreakDuration - (prev.shortBreakDuration - $pomoTimer.seconds);
					$pomoTimer.seconds = shortBreak >= 0 ? shortBreak : updated.shortBreakDuration;
					break;
				case prev.longBreakDuration !== updated.longBreakDuration &&
					$pomoTimer.timerType === 'LONG_BREAK':
					const longBreak =
						updated.longBreakDuration - (prev.longBreakDuration - $pomoTimer.seconds);
					$pomoTimer.seconds = longBreak >= 0 ? longBreak : updated.longBreakDuration;
					break;
			}
			return updated;
		});
	}}
	onNotificationSettingUpdated={(updated) => {
		const { update } = notificationSettings;
		update(() => updated);
	}}
/>
<header>
	<NavBar onSettingClick={() => (settingsOpen = true)} />
</header>
<main class="h-[calc(100vh-4rem)] flex">
	<PomoTimer
		pomoTimerStore={pomoTimer}
		timerSettings={$timerSettings}
		notificationSettings={$notificationSettings}
		pomodoroCountStore={pomodoroCount}
		onStateChanged={(state) => {
			allowUpdateTimerSetting = state !== 'RUNNING';
		}}
	/>
</main>
