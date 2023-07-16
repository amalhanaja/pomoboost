<script lang="ts">
	import SettingsDialog from '$lib/components/Dialog/SettingsDialog.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import PomoTimer from '$lib/components/PomoTimer/PomoTimer.svelte';
	import { Impl } from '$lib/data/TimerSettingsRepository';
	import { DefaultTimerSettings } from '$lib/models/TimerSettingsModel';
	import timerSettingsStore from '$lib/stores/timerSettings';
	const timerSettings = timerSettingsStore(DefaultTimerSettings, new Impl());
	$: settingsOpen = false;
</script>

<SettingsDialog open={settingsOpen} store={timerSettings} onClose={() => (settingsOpen = false)} />
<header>
	<NavBar onSettingClick={() => (settingsOpen = true)} />
</header>
<main>
	<PomoTimer />
	<h1 class="text-3xl font-bold underline">
		Welcome to SvelteKit {$timerSettings?.longBreakDuration}
	</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</main>
