<script lang="ts">
	import SettingsDialog from '$lib/components/Dialog/SettingsDialog.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import PomoTimer from '$lib/components/PomoTimer/PomoTimer.svelte';
	import { PomoTimerRepositoryImpl } from '$lib/data/PomoTimerRepository';
	import { PomodoroCountRepositoryImpl } from '$lib/data/PomodoroCountRepository';
	import { TimerSettingsRepositoryImpl } from '$lib/data/TimerSettingsRepository';
	import pomoTimerStore from '$lib/stores/pomoTimer';
	import pomodoroCountStore from '$lib/stores/pomodoroCount';
	import timerSettingsStore from '$lib/stores/timerSettings';

	const timerSettingsRepository = new TimerSettingsRepositoryImpl();
	const pomoTimerRepository = new PomoTimerRepositoryImpl();
	const pomodoroCountRepository = new PomodoroCountRepositoryImpl();
	const timerSettings = timerSettingsStore(timerSettingsRepository);
	const pomoTimer = pomoTimerStore(timerSettingsRepository, pomoTimerRepository);
	const pomodoroCount = pomodoroCountStore(pomodoroCountRepository);
	$: settingsOpen = false;
</script>

<SettingsDialog open={settingsOpen} store={timerSettings} onClose={() => (settingsOpen = false)} />
<header>
	<NavBar onSettingClick={() => (settingsOpen = true)} />
</header>
<main>
	<PomoTimer pomoTimerStore={pomoTimer} settings={$timerSettings} pomodoroCountStore={pomodoroCount}/>
	<h1 class="text-3xl font-bold underline">
		Welcome to SvelteKit {$timerSettings?.longBreakDuration}
	</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</main>
