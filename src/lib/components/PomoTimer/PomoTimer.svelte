<script lang="ts">
	import type TimerType from '$lib/models/TimerType';
	import { writable } from 'svelte/store';
	import TimerTypeTabs from './TimerTypeTabs.svelte';
	import CountDown from './CountDown.svelte';
	import TimerActions from './TimerActions.svelte';
	const timerType = writable<TimerType>('POMODORO');
</script>

<section class="flex flex-col gap-y-8 w-96 m-auto">
	<TimerTypeTabs
		selected={$timerType}
		onSelect={(t) => {
			timerType.set(t);
		}}
	/>
	<CountDown seconds={5 * 60} />
	<TimerActions isRunning={false} onClickMainControl={() => {}} onClickReset={() => {}} />
</section>
