<script lang="ts">
	import SettingsDialog from '$lib/components/Dialog/SettingsDialog.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import PomoTimer from '$lib/components/PomoTimer/PomoTimer.svelte';
	import { PomoTimerRepositoryImpl } from '$lib/data/PomoTimerRepository';
	import { PomodoroCountRepositoryImpl } from '$lib/data/PomodoroCountRepository';
	import { TimerSettingsRepositoryImpl } from '$lib/data/TimerSettingsRepository';
	import type SettingCategory from '$lib/models/SettingCategory';
	import pomoTimerStore from '$lib/stores/pomoTimer';
	import pomodoroCountStore from '$lib/stores/pomodoroCount';
	import timerSettingsStore from '$lib/stores/timerSettings';

	const timerSettingsRepository = new TimerSettingsRepositoryImpl();
	const pomoTimerRepository = new PomoTimerRepositoryImpl();
	const pomodoroCountRepository = new PomodoroCountRepositoryImpl();
	const timerSettings = timerSettingsStore(timerSettingsRepository);
	const pomoTimer = pomoTimerStore(timerSettingsRepository, pomoTimerRepository);
	const pomodoroCount = pomodoroCountStore(pomodoroCountRepository);
	let settingsOpen = false;
	let settingCategory: SettingCategory = 'TIMER';
</script>

<SettingsDialog
	open={settingsOpen}
	store={timerSettings}
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
		settings={$timerSettings}
		pomodoroCountStore={pomodoroCount}
	/>
</main>
