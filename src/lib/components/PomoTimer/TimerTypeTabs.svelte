<script lang="ts">
	import type TimerType from '$lib/models/TimerType';
	import { timerTypes } from '$lib/models/TimerType';
	export let selected: TimerType;
	export let onSelect: (selected: TimerType) => void;
	const readableTimerType = (timerType: TimerType): string => {
		return timerType.replace('_', ' ');
	};
</script>

<section class="tabs tabs-boxed w-96">
	{#each timerTypes as t}
		<button class={`tab ${t === selected ? 'tab-active' : ''}`} on:click={() => onSelect(t)}
			>{readableTimerType(t)}</button
		>
	{/each}
</section>
