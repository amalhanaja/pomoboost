<script lang="ts">
	import type TimerType from '$lib/models/TimerType';
	import { timerTypes } from '$lib/models/TimerType';
	export let selected: TimerType;
	export let onSelect: (selected: TimerType) => void;
	const readableTimerType = (timerType: TimerType): string => {
		return timerType.replace('_', ' ');
	};
</script>

<section class="tabs tabs-boxed w-full flex justify-between flex-nowrap">
	{#each timerTypes as t}
		<button class={`tab overflow-hidden ${t === selected ? 'tab-active text-primary-content' : ''}`} on:click={() => onSelect(t)}
			>{readableTimerType(t)}</button
		>
	{/each}
</section>
