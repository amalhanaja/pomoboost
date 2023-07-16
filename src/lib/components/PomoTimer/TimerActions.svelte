<script lang="ts">
	import IcForwardStep from '../Icons/IcForwardStep.svelte';
	import IcPause from '../Icons/IcPause.svelte';
	import IcPlay from '../Icons/IcPlay.svelte';
	import IcRoteateLeft from '../Icons/IcRoteateLeft.svelte';

	export let isRunning: boolean;
	export let onClickMainControl: () => void;
	export let onClickReset: () => void;
	// export let onClickSkip: () => void;
</script>

<section class="flex flex-row justify-center gap-x-4">
	<button class="btn btn-square btn-outline" on:click={onClickReset}>
		<IcRoteateLeft />
	</button>
	<button class="btn btn-primary w-24" on:click={onClickMainControl}>
		{#if isRunning}
			<IcPause />
		{:else}
			<IcPlay />
		{/if}
	</button>
	<button class="btn btn-square btn-outline" on:click={onClickReset}>
		<IcForwardStep />
	</button>
</section>
