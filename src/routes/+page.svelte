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
	let settingCategory: SettingCategory = 'TIMER';
</script>

<SettingsDialog
	open={settingsOpen}
	timerSettingStore={timerSettings}
	notificationSettingStore={notificationSettings}
	onClose={() => (settingsOpen = false)}
	category={settingCategory}
	onCategoryChange={(c) => (settingCategory = c)}
/>
<header>
	<NavBar onSettingClick={() => (settingsOpen = true)} />
</header>
<main class=" mt-16">
	<PomoTimer
		pomoTimerStore={pomoTimer}
		timerSettings={$timerSettings}
		notificationSettings={$notificationSettings}
		pomodoroCountStore={pomodoroCount}
	/>
</main>
